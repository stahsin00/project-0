export function rgbToSlides(r, g, b) {
    return {
      rgbColor: {
        red: r / 255,
        green: g / 255,
        blue: b / 255
      }
    };
  }
  
  export function hexToSlides(hex) {
    hex = hex.replace('#', '');
    
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return rgbToSlides(r, g, b);
  }
  
  export function hslToSlides(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    
    let r, g, b;
  
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
  
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
  
    return {
      rgbColor: {
        red: r,
        green: g,
        blue: b
      }
    };
  }
  
  function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function getBaseColorsFromTopic(topic) {
    const topicLower = topic.toLowerCase();
    
    let hueRange = { min: 0, max: 360 };
    
    if (topicLower.includes('tech') || topicLower.includes('digital') || 
        topicLower.includes('data') || topicLower.includes('ai') ||
        topicLower.includes('software') || topicLower.includes('app')) {
      hueRange = { min: 180, max: 240 };
    }
    
    else if (topicLower.includes('finance') || topicLower.includes('business') ||
             topicLower.includes('market') || topicLower.includes('investment') ||
             topicLower.includes('corporate') || topicLower.includes('strategy')) {
      if (Math.random() > 0.5) {
        hueRange = { min: 210, max: 230 };
      } else {
        hueRange = { min: 40, max: 60 };
      }
    }
    
    else if (topicLower.includes('creative') || topicLower.includes('design') ||
             topicLower.includes('art') || topicLower.includes('brand') ||
             topicLower.includes('media') || topicLower.includes('fashion')) {
      hueRange = { min: 280, max: 340 };
    }
    
    else if (topicLower.includes('health') || topicLower.includes('medical') ||
             topicLower.includes('wellness') || topicLower.includes('fitness') ||
             topicLower.includes('care') || topicLower.includes('bio')) {
      hueRange = { min: 140, max: 180 };
    }
    
    else if (topicLower.includes('food') || topicLower.includes('culinary') ||
             topicLower.includes('restaurant') || topicLower.includes('cuisine') ||
             topicLower.includes('hospitality') || topicLower.includes('dining')) {
      hueRange = { min: 0, max: 30 };
    }
    
    else if (topicLower.includes('environment') || topicLower.includes('nature') ||
             topicLower.includes('green') || topicLower.includes('eco') ||
             topicLower.includes('sustain') || topicLower.includes('organic')) {
      hueRange = { min: 90, max: 150 };
    }
    
    else if (topicLower.includes('education') || topicLower.includes('learn') ||
             topicLower.includes('school') || topicLower.includes('teach') ||
             topicLower.includes('university') || topicLower.includes('academy')) {
      if (Math.random() > 0.5) {
        hueRange = { min: 20, max: 40 };
      } else {
        hueRange = { min: 200, max: 220 };
      }
    }
    
    else if (topicLower.includes('travel') || topicLower.includes('tourism') ||
             topicLower.includes('adventure') || topicLower.includes('journey') ||
             topicLower.includes('destination') || topicLower.includes('explore')) {
      if (Math.random() > 0.5) {
        hueRange = { min: 190, max: 220 };
      } else {
        hueRange = { min: 20, max: 40 };
      }
    }
    
    const hue = randomInRange(hueRange.min, hueRange.max);
    const saturation = randomInRange(60, 90);
    const lightness = randomInRange(35, 55);
    
    return {
      primary: { h: hue, s: saturation, l: lightness },
      secondary: { h: (hue + 180) % 360, s: saturation, l: lightness },
      accent: { h: (hue + 120) % 360, s: saturation, l: lightness }
    };
  }
  
  function generateAnalogousScheme(baseColors) {
    const hue = baseColors.primary.h;
    const angle1 = randomInRange(20, 40);
    const angle2 = randomInRange(20, 40);
    
    return {
      primary: baseColors.primary,
      secondary: { 
        h: (hue + angle1) % 360, 
        s: baseColors.primary.s - randomInRange(5, 15),
        l: baseColors.primary.l + randomInRange(5, 15)
      },
      accent: { 
        h: (hue - angle2 + 360) % 360, 
        s: baseColors.primary.s + randomInRange(0, 10),
        l: baseColors.primary.l - randomInRange(0, 10)
      }
    };
  }
  
  function generateMonochromaticScheme(baseColors) {
    return {
      primary: baseColors.primary,
      secondary: { 
        h: baseColors.primary.h, 
        s: Math.max(20, baseColors.primary.s - randomInRange(15, 25)),
        l: Math.min(85, baseColors.primary.l + randomInRange(15, 25))
      },
      accent: { 
        h: baseColors.primary.h, 
        s: Math.min(100, baseColors.primary.s + randomInRange(5, 15)),
        l: Math.max(20, baseColors.primary.l - randomInRange(5, 15))
      }
    };
  }
  
  function generateComplementaryScheme(baseColors) {
    const hue = baseColors.primary.h;
    const variation = randomInRange(-10, 10);
    
    return {
      primary: baseColors.primary,
      secondary: { 
        h: (hue + 180 + variation) % 360, 
        s: baseColors.primary.s,
        l: baseColors.primary.l
      },
      accent: { 
        h: (hue + randomInRange(30, 90)) % 360, 
        s: baseColors.primary.s - randomInRange(0, 10),
        l: baseColors.primary.l + randomInRange(0, 15)
      }
    };
  }
  
  function generateTriadicScheme(baseColors) {
    const hue = baseColors.primary.h;
    const variation1 = randomInRange(-10, 10);
    const variation2 = randomInRange(-10, 10);
    
    return {
      primary: baseColors.primary,
      secondary: { 
        h: (hue + 120 + variation1) % 360, 
        s: baseColors.primary.s - randomInRange(0, 10),
        l: baseColors.primary.l + randomInRange(0, 10)
      },
      accent: { 
        h: (hue + 240 + variation2) % 360, 
        s: baseColors.primary.s,
        l: baseColors.primary.l
      }
    };
  }
  
  function generateSplitComplementaryScheme(baseColors) {
    const hue = baseColors.primary.h;
    const angle = randomInRange(30, 50);
    
    return {
      primary: baseColors.primary,
      secondary: { 
        h: (hue + 180 - angle) % 360, 
        s: baseColors.primary.s,
        l: baseColors.primary.l
      },
      accent: { 
        h: (hue + 180 + angle) % 360, 
        s: baseColors.primary.s,
        l: baseColors.primary.l
      }
    };
  }
  
  function generateBackgroundAndText(primary) {
    const useDarkMode = Math.random() > 0.5;
    
    if (useDarkMode) {
      const useTint = Math.random() > 0.4;
      
      const background = useTint 
        ? { h: primary.h, s: randomInRange(20, 40), l: randomInRange(8, 15) }
        : { h: 0, s: 0, l: 5 };
      
      const usePrimaryForText = Math.random() > 0.5;
      const text = usePrimaryForText
        ? { h: primary.h, s: randomInRange(60, 90), l: randomInRange(80, 90) }
        : { h: 0, s: 0, l: 95 }; // Near white
      
      return { background, text, isDarkMode: true };
    } else {
      const useTint = Math.random() > 0.4;
      
      const background = useTint 
        ? { h: primary.h, s: randomInRange(2, 8), l: randomInRange(96, 99) }
        : { h: 0, s: 0, l: 100 };
      
      const usePrimaryForText = Math.random() > 0.5;
      const text = usePrimaryForText
        ? { h: primary.h, s: randomInRange(10, 30), l: randomInRange(10, 20) }
        : { h: 0, s: 0, l: 10 };
      
      return { background, text, isDarkMode: false };
    }
  }
  
  export function generateDynamicPalette(topic) {
    const baseColors = getBaseColorsFromTopic(topic);
    
    const schemes = [
      generateAnalogousScheme,
      generateMonochromaticScheme,
      generateComplementaryScheme,
      generateTriadicScheme,
      generateSplitComplementaryScheme
    ];
    
    const schemeIndex = Math.floor(Math.random() * schemes.length);
    const selectedScheme = schemes[schemeIndex];
    
    const colorScheme = selectedScheme(baseColors);
    
    const { background, text, isDarkMode } = generateBackgroundAndText(colorScheme.primary);
    
    if (isDarkMode) {
      colorScheme.primary.s = Math.min(100, colorScheme.primary.s + 10);
      colorScheme.primary.l = Math.min(70, colorScheme.primary.l + 15);
      
      colorScheme.secondary.s = Math.min(100, colorScheme.secondary.s + 10);
      colorScheme.secondary.l = Math.min(70, colorScheme.secondary.l + 15);
      
      colorScheme.accent.s = Math.min(100, colorScheme.accent.s + 10);
      colorScheme.accent.l = Math.min(70, colorScheme.accent.l + 15);
    }
    
    return {
      primary: hslToSlides(colorScheme.primary.h, colorScheme.primary.s, colorScheme.primary.l),
      secondary: hslToSlides(colorScheme.secondary.h, colorScheme.secondary.s, colorScheme.secondary.l),
      accent: hslToSlides(colorScheme.accent.h, colorScheme.accent.s, colorScheme.accent.l),
      background: hslToSlides(background.h, background.s, background.l),
      text: hslToSlides(text.h, text.s, text.l),
      isDarkMode: isDarkMode // Include mode flag for other parts of the app
    };
  }
  
  export function createGradient(color1, color2, steps = 5) {
    const result = [];
    
    const r1 = color1.rgbColor.red;
    const g1 = color1.rgbColor.green;
    const b1 = color1.rgbColor.blue;
    
    const r2 = color2.rgbColor.red;
    const g2 = color2.rgbColor.green;
    const b2 = color2.rgbColor.blue;
    
    const rStep = (r2 - r1) / (steps - 1);
    const gStep = (g2 - g1) / (steps - 1);
    const bStep = (b2 - b1) / (steps - 1);
    
    for (let i = 0; i < steps; i++) {
      result.push({
        rgbColor: {
          red: r1 + (rStep * i),
          green: g1 + (gStep * i),
          blue: b1 + (bStep * i)
        }
      });
    }
    
    return result;
  }