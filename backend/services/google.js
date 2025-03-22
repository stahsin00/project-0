import fs from 'fs';
import { google } from 'googleapis';
import { generateSlideContent } from './openai.js';
import { getThemeColors, getSlideLayout, createDecorations } from './theme.js';

async function authenticate() {
  try {
    const keyFile = './google-key.json';
    const auth = new google.auth.GoogleAuth({
      keyFile,
      scopes: [
        'https://www.googleapis.com/auth/presentations',
        'https://www.googleapis.com/auth/drive'
      ]
    });
    
    const authClient = await auth.getClient();
    console.log('Authentication successful');
    return authClient;
  } catch (error) {
    console.error('Authentication failed:', error.message);
    throw error;
  }
}

async function createPresentation(authClient, content, topic) {
  try {
    const slides = google.slides({ version: 'v1', auth: authClient });
    const theme = getThemeColors(topic);
    
    const presentation = await slides.presentations.create({
      requestBody: {
        title: content.title
      }
    });
    
    const presentationId = presentation.data.presentationId;
    console.log(`Presentation created with ID: ${presentationId}`);
    
    const presentationDetails = await slides.presentations.get({
      presentationId: presentationId
    });
    
    let requests = [];
    
    if (presentationDetails.data.slides && presentationDetails.data.slides.length > 0) {
      const titleSlideId = presentationDetails.data.slides[0].objectId;
      
      requests = requests.concat(createDecorations(titleSlideId, theme, 'title'));
      
      requests.push({
        updatePageProperties: {
          objectId: titleSlideId,
          fields: 'pageBackgroundFill.solidFill.color',
          pageProperties: {
            pageBackgroundFill: {
              solidFill: {
                color: theme.background
              }
            }
          }
        }
      });
      
      requests.push(
        {
          createShape: {
            objectId: 'titleTextBox',
            shapeType: 'TEXT_BOX',
            elementProperties: {
              pageObjectId: titleSlideId,
              size: {
                width: { magnitude: 600, unit: 'PT' },
                height: { magnitude: 200, unit: 'PT' }
              },
              transform: {
                scaleX: 1,
                scaleY: 1,
                translateX: 60,
                translateY: 180,
                unit: 'PT'
              }
            }
          }
        },
        {
          insertText: {
            objectId: 'titleTextBox',
            insertionIndex: 0,
            text: content.title
          }
        },
        {
          updateTextStyle: {
            objectId: 'titleTextBox',
            textRange: {
              type: 'ALL'
            },
            style: {
              fontSize: {
                magnitude: 44,
                unit: 'PT'
              },
              foregroundColor: {
                opaqueColor: theme.primary
              },
              bold: true,
              fontFamily: theme.fonts.titleFont
            },
            fields: 'fontSize,foregroundColor,bold,fontFamily'
          }
        }
      );
      
      if (content.subtitle) {
        const overviewSlideId = 'overviewSlide';
        requests.push({
          createSlide: {
            objectId: overviewSlideId,
            insertionIndex: 1,
            slideLayoutReference: {
              predefinedLayout: 'TITLE_AND_BODY'
            }
          }
        });
        
        requests = requests.concat(createDecorations(overviewSlideId, theme, 'content'));
        
        requests.push({
          updatePageProperties: {
            objectId: overviewSlideId,
            fields: 'pageBackgroundFill.solidFill.color',
            pageProperties: {
              pageBackgroundFill: {
                solidFill: {
                  color: theme.background
                }
              }
            }
          }
        });
        
        requests.push(
          {
            createShape: {
              objectId: 'overviewTitle',
              shapeType: 'TEXT_BOX',
              elementProperties: {
                pageObjectId: overviewSlideId,
                size: {
                  width: { magnitude: 600, unit: 'PT' },
                  height: { magnitude: 50, unit: 'PT' }
                },
                transform: {
                  scaleX: 1,
                  scaleY: 1,
                  translateX: 50,
                  translateY: 30,
                  unit: 'PT'
                }
              }
            }
          },
          {
            insertText: {
              objectId: 'overviewTitle',
              insertionIndex: 0,
              text: 'Overview'
            }
          },
          {
            updateTextStyle: {
              objectId: 'overviewTitle',
              textRange: {
                type: 'ALL'
              },
              style: {
                fontSize: {
                  magnitude: 28,
                  unit: 'PT'
                },
                foregroundColor: {
                  opaqueColor: theme.primary
                },
                bold: true,
                fontFamily: theme.fonts.titleFont
              },
              fields: 'fontSize,foregroundColor,bold,fontFamily'
            }
          },
          {
            createShape: {
              objectId: 'overviewContent',
              shapeType: 'TEXT_BOX',
              elementProperties: {
                pageObjectId: overviewSlideId,
                size: {
                  width: { magnitude: 600, unit: 'PT' },
                  height: { magnitude: 300, unit: 'PT' }
                },
                transform: {
                  scaleX: 1,
                  scaleY: 1,
                  translateX: 50,
                  translateY: 100,
                  unit: 'PT'
                }
              }
            }
          },
          {
            insertText: {
              objectId: 'overviewContent',
              insertionIndex: 0,
              text: content.subtitle
            }
          },
          {
            updateTextStyle: {
              objectId: 'overviewContent',
              textRange: {
                type: 'ALL'
              },
              style: {
                fontSize: {
                  magnitude: 20,
                  unit: 'PT'
                },
                foregroundColor: {
                  opaqueColor: theme.text
                },
                fontFamily: theme.fonts.bodyFont
              },
              fields: 'fontSize,foregroundColor,fontFamily'
            }
          }
        );
      }
    }
    
    const startingIndex = content.subtitle ? 2 : 1;
    
    if (content.slides && Array.isArray(content.slides)) {
      content.slides.forEach((slide, index) => {
        const slideId = `slide${index + startingIndex + 1}`;
        const titleId = `title${slideId}`;
        const contentId = `content${slideId}`;
        
        const layout = slide.layout || getSlideLayout(index + 1, content.slides.length + 1);
        
        requests.push({
          createSlide: {
            objectId: slideId,
            insertionIndex: index + startingIndex,
            slideLayoutReference: {
              predefinedLayout: layout
            }
          }
        });
        
        requests = requests.concat(createDecorations(slideId, theme, 'content'));
        
        requests.push({
          updatePageProperties: {
            objectId: slideId,
            fields: 'pageBackgroundFill.solidFill.color',
            pageProperties: {
              pageBackgroundFill: {
                solidFill: {
                  color: theme.background
                }
              }
            }
          }
        });
        
        requests.push(
          {
            createShape: {
              objectId: titleId,
              shapeType: 'TEXT_BOX',
              elementProperties: {
                pageObjectId: slideId,
                size: {
                  width: { magnitude: 600, unit: 'PT' },
                  height: { magnitude: 50, unit: 'PT' }
                },
                transform: {
                  scaleX: 1,
                  scaleY: 1,
                  translateX: 50,
                  translateY: 30,
                  unit: 'PT'
                }
              }
            }
          },
          {
            insertText: {
              objectId: titleId,
              insertionIndex: 0,
              text: slide.title
            }
          },
          {
            updateTextStyle: {
              objectId: titleId,
              textRange: {
                type: 'ALL'
              },
              style: {
                fontSize: {
                  magnitude: 28,
                  unit: 'PT'
                },
                foregroundColor: {
                  opaqueColor: theme.primary
                },
                bold: true,
                fontFamily: theme.fonts.titleFont
              },
              fields: 'fontSize,foregroundColor,bold,fontFamily'
            }
          }
        );
        
        if (slide.content && Array.isArray(slide.content)) {
          const bulletContent = slide.content.join('\n• ');
          
          let contentX = 50;
          let contentY = 100;
          let contentWidth = 600;
          
          if (layout === 'TITLE_AND_TWO_COLUMNS') {
            contentWidth = 280;
            
            const rightColumnId = `rightColumn${slideId}`;
            const rightColumnQuote = slide.content.length > 2 ? slide.content[0] : "Key Takeaway";
            
            requests.push(
              {
                createShape: {
                  objectId: rightColumnId,
                  shapeType: 'TEXT_BOX',
                  elementProperties: {
                    pageObjectId: slideId,
                    size: {
                      width: { magnitude: 250, unit: 'PT' },
                      height: { magnitude: 200, unit: 'PT' }
                    },
                    transform: {
                      scaleX: 1,
                      scaleY: 1,
                      translateX: 400,
                      translateY: 150,
                      unit: 'PT'
                    }
                  }
                }
              },
              {
                insertText: {
                  objectId: rightColumnId,
                  insertionIndex: 0,
                  text: rightColumnQuote
                }
              },
              {
                updateTextStyle: {
                  objectId: rightColumnId,
                  textRange: {
                    type: 'ALL'
                  },
                  style: {
                    fontSize: {
                      magnitude: 24,
                      unit: 'PT'
                    },
                    foregroundColor: {
                      opaqueColor: theme.accent
                    },
                    italic: true,
                    fontFamily: theme.fonts.accentFont
                  },
                  fields: 'fontSize,foregroundColor,italic,fontFamily'
                }
              },
              {
                createShape: {
                  objectId: `decoration_quote_${slideId}`,
                  shapeType: 'RECTANGLE',
                  elementProperties: {
                    pageObjectId: slideId,
                    size: {
                      width: { magnitude: 250, unit: 'PT' },
                      height: { magnitude: 5, unit: 'PT' }
                    },
                    transform: {
                      scaleX: 1,
                      scaleY: 1,
                      translateX: 400,
                      translateY: 135,
                      unit: 'PT'
                    }
                  }
                }
              },
              {
                updateShapeProperties: {
                  objectId: `decoration_quote_${slideId}`,
                  fields: 'shapeBackgroundFill.solidFill.color',
                  shapeProperties: {
                    shapeBackgroundFill: {
                      solidFill: {
                        color: theme.accent
                      }
                    }
                  }
                }
              }
            );
          }
          
          requests.push(
            {
              createShape: {
                objectId: contentId,
                shapeType: 'TEXT_BOX',
                elementProperties: {
                  pageObjectId: slideId,
                  size: {
                    width: { magnitude: contentWidth, unit: 'PT' },
                    height: { magnitude: 300, unit: 'PT' }
                  },
                  transform: {
                    scaleX: 1,
                    scaleY: 1,
                    translateX: contentX,
                    translateY: contentY,
                    unit: 'PT'
                  }
                }
              }
            },
            {
              insertText: {
                objectId: contentId,
                insertionIndex: 0,
                text: `• ${bulletContent}`
              }
            },
            {
              updateTextStyle: {
                objectId: contentId,
                textRange: {
                  type: 'ALL'
                },
                style: {
                  fontSize: {
                    magnitude: 18,
                    unit: 'PT'
                  },
                  foregroundColor: {
                    opaqueColor: theme.text
                  },
                  fontFamily: theme.fonts.bodyFont
                },
                fields: 'fontSize,foregroundColor,fontFamily'
              }
            },
            {
              updateParagraphStyle: {
                objectId: contentId,
                textRange: {
                  type: 'ALL'
                },
                style: {
                  lineSpacing: 115,
                  spaceAbove: {
                    magnitude: 10,
                    unit: 'PT'
                  },
                  spaceBelow: {
                    magnitude: 10,
                    unit: 'PT'
                  }
                },
                fields: 'lineSpacing,spaceAbove,spaceBelow'
              }
            }
          );
        }
      });
      
      const thankYouSlideIndex = content.slides.length + (content.subtitle ? 2 : 1);
      const thankYouSlideId = `slide${thankYouSlideIndex + 1}`;
      
      requests.push({
        createSlide: {
          objectId: thankYouSlideId,
          insertionIndex: thankYouSlideIndex,
          slideLayoutReference: {
            predefinedLayout: 'TITLE_ONLY'
          }
        }
      });
      
      requests.push({
        updatePageProperties: {
          objectId: thankYouSlideId,
          fields: 'pageBackgroundFill.solidFill.color',
          pageProperties: {
            pageBackgroundFill: {
              solidFill: {
                color: theme.primary
              }
            }
          }
        }
      });
      
      requests.push(
        {
          createShape: {
            objectId: `thankYouText`,
            shapeType: 'TEXT_BOX',
            elementProperties: {
              pageObjectId: thankYouSlideId,
              size: {
                width: { magnitude: 600, unit: 'PT' },
                height: { magnitude: 200, unit: 'PT' }
              },
              transform: {
                scaleX: 1,
                scaleY: 1,
                translateX: 150,
                translateY: 150,
                unit: 'PT'
              }
            }
          }
        },
        {
          insertText: {
            objectId: `thankYouText`,
            insertionIndex: 0,
            text: 'Thank You'
          }
        },
        {
          updateTextStyle: {
            objectId: `thankYouText`,
            textRange: {
              type: 'ALL'
            },
            style: {
              fontSize: {
                magnitude: 60,
                unit: 'PT'
              },
              foregroundColor: {
                opaqueColor: {
                  rgbColor: { red: 1, green: 1, blue: 1 }
                }
              },
              bold: true,
              fontFamily: theme.fonts.titleFont
            },
            fields: 'fontSize,foregroundColor,bold,fontFamily'
          }
        }
      );
    }
    
    const batchSize = 20;
    for (let i = 0; i < requests.length; i += batchSize) {
      const batch = requests.slice(i, i + batchSize);
      await slides.presentations.batchUpdate({
        presentationId: presentationId,
        requestBody: {
          requests: batch
        }
      });
      console.log(`Processed batch ${Math.floor(i/batchSize) + 1} of ${Math.ceil(requests.length/batchSize)}`);
    }
    
    console.log('All slides created and populated with content');
    return presentationId;
  } catch (error) {
    console.error('Failed to create or update presentation:', error.message);
    throw error;
  }
}

async function exportAsPdf(authClient, presentationId) {
  try {
    const drive = google.drive({ version: 'v3', auth: authClient });
    
    const response = await drive.files.export({
      fileId: presentationId,
      mimeType: 'application/pdf'
    }, {
      responseType: 'stream'
    });
    
    const pdfDir = './pdfs';
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputPath = `${pdfDir}/presentation-${timestamp}.pdf`;
    const writer = fs.createWriteStream(outputPath);
    
    return new Promise((resolve, reject) => {
      response.data
        .on('error', err => {
          reject(err);
        })
        .pipe(writer)
        .on('finish', () => {
          console.log(`PDF exported successfully to ${outputPath}`);
          resolve(outputPath);
        })
        .on('error', err => {
          reject(err);
        });
    });
  } catch (error) {
    console.error('Failed to export PDF:', error.message);
    throw error;
  }
}

export async function createAndExportPresentation(topic) {
  try {
    const authClient = await authenticate();
    const slideContent = await generateSlideContent(topic);
    const presentationId = await createPresentation(authClient, slideContent, topic);
    
    const pdfPath = await exportAsPdf(authClient, presentationId);
    
    console.log(`Complete process finished. PDF available at: ${pdfPath}`);
    return pdfPath;
  } catch (error) {
    console.error('Process failed:', error.message);
    throw error;
  }
}