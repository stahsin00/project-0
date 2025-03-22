import fs from 'fs';
import { google } from 'googleapis';
import { generateSlideContent } from './openai.js';

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

async function createPresentation(authClient, content) {
    try {
      const slides = google.slides({ version: 'v1', auth: authClient });
      
      // First, create a new presentation
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
      
      if (presentationDetails.data.slides && presentationDetails.data.slides.length > 0) {
        console.log('First slide structure:', JSON.stringify(presentationDetails.data.slides[0], null, 2));
      }
      
      const requests = [
        {
          createShape: {
            objectId: 'titleTextBox',
            shapeType: 'TEXT_BOX',
            elementProperties: {
              pageObjectId: presentationDetails.data.slides[0].objectId,
              size: {
                width: { magnitude: 600, unit: 'PT' },
                height: { magnitude: 100, unit: 'PT' }
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
                magnitude: 36,
                unit: 'PT'
              },
              bold: true
            },
            fields: 'fontSize,bold'
          }
        },
        {
          createShape: {
            objectId: 'subtitleTextBox',
            shapeType: 'TEXT_BOX',
            elementProperties: {
              pageObjectId: presentationDetails.data.slides[0].objectId,
              size: {
                width: { magnitude: 600, unit: 'PT' },
                height: { magnitude: 60, unit: 'PT' }
              },
              transform: {
                scaleX: 1,
                scaleY: 1,
                translateX: 50,
                translateY: 200,
                unit: 'PT'
              }
            }
          }
        },
        {
          insertText: {
            objectId: 'subtitleTextBox',
            insertionIndex: 0,
            text: content.subtitle
          }
        },
        {
          updateTextStyle: {
            objectId: 'subtitleTextBox',
            textRange: {
              type: 'ALL'
            },
            style: {
              fontSize: {
                magnitude: 20,
                unit: 'PT'
              }
            },
            fields: 'fontSize'
          }
        },
        {
          createSlide: {
            objectId: 'slide2',
            insertionIndex: 1,
            slideLayoutReference: {
              predefinedLayout: 'BLANK'
            }
          }
        }
      ];
      
      await slides.presentations.batchUpdate({
        presentationId: presentationId,
        requestBody: {
          requests: requests
        }
      });
      
      console.log('Slide content updated with OpenAI generated content');
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
    const presentationId = await createPresentation(authClient, slideContent);
    
    const pdfPath = await exportAsPdf(authClient, presentationId);
    
    console.log(`Complete process finished. PDF available at: ${pdfPath}`);
    return pdfPath;
  } catch (error) {
    console.error('Process failed:', error.message);
    throw error;
  }
}