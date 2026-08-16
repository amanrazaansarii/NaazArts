export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: string;
  priceValue: number;
  swatch: string;
  badge?: "new" | "limited";
  image?: string;
  description: string;
  details: string[];
  dimensions: string;
  weight: string;
  inStock: boolean;
  leadTime: string;
  colors?: { name: string; hex: string; swatchVar: string }[];
}

export const CATEGORIES = [
  "All",
  "Premium trays",
  "Raw trays — DIY",
  "Vases",
  "Coasters",
  "Candles — seasonal",
  "Starter kits",
  "Wholesale jars",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    slug: "marble-tray-sage",
    name: "Marble tray — sage",
    category: "Premium trays",
    price: "$28",
    priceValue: 28,
    swatch: "var(--tone-1)",
    badge: "new",
    image: "https://ik.imagekit.io/naazartstudio/IMG_6856.jpeg?updatedAt=1786806284780",
    description: "An organically contoured concrete accent tray, hand-marbled with soft mineral sage tones and natural earth pigments. Sealed with eco-friendly organic beeswax for a satin tactile finish.",
    details: [
      "Individually hand-cast with natural air bubble character",
      "Finished with a 3-layer organic natural sealant",
      "Cork base pad to protect wood and glass tabletops",
      "Safe for dry foods, jewelry, key trays, or vanity organization",
    ],
    dimensions: '8.25" L x 4.5" W x 0.75" H',
    weight: "420g",
    inStock: true,
    leadTime: "Dispatched in 2-3 studio days",
    colors: [
      { name: "Sage Mist", hex: "#A8B29A", swatchVar: "var(--tone-1)" },
      { name: "Terracotta Clay", hex: "#C1704E", swatchVar: "var(--tone-2)" },
      { name: "Blush Sand", hex: "#D6C4AE", swatchVar: "var(--tone-3)" },
    ],
  },
  {
    id: "prod-2",
    slug: "marble-tray-terracotta",
    name: "Marble tray — terracotta",
    category: "Premium trays",
    price: "$28",
    priceValue: 28,
    swatch: "var(--tone-2)",
    image: "https://ik.imagekit.io/naazartstudio/IMG_8148.png?updatedAt=1786806300638",
    description: "Hand-poured concrete dish featuring deep terracotta marbling swirled into warm off-white stone cement. Each swirl is completely unique and unrepeatable.",
    details: [
      "Custom earth-pigment suspension technique",
      "Water-resistant organic sealant formulation",
      "Protective velvet-soft base backing",
      "Ideal for perfumes, catch-alls, or candle displays",
    ],
    dimensions: '8.25" L x 4.5" W x 0.75" H',
    weight: "430g",
    inStock: true,
    leadTime: "Dispatched in 2-3 studio days",
    colors: [
      { name: "Terracotta Clay", hex: "#C1704E", swatchVar: "var(--tone-2)" },
      { name: "Sage Mist", hex: "#A8B29A", swatchVar: "var(--tone-1)" },
    ],
  },
  {
    id: "prod-3",
    slug: "pastel-tray-blush",
    name: "Pastel tray — blush",
    category: "Premium trays",
    price: "$26",
    priceValue: 26,
    swatch: "var(--tone-3)",
    image: "https://ik.imagekit.io/naazartstudio/IMG_0294.jpeg?updatedAt=1786823662902",
    description: "Soft rose-tinted concrete sculpted into a smooth pill-shaped resting tray. A gentle tactile piece for bedside tables or entryway consoles.",
    details: [
      "Monolithic solid pastel cast",
      "Silky matte hand-sanded edge finish",
      "Non-porous cured cement mix",
      "Easy maintenance — wipe clean with warm damp cloth",
    ],
    dimensions: '7.5" L x 4.0" W x 0.65" H',
    weight: "380g",
    inStock: true,
    leadTime: "Dispatched in 2-3 studio days",
  },
  {
    id: "prod-4",
    slug: "earthy-tray-clay",
    name: "Earthy tray — clay",
    category: "Premium trays",
    price: "$26",
    priceValue: 26,
    swatch: "var(--tone-4)",
    image: "https://ik.imagekit.io/naazartstudio/IMG_6856.jpeg?updatedAt=1786806284780",
    description: "Deep clay-hued catchall tray inspired by raw earthen ceramics. Heavyweight, grounded, and undeniably warm.",
    details: [
      "Natural iron-oxide mineral colorant",
      "Subtle textural grain on rim",
      "Double-sealed for spill resistance",
    ],
    dimensions: '8.0" L x 4.25" W x 0.70" H',
    weight: "410g",
    inStock: true,
    leadTime: "Dispatched in 2-3 studio days",
  },
  {
    id: "prod-5",
    slug: "raw-tray-round-blank",
    name: "Raw tray — round, blank",
    category: "Raw trays — DIY",
    price: "$14",
    priceValue: 14,
    swatch: "var(--tone-3)",
    image: "https://ik.imagekit.io/naazartstudio/IMG_0294.jpeg?updatedAt=1786823662902",
    description: "Cured, unsealed raw concrete canvas ready for your personal painting, marbling, or decoupage artistic projects.",
    details: [
      "Smooth pre-sanded white cement foundation",
      "Absorbs acrylics, alcohol inks, and resin perfectly",
      "Includes studio sealing guide and cork pad",
    ],
    dimensions: '6.0" Diameter x 0.6" H',
    weight: "290g",
    inStock: true,
    leadTime: "In stock, ready to ship",
  },
  {
    id: "prod-6",
    slug: "raw-tray-square-blank",
    name: "Raw tray — square, blank",
    category: "Raw trays — DIY",
    price: "$14",
    priceValue: 14,
    swatch: "var(--tone-6)",
    image: "https://ik.imagekit.io/naazartstudio/IMG_0294.jpeg?updatedAt=1786823662902",
    description: "Clean geometric square tray in natural untreated concrete. The perfect blank slate for creative makers.",
    details: [
      "Beveled soft corners to avoid chipping",
      "Fine grain surface for intricate brushwork",
      "Includes DIY care & sealing tips leaflet",
    ],
    dimensions: '5.5" x 5.5" x 0.6" H',
    weight: "310g",
    inStock: true,
    leadTime: "In stock, ready to ship",
  },
  {
    id: "prod-7",
    slug: "raw-tray-paint-kit",
    name: "Raw tray + paint kit",
    category: "Raw trays — DIY",
    price: "$22",
    priceValue: 22,
    swatch: "var(--tone-2)",
    badge: "new",
    image: "https://ik.imagekit.io/naazartstudio/IMG_0485.jpeg?updatedAt=1786823837217",
    description: "Complete studio-in-a-box. Contains 2 raw trays, 6 curated earth-tone acrylic paints, 2 precision detail brushes, and a bottle of our studio finishing sealant.",
    details: [
      "2 blank concrete trays (1 round + 1 oval)",
      "6 pigment pots: Terracotta, Sage, Raw Bone, Charcoal, Gold Ochre, Clay",
      "Studio sealant vial + applicator sponge",
      "Full step-by-step video workshop access included",
    ],
    dimensions: 'Box: 10" x 8" x 3"',
    weight: "850g",
    inStock: true,
    leadTime: "In stock, ready to ship",
  },
  {
    id: "prod-8",
    slug: "raw-figurine-kit-kids",
    name: "Raw figurine kit — kids",
    category: "Raw trays — DIY",
    price: "$18",
    priceValue: 18,
    swatch: "var(--tone-8)",
    image: "https://ik.imagekit.io/naazartstudio/IMG_0485.jpeg?updatedAt=1786823837217",
    description: "Whimsical concrete casting figurines designed for kids and families to paint and display.",
    details: [
      "4 mini sculpted concrete animal figures",
      "Non-toxic washable child-safe paint set",
      "Quick-drying tactile creative activity",
    ],
    dimensions: "Miniatures approx 2.5 inches each",
    weight: "450g",
    inStock: true,
    leadTime: "In stock, ready to ship",
  },
  {
    id: "prod-9",
    slug: "pastel-vase",
    name: "Pastel vase",
    category: "Vases",
    price: "$34",
    priceValue: 34,
    swatch: "var(--tone-2)",
    badge: "new",
    image: "https://ik.imagekit.io/naazartstudio/IMG_8148.png?updatedAt=1786806300638",
    description: "Sculptural fluted concrete bud vase. Cast as a heavy solid monolith with an interior waterproof glass cylinder for fresh botanical stems or dried florals.",
    details: [
      "Includes removable waterproof glass inner tube",
      "Suitable for fresh flowers with water or dried stems",
      "Heavy weighted base preventing tipping",
      "Hand-polished soft textural rim",
    ],
    dimensions: '3.2" Diameter x 6.8" H',
    weight: "680g",
    inStock: true,
    leadTime: "Dispatched in 3-4 studio days",
  },
  {
    id: "prod-10",
    slug: "marble-effect-vase",
    name: "Marble-effect vase",
    category: "Vases",
    price: "$36",
    priceValue: 36,
    swatch: "var(--tone-9)",
    image: "https://ik.imagekit.io/naazartstudio/IMG_0747.png?updatedAt=1786817264435",
    description: "Flowing charcoal and sage marbling poured into an arching concrete form. An architectural statement piece for shelves, consoles, and dining tables.",
    details: [
      "Arch form with integrated glass reservoir",
      "Hand-marbled continuous fluid pattern",
      "Felt padded base prevents surface scratches",
    ],
    dimensions: '4.5" W x 2.2" D x 7.5" H',
    weight: "790g",
    inStock: true,
    leadTime: "Dispatched in 3-4 studio days",
  },
  {
    id: "prod-11",
    slug: "hand-painted-vase",
    name: "Hand-painted vase",
    category: "Vases",
    price: "$40",
    priceValue: 40,
    swatch: "var(--tone-6)",
    image: "https://ik.imagekit.io/naazartstudio/IMG_8148.png?updatedAt=1786806300638",
    description: "One-of-a-kind art piece hand-painted by Naaz in our studio using layered botanical brushstrokes and gold mica highlights.",
    details: [
      "Signed by the artist on the underside",
      "UV-resistant protective matte topcoat",
      "Includes certificate of studio authenticity",
    ],
    dimensions: '3.5" Diameter x 7.0" H',
    weight: "720g",
    inStock: true,
    leadTime: "1 of 1 unique piece, ready to dispatch",
  },
  {
    id: "prod-12",
    slug: "earth-tone-coaster-set",
    name: "Earth-tone coaster set",
    category: "Coasters",
    price: "$16",
    priceValue: 16,
    swatch: "var(--tone-5)",
    image: "https://ik.imagekit.io/naazartstudio/IMG_6856.jpeg?updatedAt=1786806284780",
    description: "Set of 4 stackable ribbed coasters in gradient earth tones: Bone, Clay, Terracotta, and Sage. Absorbent and heat-resistant.",
    details: [
      "Set of 4 matching tactile coasters",
      "Heat safe for steaming morning coffee and mugs",
      "Cork bottom lining on every coaster",
      "Comes tied in natural raw jute cord",
    ],
    dimensions: '4.0" Diameter each x 0.4" H',
    weight: "520g (set)",
    inStock: true,
    leadTime: "In stock, ready to ship",
  },
  {
    id: "prod-13",
    slug: "pastel-coaster-set",
    name: "Pastel coaster set",
    category: "Coasters",
    price: "$16",
    priceValue: 16,
    swatch: "var(--tone-1)",
    image: "https://ik.imagekit.io/naazartstudio/IMG_0294.jpeg?updatedAt=1786823662902",
    description: "Set of 4 minimalist hexagonal coasters in muted blush and cream tones. Clean modern lines meeting raw stone texture.",
    details: [
      "Set of 4 interlocking hexagonal coasters",
      "Water-repellent beeswax seal prevents coffee ring stains",
      "Protective scratch-resistant cork feet",
    ],
    dimensions: '4.2" across each x 0.35" H',
    weight: "480g (set)",
    inStock: true,
    leadTime: "In stock, ready to ship",
  },
  {
    id: "prod-14",
    slug: "concrete-candle-jar",
    name: "Concrete candle jar",
    category: "Candles — seasonal",
    price: "$18",
    priceValue: 18,
    swatch: "var(--tone-4)",
    badge: "limited",
    image: "https://ik.imagekit.io/naazartstudio/IMG_6856.jpeg?updatedAt=1786806284780",
    description: "Hand-poured 100% natural soy wax candle inside a reusable artisan concrete vessel with a wooden crackling wick. Scented with wild cedarwood, vanilla, and amber.",
    details: [
      "45+ hour clean, soot-free burn time",
      "FSC-certified crackling wooden wick",
      "Vessel can be repurposed as a succulent planter or pen pot once candle burns down",
    ],
    dimensions: '3.2" Diameter x 3.5" H',
    weight: "550g",
    inStock: true,
    leadTime: "Limited seasonal batch",
  },
  {
    id: "prod-15",
    slug: "festive-scented-candle",
    name: "Festive scented candle",
    category: "Candles — seasonal",
    price: "$20",
    priceValue: 20,
    swatch: "var(--tone-7)",
    badge: "limited",
    image: "https://ik.imagekit.io/naazartstudio/IMG_0747.png?updatedAt=1786817264435",
    description: "Special festive release featuring golden fleck marbling and rich spiced cardamom, orange peel, and sandalwood essential oils.",
    details: [
      "Hand-marbled festive vessel with copper leaf",
      "50-hour soy-coconut clean burn",
      "Includes a concrete snuff lid",
    ],
    dimensions: '3.5" Diameter x 3.8" H',
    weight: "580g",
    inStock: true,
    leadTime: "Limited holiday stock",
  },
  {
    id: "prod-16",
    slug: "beginner-concrete-kit",
    name: "Beginner concrete kit",
    category: "Starter kits",
    price: "$32",
    priceValue: 32,
    swatch: "var(--tone-7)",
    image: "https://ik.imagekit.io/naazartstudio/IMG_0485.jpeg?updatedAt=1786823837217",
    description: "Everything you need to cast your first concrete trays at home! Includes pre-measured cement powder, reusable silicone oval mold, pigments, measuring cups, and sandpaper.",
    details: [
      "1 Premium reusable silicone oval tray mold",
      "1.5kg Fine-grain quick-cure cement mix (makes 4 trays)",
      "4 Liquid mineral pigments (Terracotta, Sage, Noir, Ochre)",
      "Protective gloves, sanding sponge, and studio finishing sealer",
    ],
    dimensions: 'Kit Box: 12" x 9" x 4"',
    weight: "2.2kg",
    inStock: true,
    leadTime: "In stock, ready to ship",
  },
  {
    id: "prod-17",
    slug: "advanced-marbling-kit",
    name: "Advanced marbling kit",
    category: "Starter kits",
    price: "$45",
    priceValue: 45,
    swatch: "var(--tone-8)",
    image: "https://ik.imagekit.io/naazartstudio/IMG_0485.jpeg?updatedAt=1786823837217",
    description: "Master the art of concrete marbling, color blending, and split casting with 3 advanced silicone molds, 8 high-potency pigments, and gold leaf accents.",
    details: [
      "3 Silicone molds: Oval Tray, Hex Coaster, Arch Vase",
      "2.5kg Ultra-fine white casting cement",
      "8 Master pigments + gold leaf sheets + gilding sizing",
      "Access to private 90-minute masterclass video library",
    ],
    dimensions: 'Kit Box: 14" x 10" x 5"',
    weight: "3.6kg",
    inStock: true,
    leadTime: "In stock, ready to ship",
  },
  {
    id: "prod-18",
    slug: "bulk-candle-jars-wholesale",
    name: "Bulk candle jars (set of 12)",
    category: "Wholesale jars",
    price: "Inquire",
    priceValue: 0,
    swatch: "var(--tone-9)",
    image: "https://ik.imagekit.io/naazartstudio/IMG_6856.jpeg?updatedAt=1786806284780",
    description: "Custom wholesale concrete candle vessels for candle makers and boutique brands. Available in custom Pantone color matches and custom debossed branding.",
    details: [
      "Set of 12 un-poured sealed concrete jars",
      "Custom colorways and marbling formulations available",
      "Volume discounts on orders over 50+ units",
      "Tested for thermal resistance with all wax types",
    ],
    dimensions: '3.25" Diameter x 3.5" H (approx 8oz / 240ml capacity)',
    weight: "4.2kg (pack)",
    inStock: true,
    leadTime: "Custom made, 7-10 business days",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getRelatedProducts(currentSlug: string, limit = 4): Product[] {
  const current = getProductBySlug(currentSlug);
  if (!current) return PRODUCTS.slice(0, limit);
  
  const sameCategory = PRODUCTS.filter(
    (p) => p.category === current.category && p.slug !== currentSlug
  );
  const others = PRODUCTS.filter(
    (p) => p.category !== current.category && p.slug !== currentSlug
  );
  
  return [...sameCategory, ...others].slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}
