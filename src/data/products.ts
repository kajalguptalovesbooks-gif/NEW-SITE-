export interface Product {
  id: string;
  name: string;
  brand: 'Google' | 'Android' | 'YouTube' | 'Chrome' | '1998 Retro';
  category: 'Android Collectibles' | '1998 Retro Collection' | 'YouTube Kids & Apparel' | 'Chrome Dino Collectibles' | 'Classic Google Drinkware & Stationery';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  details: string[];
  image: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  inStock: boolean;
  featured?: boolean;
  isAnchor?: boolean;
  sku: string;
  badge?: string;
  bundleSuggestions?: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'marine-layer-1998-pullover',
    name: 'Google Marine Layer 1998 Pullover',
    brand: '1998 Retro',
    category: '1998 Retro Collection',
    price: 98.00,
    originalPrice: 115.00,
    rating: 4.9,
    reviewCount: 342,
    description: 'A cozy vintage celebration of Google\'s founding year. Crafted in collaboration with Marine Layer using custom-developed micro-fleece featuring the iconic original 1998 four-color embroidered chest logo.',
    details: [
      'Custom 60% Supima Cotton / 40% Modal blend',
      'Quarter-zip mock neck with antique brass YKK hardware',
      'Embroidered heritage 1998 Google serif logo',
      'Pre-shrunk custom wash with brushed interior fleece',
      'Sustainably manufactured in certified facilities'
    ],
    image: '/src/assets/images/marine_layer_pullover_1790191164565.jpg',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Vintage Deep Navy', hex: '#1E293B' },
      { name: 'Heather Mountain Gray', hex: '#64748B' },
      { name: 'Palo Alto Pine', hex: '#14532D' }
    ],
    inStock: true,
    featured: true,
    isAnchor: true,
    sku: 'GGL-98-MLP-01',
    badge: 'Heritage Anchor',
    bundleSuggestions: ['android-classic-plushie', 'chrome-dino-collectible-figure']
  },
  {
    id: 'android-classic-plushie',
    name: 'Android Classic Collector Plushie',
    brand: 'Android',
    category: 'Android Collectibles',
    price: 24.00,
    originalPrice: 28.00,
    rating: 4.95,
    reviewCount: 512,
    description: 'The beloved official bugdroid mascot in ultra-plush velour fabric. Featuring poseable antenna ears and weighted bead base designed to sit proudly on your desk setup.',
    details: [
      'Authentic Android Green Pantone 376C color match',
      'High-density hypoallergenic micro-fiber fill',
      'Internal micro-pellet base for weighted balance',
      'Stitch-reinforced flexible antennae',
      'Height: 8 inches (20.3 cm)'
    ],
    image: '/src/assets/images/android_classic_plushie_1790191177596.jpg',
    inStock: true,
    featured: true,
    sku: 'AND-PLSH-001',
    badge: 'Trending Collector Item',
    bundleSuggestions: ['chrome-dino-collectible-figure', 'google-matte-ceramic-mug']
  },
  {
    id: 'chrome-dino-collectible-figure',
    name: 'Chrome Offline Dino Vinyl Figurine',
    brand: 'Chrome',
    category: 'Chrome Dino Collectibles',
    price: 19.50,
    rating: 4.85,
    reviewCount: 289,
    description: 'The world’s most played offline companion immortalized in matte vinyl. Modeled after the 8-bit runner cactus-jumping legend of Google Chrome.',
    details: [
      'Matte obsidian stone-finish soft-touch vinyl',
      'Pixel-accurate geometric proportions',
      'Includes 1 miniature pixel cactus desk prop',
      'Official Chrome engraved baseplate',
      'Dimensions: 3.5" H x 3.8" W'
    ],
    image: '/src/assets/images/chrome_dino_figure_1790191191577.jpg',
    inStock: true,
    featured: true,
    sku: 'CHRM-DINO-09',
    badge: 'Fan Favorite',
    bundleSuggestions: ['android-classic-plushie', 'google-heritage-field-notebook']
  },
  {
    id: 'youtube-premium-creators-hoodie',
    name: 'YouTube Kids & Creator Essential Zip Hoodie',
    brand: 'YouTube',
    category: 'YouTube Kids & Apparel',
    price: 68.00,
    originalPrice: 75.00,
    rating: 4.8,
    reviewCount: 194,
    description: 'Engineered for late night editing and studio sessions. Features a fleece-lined kangaroo pocket, high-density red silicone play button logo, and cord routing channel for headphones.',
    details: [
      'Heavyweight 380 GSM ring-spun combed fleece',
      'Subtle monochrome matte red YouTube play insignia',
      'Double-lined thermal hood with metal aglets',
      'Thumb loops at cuffs for warmth',
      'Reinforced seams throughout'
    ],
    image: '/src/assets/images/marine_layer_pullover_1790191164565.jpg',
    sizes: ['Youth L', 'XS', 'S', 'M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Studio Jet Black', hex: '#0F172A' },
      { name: 'Broadcast Heather Grey', hex: '#475569' }
    ],
    inStock: true,
    featured: false,
    sku: 'YT-CR-ZIP-04',
    badge: 'Creator Gear',
    bundleSuggestions: ['marine-layer-1998-pullover']
  },
  {
    id: 'google-matte-ceramic-mug',
    name: 'Google Four-Color Accent Ceramic Mug',
    brand: 'Google',
    category: 'Classic Google Drinkware & Stationery',
    price: 18.00,
    rating: 4.75,
    reviewCount: 420,
    description: 'Sleek 14oz ceramic mug in minimalist speckled matte bone white with interior dipped in Google Blue, Red, Yellow, and Green gradient glaze.',
    details: [
      '14 oz / 415 ml capacity',
      'Microwave & dishwasher safe durable ceramic',
      'Ergonomic comfort-grip handle',
      'Embossed micro Google "G" emblem at base',
      'Double-walled thermal insulation'
    ],
    image: '/src/assets/images/chrome_dino_figure_1790191191577.jpg',
    inStock: true,
    featured: true,
    sku: 'GGL-DW-MUG-14',
    badge: 'Campus Classic',
    bundleSuggestions: ['google-heritage-field-notebook']
  },
  {
    id: 'google-heritage-field-notebook',
    name: 'Google 1998 Grid Hardcover Journal Set',
    brand: 'Google',
    category: 'Classic Google Drinkware & Stationery',
    price: 22.00,
    rating: 4.9,
    reviewCount: 153,
    description: 'Two-pack of dot-grid and ruled hardcover notebooks with lay-flat binding, ribbon bookmarks in primary Google colors, and archival 120gsm ink-proof paper.',
    details: [
      'Includes 2 journals (192 pages each)',
      '120 GSM fountain-pen friendly acid-free paper',
      'Back cover expandable storage pocket',
      'Elastic closure band and dual ribbon markers',
      'Debossed 1998 logo on back panel'
    ],
    image: '/src/assets/images/marine_layer_pullover_1790191164565.jpg',
    inStock: true,
    sku: 'GGL-ST-NBK-02',
    bundleSuggestions: ['google-matte-ceramic-mug']
  },
  {
    id: 'android-bot-enamel-pin-set',
    name: 'Android Bot Expressions Enamel Pin Set (Pack of 4)',
    brand: 'Android',
    category: 'Android Collectibles',
    price: 16.00,
    rating: 4.88,
    reviewCount: 97,
    description: 'Four collectible hard enamel pins with gold-plated brass borders showcasing Bugdroid sipping coffee, holding a balloon, coding, and jumping with joy.',
    details: [
      'Hard enamel with polished gold plating',
      'Double rubber clutch backs to prevent rotation',
      'Official Android Hologram Authenticity card included',
      'Average size: 1.25 inches across'
    ],
    image: '/src/assets/images/android_classic_plushie_1790191177596.jpg',
    inStock: true,
    sku: 'AND-PIN-SET-04'
  },
  {
    id: 'chrome-dino-pixel-tee',
    name: 'Chrome Dino 8-Bit Pixel Organic T-Shirt',
    brand: 'Chrome',
    category: 'Chrome Dino Collectibles',
    price: 32.00,
    rating: 4.78,
    reviewCount: 164,
    description: '100% GOTS-certified organic ring-spun cotton tee printed with water-based discharge ink depicting the classic pixel desert scene.',
    details: [
      '100% organic cotton (180 GSM)',
      'Breathable water-based screenprint',
      'Ribbed crew collar with taped neck & shoulders',
      'Casual unisex standard fit'
    ],
    image: '/src/assets/images/chrome_dino_figure_1790191191577.jpg',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    sku: 'CHRM-TEE-8BIT'
  }
];

export const CATEGORIES = [
  'All Products',
  '1998 Retro Collection',
  'Android Collectibles',
  'YouTube Kids & Apparel',
  'Chrome Dino Collectibles',
  'Classic Google Drinkware & Stationery'
] as const;

export const FREE_SHIPPING_THRESHOLD = 75.00;
export const STANDARD_SHIPPING_COST = 5.00;
