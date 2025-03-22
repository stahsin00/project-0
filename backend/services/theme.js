import { generateDynamicPalette } from './colorPalette.js';

export function getThemeColors(topic) {
  return generateDynamicPalette(topic);
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
    
    decorations.push({
      createShape: {
        objectId: `decoration_${slideId}_2`,
        shapeType: 'RECTANGLE',
        elementProperties: {
          pageObjectId: slideId,
          size: {
            width: { magnitude: 720, unit: 'PT' },
            height: { magnitude: 8, unit: 'PT' }
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 0,
            translateY: 500,
            unit: 'PT'
          }
        }
      }
    });
    
    decorations.push({
      updateShapeProperties: {
        objectId: `decoration_${slideId}_2`,
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
    
    decorations.push({
      createShape: {
        objectId: `decoration_${slideId}_3`,
        shapeType: 'ELLIPSE',
        elementProperties: {
          pageObjectId: slideId,
          size: {
            width: { magnitude: 15, unit: 'PT' },
            height: { magnitude: 15, unit: 'PT' }
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 585,
            translateY: 20,
            unit: 'PT'
          }
        }
      }
    });
    
    decorations.push({
      updateShapeProperties: {
        objectId: `decoration_${slideId}_3`,
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
  }
  
  return decorations;
}