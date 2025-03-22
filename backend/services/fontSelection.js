const fontFamilies = {
    modern: [
      'Montserrat',
      'Roboto',
      'Open Sans',
      'Lato',
      'Source Sans Pro',
      'Raleway',
      'Nunito Sans'
    ],
    
    classic: [
      'Georgia',
      'Playfair Display',
      'Merriweather',
      'Libre Baskerville',
      'Crimson Text',
      'EB Garamond'
    ],
    
    display: [
      'Oswald',
      'Bebas Neue',
      'Anton',
      'Archivo Black',
      'Poppins',
      'Abril Fatface'
    ],
    
    creative: [
      'Quicksand',
      'Comfortaa',
      'Pacifico',
      'Dancing Script',
      'Caveat',
      'Indie Flower'
    ],
    
    neutral: [
      'Noto Sans',
      'IBM Plex Sans',
      'Karla',
      'Work Sans',
      'PT Sans',
      'Fira Sans'
    ]
  };
  
  const fontPairings = [
    {
      name: 'Modern Professional',
      title: 'Montserrat',
      body: 'Open Sans',
      accent: 'Georgia'
    },
    {
      name: 'Clean Tech',
      title: 'Raleway',
      body: 'Source Sans Pro',
      accent: 'Roboto'
    },
    {
      name: 'Bold Corporate',
      title: 'Oswald',
      body: 'Nunito Sans',
      accent: 'Lato'
    },
    {
      name: 'Elegant Business',
      title: 'Playfair Display',
      body: 'Lato',
      accent: 'Crimson Text'
    },
    {
      name: 'Creative Modern',
      title: 'Poppins',
      body: 'Work Sans',
      accent: 'Quicksand'
    },
    {
      name: 'Classic Academic',
      title: 'Merriweather',
      body: 'PT Sans',
      accent: 'EB Garamond'
    },
    {
      name: 'Minimalist',
      title: 'Archivo Black',
      body: 'IBM Plex Sans',
      accent: 'Fira Sans'
    },
    {
      name: 'Creative Casual',
      title: 'Comfortaa',
      body: 'Karla',
      accent: 'Caveat'
    }
  ];
  
  function getTopicBasedFonts(topic) {
    return getRandomPairing();
  }
  
  function getRandomPairing(pairingNames) {
    if (pairingNames && Array.isArray(pairingNames)) {
      const filteredPairings = fontPairings.filter(pair => pairingNames.includes(pair.name));
      if (filteredPairings.length > 0) {
        return filteredPairings[Math.floor(Math.random() * filteredPairings.length)];
      }
    }
    
    return fontPairings[Math.floor(Math.random() * fontPairings.length)];
  }
  
  function generateCustomPairing() {
    const randomTitle = fontFamilies.display[Math.floor(Math.random() * fontFamilies.display.length)];
    const randomBody = fontFamilies.neutral[Math.floor(Math.random() * fontFamilies.neutral.length)];
    const randomAccent = fontFamilies.classic[Math.floor(Math.random() * fontFamilies.classic.length)];
    
    return {
      name: 'Custom Generated',
      title: randomTitle,
      body: randomBody,
      accent: randomAccent
    };
  }
  
  export function getFontTheme(topic, randomize = false) {
    const pairing = randomize ? generateCustomPairing() : getTopicBasedFonts(topic);
    
    return {
      titleFont: pairing.title,
      bodyFont: pairing.body,
      accentFont: pairing.accent,
      pairingName: pairing.name
    };
  }
  
  export function getAllFonts() {
    const allFonts = new Set();
    
    Object.values(fontFamilies).forEach(fontList => {
      fontList.forEach(font => allFonts.add(font));
    });
    
    return Array.from(allFonts).sort();
  }