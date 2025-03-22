export function getThemeColors(topic) {
    const topicLower = topic.toLowerCase();
    
    let theme = {
      primary: { rgbColor: { red: 0.2, green: 0.4, blue: 0.7 } },
      secondary: { rgbColor: { red: 0.8, green: 0.9, blue: 1.0 } },
      accent: { rgbColor: { red: 0.1, green: 0.2, blue: 0.5 } },
      text: { rgbColor: { red: 0.1, green: 0.1, blue: 0.1 } },
      background: { rgbColor: { red: 1.0, green: 1.0, blue: 1.0 } }
    };
    
    if (topicLower.includes('tech') || topicLower.includes('innovation') || 
        topicLower.includes('app') || topicLower.includes('platform') ||
        topicLower.includes('digital') || topicLower.includes('ai')) {
      theme = {
        primary: { rgbColor: { red: 0.0, green: 0.7, blue: 0.8 } },
        secondary: { rgbColor: { red: 0.1, green: 0.1, blue: 0.2 } },
        accent: { rgbColor: { red: 0.0, green: 0.9, blue: 0.7 } },
        text: { rgbColor: { red: 0.1, green: 0.1, blue: 0.1 } },
        background: { rgbColor: { red: 0.95, green: 0.98, blue: 1.0 } }
      };
    }
    
    else if (topicLower.includes('business') || topicLower.includes('finance') ||
            topicLower.includes('investment') || topicLower.includes('startup') ||
            topicLower.includes('market') || topicLower.includes('pitch')) {
      theme = {
        primary: { rgbColor: { red: 0.2, green: 0.4, blue: 0.6 } },
        secondary: { rgbColor: { red: 0.9, green: 0.7, blue: 0.3 } },
        accent: { rgbColor: { red: 0.1, green: 0.5, blue: 0.5 } },
        text: { rgbColor: { red: 0.2, green: 0.2, blue: 0.3 } },
        background: { rgbColor: { red: 0.98, green: 0.98, blue: 0.98 } }
      };
    }
    
    else if (topicLower.includes('creative') || topicLower.includes('design') ||
            topicLower.includes('art') || topicLower.includes('brand') ||
            topicLower.includes('media') || topicLower.includes('content')) {
      theme = {
        primary: { rgbColor: { red: 0.8, green: 0.2, blue: 0.6 } },
        secondary: { rgbColor: { red: 0.3, green: 0.8, blue: 0.9 } },
        accent: { rgbColor: { red: 1.0, green: 0.6, blue: 0.2 } },
        text: { rgbColor: { red: 0.2, green: 0.2, blue: 0.2 } },
        background: { rgbColor: { red: 0.98, green: 0.97, blue: 1.0 } }
      };
    }
    
    else if (topicLower.includes('health') || topicLower.includes('medical') ||
            topicLower.includes('wellness') || topicLower.includes('fitness') ||
            topicLower.includes('bio') || topicLower.includes('care')) {
      theme = {
        primary: { rgbColor: { red: 0.0, green: 0.7, blue: 0.5 } },
        secondary: { rgbColor: { red: 0.0, green: 0.5, blue: 0.7 } },
        accent: { rgbColor: { red: 0.8, green: 0.9, blue: 0.3 } },
        text: { rgbColor: { red: 0.1, green: 0.3, blue: 0.3 } },
        background: { rgbColor: { red: 0.95, green: 1.0, blue: 0.98 } }
      };
    }
    
    return theme;
  }
  
  export function getSlideLayout(slideIndex, totalSlides) {
    if (slideIndex === 0) {
      return 'TITLE';
    } else if (slideIndex === 1) {
      return 'SECTION_HEADER';
    } else if (slideIndex === totalSlides - 1) {
      return 'SECTION_HEADER';
    } else if (slideIndex % 3 === 0) {
      return 'TITLE_AND_TWO_COLUMNS';
    } else {
      return 'TITLE_AND_BODY';
    }
  }
  
  export function createDecorations(slideId, theme, position) {
    const decorations = [];
    
    if (position === 'title') {
      decorations.push({
        createShape: {
          objectId: `decoration_${slideId}_1`,
          shapeType: 'ELLIPSE',
          elementProperties: {
            pageObjectId: slideId,
            size: {
              width: { magnitude: 200, unit: 'PT' },
              height: { magnitude: 200, unit: 'PT' }
            },
            transform: {
              scaleX: 1,
              scaleY: 1,
              translateX: 400,
              translateY: 50,
              unit: 'PT'
            }
          }
        }
      });
      
      const alphaValue = 0.3;
      
      decorations.push({
        updateShapeProperties: {
          objectId: `decoration_${slideId}_1`,
          fields: 'shapeBackgroundFill.solidFill.color',
          shapeProperties: {
            shapeBackgroundFill: {
              solidFill: {
                color: theme.accent
              }
            }
          }
        }
      });
      
      decorations.push({
        updateShapeProperties: {
          objectId: `decoration_${slideId}_1`,
          fields: 'shapeBackgroundFill.solidFill.alpha',
          shapeProperties: {
            shapeBackgroundFill: {
              solidFill: {
                alpha: alphaValue
              }
            }
          }
        }
      });
    } else {
      decorations.push({
        createShape: {
          objectId: `decoration_${slideId}_1`,
          shapeType: 'RECTANGLE',
          elementProperties: {
            pageObjectId: slideId,
            size: {
              width: { magnitude: 100, unit: 'PT' },
              height: { magnitude: 10, unit: 'PT' }
            },
            transform: {
              scaleX: 1,
              scaleY: 1,
              translateX: 600,
              translateY: 20,
              unit: 'PT'
            }
          }
        }
      });
      
      decorations.push({
        updateShapeProperties: {
          objectId: `decoration_${slideId}_1`,
          fields: 'shapeBackgroundFill.solidFill.color',
          shapeProperties: {
            shapeBackgroundFill: {
              solidFill: {
                color: theme.primary
              }
            }
          }
        }
      });
    }
    
    return decorations;
  }