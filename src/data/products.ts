export interface Product {
  name: string;
  category: string;
  price: string;
  swatch: string;
  badge?: "new" | "limited";
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
  { name: "Marble tray — sage",           category: "Premium trays",      price: "$28",     swatch: "var(--tone-1)", badge: "new" },
  { name: "Marble tray — terracotta",     category: "Premium trays",      price: "$28",     swatch: "var(--tone-2)" },
  { name: "Pastel tray — blush",          category: "Premium trays",      price: "$26",     swatch: "var(--tone-3)" },
  { name: "Earthy tray — clay",           category: "Premium trays",      price: "$26",     swatch: "var(--tone-4)" },

  { name: "Raw tray — round, blank",      category: "Raw trays — DIY",    price: "$14",     swatch: "var(--tone-3)" },
  { name: "Raw tray — square, blank",     category: "Raw trays — DIY",    price: "$14",     swatch: "var(--tone-6)" },
  { name: "Raw tray + paint kit",         category: "Raw trays — DIY",    price: "$22",     swatch: "var(--tone-2)", badge: "new" },
  { name: "Raw figurine kit — kids",      category: "Raw trays — DIY",    price: "$18",     swatch: "var(--tone-8)" },

  { name: "Pastel vase",                  category: "Vases",              price: "$34",     swatch: "var(--tone-2)", badge: "new" },
  { name: "Marble-effect vase",           category: "Vases",              price: "$36",     swatch: "var(--tone-9)" },
  { name: "Hand-painted vase",            category: "Vases",              price: "$40",     swatch: "var(--tone-6)" },

  { name: "Earth-tone coaster set",       category: "Coasters",           price: "$16",     swatch: "var(--tone-5)" },
  { name: "Pastel coaster set",           category: "Coasters",           price: "$16",     swatch: "var(--tone-1)" },

  { name: "Concrete candle jar",          category: "Candles — seasonal", price: "$18",     swatch: "var(--tone-4)", badge: "limited" },
  { name: "Festive scented candle",       category: "Candles — seasonal", price: "$20",     swatch: "var(--tone-7)", badge: "limited" },

  { name: "Beginner concrete kit",        category: "Starter kits",       price: "$32",     swatch: "var(--tone-7)" },
  { name: "Advanced marbling kit",        category: "Starter kits",       price: "$45",     swatch: "var(--tone-8)" },

  { name: "Bulk candle jars (set of 12)", category: "Wholesale jars",     price: "Inquire", swatch: "var(--tone-9)" },
];
