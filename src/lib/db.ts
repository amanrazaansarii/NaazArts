import Database from 'better-sqlite3';
import path from 'path';
import { PRODUCTS, Product } from '../data/products';

const dbPath = path.join(process.cwd(), 'naazarts.db');
const db = new Database(dbPath);

// Initialize Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    category_label TEXT NOT NULL,
    price REAL NOT NULL,
    b2b_bulk_price REAL,
    badge TEXT,
    short_desc TEXT NOT NULL,
    full_desc TEXT NOT NULL,
    dimensions TEXT NOT NULL,
    weight TEXT NOT NULL,
    finishes TEXT NOT NULL,
    b2b_suitable INTEGER NOT NULL,
    popular_for_candles INTEGER
  );

  CREATE TABLE IF NOT EXISTS b2b_inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    company_name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    product_type TEXT NOT NULL,
    estimated_quantity TEXT NOT NULL,
    customization_details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    items TEXT NOT NULL,
    subtotal REAL NOT NULL,
    shipping_cost REAL NOT NULL,
    total REAL NOT NULL,
    customer_notes TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed products if empty
const countStmt = db.prepare('SELECT COUNT(*) as count FROM products');
const rowCount = countStmt.get() as { count: number };

if (rowCount.count === 0) {
  const insertStmt = db.prepare(`
    INSERT INTO products (
      id, title, category, category_label, price, b2b_bulk_price, badge,
      short_desc, full_desc, dimensions, weight, finishes, b2b_suitable, popular_for_candles
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
  `);

  const insertMany = db.transaction((items: Product[]) => {
    for (const item of items) {
      insertStmt.run(
        item.id,
        item.title,
        item.category,
        item.categoryLabel,
        item.price,
        item.b2bBulkPrice || null,
        item.badge || null,
        item.shortDesc,
        item.fullDesc,
        item.dimensions,
        item.weight,
        JSON.stringify(item.finishes),
        item.b2bSuitable ? 1 : 0,
        item.popularForCandles ? 1 : 0
      );
    }
  });

  insertMany(PRODUCTS);
}

export function getDbProducts(category?: string, search?: string, b2bOnly?: boolean): Product[] {
  let query = 'SELECT * FROM products WHERE 1=1';
  const params: any[] = [];

  if (category && category !== 'all') {
    query += ' AND category = ?';
    params.push(category);
  }

  if (search) {
    query += ' AND (title LIKE ? OR short_desc LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  if (b2bOnly) {
    query += ' AND b2b_suitable = 1';
  }

  const rows = db.prepare(query).all(...params) as any[];

  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    category: r.category,
    categoryLabel: r.category_label,
    price: r.price,
    b2bBulkPrice: r.b2b_bulk_price ? r.b2b_bulk_price : undefined,
    badge: r.badge ? r.badge : undefined,
    shortDesc: r.short_desc,
    fullDesc: r.full_desc,
    dimensions: r.dimensions,
    weight: r.weight,
    finishes: JSON.parse(r.finishes),
    b2bSuitable: Boolean(r.b2b_suitable),
    popularForCandles: Boolean(r.popular_for_candles)
  }));
}

export function createB2BInquiry(data: {
  name: string;
  companyName?: string;
  email: string;
  phone?: string;
  productType: string;
  estimatedQuantity: string;
  customizationDetails?: string;
}) {
  const stmt = db.prepare(`
    INSERT INTO b2b_inquiries (name, company_name, email, phone, product_type, estimated_quantity, customization_details)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    data.name,
    data.companyName || '',
    data.email,
    data.phone || '',
    data.productType,
    data.estimatedQuantity,
    data.customizationDetails || ''
  );

  return { id: result.lastInsertRowid, ...data };
}

export default db;
