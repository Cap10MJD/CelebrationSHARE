// SEO Service for dynamic meta tags and page optimization

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
  structuredData?: any;
}

// Event rental specific SEO configurations
export const eventRentalSEO: Record<string, SEOConfig> = {
  home: {
    title: 'CelebrationShare - Event Rentals, Party Supplies & Wedding Equipment | Local Party Rentals',
    description: 'Find affordable event rentals, party supplies, wedding equipment, and kids party items near you. Rent tables, chairs, decorations, audio equipment, and more from trusted local owners. Perfect for weddings, birthday parties, corporate events, and family celebrations.',
    keywords: [
      'event rentals', 'party rentals', 'wedding rentals', 'party supplies', 'kids party supplies',
      'birthday party rentals', 'corporate event rentals', 'audio equipment rental',
      'tables and chairs rental', 'party decorations', 'tent rentals', 'wedding decorations',
      'celebration rentals', 'local party rentals', 'affordable event rentals'
    ]
  },
  
  browse: {
    title: 'Browse Event Rentals & Party Supplies | CelebrationShare',
    description: 'Browse thousands of event rentals and party supplies from local owners. Find wedding equipment, birthday party supplies, corporate event rentals, and more. All items verified and family-safe.',
    keywords: [
      'browse event rentals', 'party supplies near me', 'wedding equipment rental',
      'birthday party supplies', 'corporate event rentals', 'audio equipment rental',
      'tables chairs rental', 'party decorations', 'tent rental', 'kids party supplies'
    ]
  },
  
  weddingRentals: {
    title: 'Wedding Rental Equipment & Supplies | CelebrationShare',
    description: 'Complete wedding rental equipment including decorations, tables, chairs, audio systems, tents, and linens. All items verified and perfect for your special day.',
    keywords: [
      'wedding rentals', 'wedding equipment rental', 'wedding decorations',
      'wedding reception rental', 'wedding tent rentals', 'wedding audio equipment',
      'wedding supplies', 'wedding rental service', 'wedding equipment near me'
    ]
  },
  
  kidsPartySupplies: {
    title: 'Kids Party Supplies & Children\'s Party Equipment | CelebrationShare',
    description: 'Safe, family-friendly kids party supplies and children\'s party equipment. Birthday decorations, games, and entertainment perfect for children\'s events.',
    keywords: [
      'kids party supplies', 'children\'s party equipment', 'birthday party supplies',
      'kids birthday party', 'children\'s party decorations', 'kids party games',
      'family party supplies', 'safe kids party equipment', 'children\'s party rental'
    ]
  },
  
  corporateEvents: {
    title: 'Corporate Event Rentals & Business Equipment | CelebrationShare',
    description: 'Professional corporate event rentals including audio equipment, tables, chairs, and decorations. Perfect for business events, conferences, and corporate functions.',
    keywords: [
      'corporate event rentals', 'business event equipment', 'corporate party supplies',
      'professional audio equipment', 'conference rentals', 'business event rental',
      'corporate equipment rental', 'professional event supplies'
    ]
  },
  
  audioEquipment: {
    title: 'Audio Equipment Rental for Events | CelebrationShare',
    description: 'Professional audio equipment rental for events, parties, and celebrations. Sound systems, microphones, speakers, and more from trusted local owners.',
    keywords: [
      'audio equipment rental', 'sound system rental', 'microphone rental',
      'speaker rental', 'event audio equipment', 'party sound system',
      'professional audio rental', 'audio equipment near me'
    ]
  },
  
  tablesChairs: {
    title: 'Tables & Chairs Rental for Events | CelebrationShare',
    description: 'Event tables and chairs rental for parties, weddings, and corporate events. Quality furniture from local owners at affordable prices.',
    keywords: [
      'tables and chairs rental', 'event furniture rental', 'party tables chairs',
      'wedding tables chairs', 'corporate furniture rental', 'event seating rental',
      'party furniture', 'tables chairs near me'
    ]
  },
  
  partyDecorations: {
    title: 'Party Decorations & Event Supplies | CelebrationShare',
    description: 'Beautiful party decorations and event supplies for all occasions. Balloons, banners, centerpieces, and more from local suppliers.',
    keywords: [
      'party decorations', 'event supplies', 'birthday decorations',
      'wedding decorations', 'party supplies', 'event decorations',
      'balloon decorations', 'party centerpieces', 'event supplies near me'
    ]
  },
  
  tentRentals: {
    title: 'Tent Rentals & Canopies for Events | CelebrationShare',
    description: 'Professional tent rentals and canopies for outdoor events, weddings, and parties. Various sizes available from local suppliers.',
    keywords: [
      'tent rentals', 'canopy rental', 'outdoor event tents',
      'wedding tent rental', 'party tent rental', 'event canopy rental',
      'outdoor tent rental', 'tent rental near me'
    ]
  }
};

// Update page meta tags dynamically
export const updatePageSEO = (config: SEOConfig) => {
  // Update title
  document.title = config.title;
  
  // Update meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', config.description);
  
  // Update keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.setAttribute('content', config.keywords.join(', '));
  
  // Update Open Graph tags
  updateOpenGraph(config);
  
  // Update canonical URL
  if (config.canonical) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', config.canonical);
  }
  
  // Add structured data if provided
  if (config.structuredData) {
    addStructuredData(config.structuredData);
  }
};

// Update Open Graph tags
const updateOpenGraph = (config: SEOConfig) => {
  const ogTags = {
    'og:title': config.title,
    'og:description': config.description,
    'og:image': config.ogImage || 'https://celebrationShare.com/og-image.jpg',
    'og:url': config.canonical || window.location.href,
    'og:type': 'website'
  };
  
  Object.entries(ogTags).forEach(([property, content]) => {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  });
};

// Add structured data to page
const addStructuredData = (data: any) => {
  // Remove existing structured data
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach(script => script.remove());
  
  // Add new structured data
  const script = document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

// Generate structured data for item pages
export const generateItemStructuredData = (item: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": item.title,
    "description": item.description,
    "image": item.images[0],
    "offers": {
      "@type": "Offer",
      "price": item.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": `https://celebrationShare.com/item/${item.id}`
    },
    "category": item.category,
    "brand": {
      "@type": "Brand",
      "name": "CelebrationShare"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": item.rating,
      "reviewCount": item.reviews
    }
  };
};

// Generate structured data for category pages
export const generateCategoryStructuredData = (category: string, items: any[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${category} Rentals`,
    "description": `Browse ${category.toLowerCase()} rentals and equipment from local owners`,
    "numberOfItems": items.length,
    "itemListElement": items.slice(0, 10).map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": item.title,
        "url": `https://celebrationShare.com/item/${item.id}`,
        "image": item.images[0],
        "offers": {
          "@type": "Offer",
          "price": item.price,
          "priceCurrency": "USD"
        }
      }
    }))
  };
};

// SEO-friendly URL generation
export const generateSEOFriendlyURL = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Generate breadcrumb structured data
export const generateBreadcrumbData = (breadcrumbs: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
};

// Event rental specific SEO helpers
export const getEventRentalSEO = (page: string, additionalData?: any): SEOConfig => {
  const baseConfig = eventRentalSEO[page] || eventRentalSEO.home;
  
  if (additionalData) {
    return {
      ...baseConfig,
      title: baseConfig.title.replace('{data}', additionalData),
      description: baseConfig.description.replace('{data}', additionalData)
    };
  }
  
  return baseConfig;
};

// Update SEO for specific event types
export const updateEventTypeSEO = (eventType: string) => {
  const eventTypeConfigs: Record<string, SEOConfig> = {
    wedding: {
      title: 'Wedding Rentals & Equipment | CelebrationShare',
      description: 'Complete wedding rental equipment including decorations, tables, chairs, audio systems, and tents. Perfect for your special day.',
      keywords: ['wedding rentals', 'wedding equipment', 'wedding decorations', 'wedding supplies']
    },
    birthday: {
      title: 'Birthday Party Rentals & Supplies | CelebrationShare',
      description: 'Birthday party rentals and supplies for all ages. Decorations, games, tables, chairs, and more for the perfect celebration.',
      keywords: ['birthday party rentals', 'birthday supplies', 'party decorations', 'birthday equipment']
    },
    corporate: {
      title: 'Corporate Event Rentals & Equipment | CelebrationShare',
      description: 'Professional corporate event rentals including audio equipment, tables, chairs, and decorations for business events.',
      keywords: ['corporate event rentals', 'business equipment', 'corporate supplies', 'professional rentals']
    },
    kids: {
      title: 'Kids Party Supplies & Children\'s Equipment | CelebrationShare',
      description: 'Safe, family-friendly kids party supplies and children\'s party equipment for birthday parties and family events.',
      keywords: ['kids party supplies', 'children\'s equipment', 'kids decorations', 'family party supplies']
    }
  };
  
  const config = eventTypeConfigs[eventType] || eventRentalSEO.home;
  updatePageSEO(config);
}; 