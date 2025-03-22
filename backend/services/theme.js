import { generateDynamicPalette } from './colorPalette.js';
import { getFontTheme } from './fontSelection.js';

export function getThemeColors(topic) {
  const colorPalette = generateDynamicPalette(topic);
  
  const fontTheme = getFontTheme(topic);
  
  return {
    ...colorPalette,
    fonts: fontTheme
  };
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
    
    decorations.push({
      createShape: {
        objectId: `decoration_${slideId}_3`,
        shapeType: 'RECTANGLE',
        elementProperties: {
          pageObjectId: slideId,
          size: {
            width: { magnitude: 200, unit: 'PT' },
            height: { magnitude: 4, unit: 'PT' }
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 50,
            translateY: 50,
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
  } else {
    decorations.push({
      createShape: {
        objectId: `decoration_${slideId}_1`,
        shapeType: 'RECTANGLE',
        elementProperties: {
          pageObjectId: slideId,
          size: {
            width: { magnitude: 100, unit: 'PT' },
            height: { magnitude: 4, unit: 'PT' }
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 50,
            translateY: 85,
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
              color: theme.accent
            }
          }
        }
      }
    });
  }
  
  return decorations;
}