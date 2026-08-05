export interface Product {
  id: string;
  title: string;
  category: 'trays' | 'jars' | 'holders' | 'vases' | 'diy';
  categoryLabel: string;
  price: number;
  b2bBulkPrice?: number; // Price per unit for B2B orders 50+ units
  badge?: string;
  shortDesc: string;
  fullDesc: string;
  dimensions: string;
  weight: string;
  finishes: string[];
  b2bSuitable: boolean;
  popularForCandles?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'jar-cylinder-8oz',
    title: 'Minimalist Cylinder Concrete Candle Jar (8oz)',
    category: 'jars',
    categoryLabel: 'Concrete Jars & Vessels',
    price: 18,
    b2bBulkPrice: 8.50,
    badge: 'B2B Candle Favorite',
    shortDesc: 'Smooth hand-poured concrete jar designed specifically for candle makers. Seated with heat-resistant wax seal.',
    fullDesc: 'Crafted in small batches with intentional concrete density. Each jar undergoes a multi-step sanding and internal sealant process ensuring wax-safety and heat tolerance up to 250°F. Perfect for luxury candle brands and DIY pourers.',
    dimensions: '3.2" Diameter x 3.5" Height',
    weight: '340g',
    finishes: ['Natural Charcoal', 'Rose Terracotta', 'Concrete Greige', 'Warm Sand'],
    b2bSuitable: true,
    popularForCandles: true
  },
  {
    id: 'tray-oval-vanity',
    title: 'Minimalist Oval Catchall & Vanity Tray',
    category: 'trays',
    categoryLabel: 'Concrete Trays',
    price: 24,
    b2bBulkPrice: 12.00,
    badge: 'Bestseller',
    shortDesc: 'Versatile curved concrete tray for jewelry, perfume, candles, or desk organization.',
    fullDesc: 'Hand-poured with a silky smooth tactile surface and protective silicone feet. Seals against moisture and water spots, making it ideal for bathroom vanities or coffee tables.',
    dimensions: '9.2" L x 4.5" W x 0.75" H',
    weight: '450g',
    finishes: ['Natural Charcoal', 'Terrazzo Speckle', 'Rose Clay Marbled', 'Warm Sand'],
    b2bSuitable: true
  },
  {
    id: 'jar-ribbed-fluted',
    title: 'Fluted Ribbed Concrete Vessel with Lid',
    category: 'jars',
    categoryLabel: 'Concrete Jars & Vessels',
    price: 26,
    b2bBulkPrice: 11.50,
    badge: 'Hand-Painted Available',
    shortDesc: 'Architectural ribbed texture vessel with matching concrete lid. Ideal for candles or trinket storage.',
    fullDesc: 'Features vertical micro-fluting for tactile depth. Comes with a matching concrete lid with rubber rim for snug closure. Popular as a high-end candle vessel for boutique brands.',
    dimensions: '3.5" D x 4.0" H',
    weight: '480g',
    finishes: ['Rose Terracotta', 'Natural Charcoal', 'Warm Sand', 'Hand-Painted Gold Rim'],
    b2bSuitable: true,
    popularForCandles: true
  },
  {
    id: 'holder-taper-trio',
    title: 'Ribbed Taper Candle Holder Trio Set',
    category: 'holders',
    categoryLabel: 'Candle Holders',
    price: 32,
    b2bBulkPrice: 16.00,
    badge: 'Small Batch',
    shortDesc: 'Set of 3 staggered height concrete holders for standard 7/8" taper candles.',
    fullDesc: 'Designed to bring sculptural elegance to dining tables or mantels. Heavy solid concrete core prevents tipping and catches wax drips cleanly.',
    dimensions: 'Heights: 3", 4.5", 6" | Base: 2.2" D',
    weight: '720g (Set)',
    finishes: ['Concrete Greige', 'Natural Charcoal', 'Rose Clay Trio'],
    b2bSuitable: true
  },
  {
    id: 'vase-arched-sculptural',
    title: 'Sculptural Arch Concrete Bud Vase',
    category: 'vases',
    categoryLabel: 'Vases & Planters',
    price: 28,
    b2bBulkPrice: 14.00,
    badge: 'Artisan Pick',
    shortDesc: 'Modern geometric arch vase lined with waterproof inner tube for dried or fresh stems.',
    fullDesc: 'An artistic focal point for any shelf or desk. Each piece features unique small-batch concrete bubble variations that celebrate raw, organic texture.',
    dimensions: '6.0" W x 7.2" H x 1.8" D',
    weight: '850g',
    finishes: ['Warm Sand', 'Rose Terracotta', 'Natural Charcoal'],
    b2bSuitable: true
  },
  {
    id: 'diy-starter-pouring-kit',
    title: 'Small-Batch DIY Concrete Pouring Starter Kit',
    category: 'diy',
    categoryLabel: 'DIY Kits',
    price: 45,
    badge: 'Great for Gift & DIY Lovers',
    shortDesc: 'Complete DIY kit with premium fast-setting concrete mix, 2 silicone molds, pigment powders & instructions.',
    fullDesc: 'Everything an art enthusiast needs for their next weekend project! Includes 1kg specialized ultra-fine concrete mix, 1 oval tray mold, 1 small jar mold, charcoal & terracotta iron oxide pigments, sealer, sanding sponges, and step-by-step guide.',
    dimensions: 'Box: 10" x 8" x 5"',
    weight: '1800g',
    finishes: ['Includes Charcoal & Terracotta Pigments'],
    b2bSuitable: false
  },
  {
    id: 'holder-pillar-base',
    title: 'Heavyweight Pedestal Pillar Candle Base',
    category: 'holders',
    categoryLabel: 'Candle Holders',
    price: 22,
    b2bBulkPrice: 10.00,
    badge: 'Flame Safe',
    shortDesc: 'Substantial round concrete platform crafted to elevate 3" to 4" pillar candles.',
    fullDesc: 'Features a wide rim drip-reservoir and non-scratch cork backing. Heat resistant and treated with natural mineral sealers.',
    dimensions: '5.2" Diameter x 1.2" Height',
    weight: '510g',
    finishes: ['Natural Charcoal', 'Concrete Greige', 'Rose Terracotta'],
    b2bSuitable: true
  },
  {
    id: 'vase-fluted-planter',
    title: 'Fluted Low-Profile Succulent & Desk Planter',
    category: 'vases',
    categoryLabel: 'Vases & Planters',
    price: 25,
    b2bBulkPrice: 12.50,
    badge: 'B2B Favorite',
    shortDesc: 'Tactile fluted concrete planter with optional drainage hole for succulents or stationery.',
    fullDesc: 'Breathable concrete formula ideal for plant root health. Sealed exterior preserves the concrete finish against soil moisture.',
    dimensions: '4.8" D x 3.2" H',
    weight: '620g',
    finishes: ['Warm Sand', 'Natural Charcoal', 'Concrete Greige'],
    b2bSuitable: true
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Products' },
  { id: 'trays', name: 'Trays & Catchalls' },
  { id: 'jars', name: 'Candle Jars & Vessels' },
  { id: 'holders', name: 'Candle Holders' },
  { id: 'vases', name: 'Vases & Planters' },
  { id: 'diy', name: 'DIY Craft Kits' }
];
