"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Trash2,
  Edit,
  Image as ImageIcon,
  DollarSign,
  Palette,
  Check,
  X,
  Layers,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
const COLLECTION_OPTIONS = [
  "Premium jars & trays",
  "Hand-painted",
  "DIY Trays & kits",
  "Seasonal & Festive",
  "Minimalist Mineral",
  "Wholesale Vessels",
  "Custom...",
];

const PRODUCT_TYPE_OPTIONS = [
  "Premium Trays",
  "Raw Trays",
  "Vases",
  "Coasters",
  "Candles",
  "Jars",
  "Starter Kits",
  "Custom...",
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [collectionFilter, setCollectionFilter] = useState("All");
  const [productTypeFilter, setProductTypeFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("ALL");
  const [categories, setCategories] = useState<string[]>(["All"]);

  // Modal / Drawer state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [currentId, setCurrentId] = useState<string | null>(null);

  // Form fields
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryName, setCategoryName] = useState("Premium trays");
  const [collection, setCollection] = useState("Premium jars & trays");
  const [customCollection, setCustomCollection] = useState("");
  const [productType, setProductType] = useState("Premium Trays");
  const [customProductType, setCustomProductType] = useState("");
  const [description, setDescription] = useState("");
  const [leadTime, setLeadTime] = useState("Dispatched in 2-3 studio days");
  const [dimensions, setDimensions] = useState('8.25" L x 4.5" W x 0.75" H');
  const [weight, setWeight] = useState("420g");
  const [badge, setBadge] = useState<string>("");
  const [stockStatus, setStockStatus] = useState<"IN_STOCK" | "OUT_OF_STOCK" | "UNAVAILABLE">("IN_STOCK");
  const [productionStatus, setProductionStatus] = useState<"READY" | "CASTING" | "CURING" | "RESTOCKING">("READY");

  // Multi-image links manager
  const [images, setImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  // Multi-currency prices
  const [usdPrice, setUsdPrice] = useState<number>(28);
  const [inrPrice, setInrPrice] = useState<number>(2299);
  const [eurPrice, setEurPrice] = useState<number>(26);
  const [gbpPrice, setGbpPrice] = useState<number>(22);

  // Variants manager
  const [variants, setVariants] = useState<any[]>([]);
  const [newVariantName, setNewVariantName] = useState("");
  const [newVariantHex, setNewVariantHex] = useState("#A8B29A");
  const [newVariantStatus, setNewVariantStatus] = useState("IN_STOCK");
  const [newVariantPrice, setNewVariantPrice] = useState<number | null>(null);
  const [newVariantImage, setNewVariantImage] = useState("");
  const [editingVariantId, setEditingVariantId] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = `/api/admin/products?category=${categoryFilter}&stockStatus=${stockFilter}`;
      if (collectionFilter !== "All") url += `&collection=${encodeURIComponent(collectionFilter)}`;
      if (productTypeFilter !== "All") url += `&productType=${encodeURIComponent(productTypeFilter)}`;
      if (searchQuery) url += `&q=${encodeURIComponent(searchQuery)}`;
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        setProducts(json.products || []);

        // Extract unique categories
        const cats = Array.from(new Set(json.products.map((p: any) => p.categoryName))) as string[];
        setCategories(["All", ...cats]);
      }
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryFilter, collectionFilter, productTypeFilter, stockFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  const openCreateModal = () => {
    setModalMode("create");
    setCurrentId(null);
    setName("");
    setSlug("");
    setCategoryName("Premium trays");
    setCollection("Premium jars & trays");
    setCustomCollection("");
    setProductType("Premium Trays");
    setCustomProductType("");
    setDescription("");
    setLeadTime("Dispatched in 2-3 studio days");
    setDimensions('8.25" L x 4.5" W x 0.75" H');
    setWeight("420g");
    setBadge("");
    setStockStatus("IN_STOCK");
    setProductionStatus("READY");
    setImages(["https://ik.imagekit.io/naazartstudio/IMG_6856.jpeg?updatedAt=1786806284780"]);
    setNewImageUrl("");
    setUsdPrice(28);
    setInrPrice(2299);
    setEurPrice(26);
    setGbpPrice(22);
    setNewVariantName("");
    setNewVariantHex("#A8B29A");
    setNewVariantStatus("IN_STOCK");
    setNewVariantPrice(null);
    setNewVariantImage("");
    setEditingVariantId(null);
    setVariants([
      { id: "var-1", name: "Sage Mist", colorHex: "#A8B29A", swatchVar: "var(--tone-1)", stockStatus: "IN_STOCK", image: "https://ik.imagekit.io/naazartstudio/IMG_6856.jpeg?updatedAt=1786806284780" },
      { id: "var-2", name: "Terracotta Clay", colorHex: "#C1704E", swatchVar: "var(--tone-2)", stockStatus: "IN_STOCK", image: "https://ik.imagekit.io/naazartstudio/IMG_8148.png?updatedAt=1786806300638" },
    ]);
    setIsModalOpen(true);
    setMessage(null);
  };

  const openEditModal = (prod: any) => {
    setModalMode("edit");
    setCurrentId(prod.id);
    setName(prod.name);
    setSlug(prod.slug);
    setCategoryName(prod.categoryName);
    
    // Collection
    const existingCol = prod.collection || "Premium jars & trays";
    if (COLLECTION_OPTIONS.includes(existingCol)) {
      setCollection(existingCol);
      setCustomCollection("");
    } else {
      setCollection("Custom...");
      setCustomCollection(existingCol);
    }

    // Product Type
    const existingType = prod.productType || prod.categoryName || "Premium Trays";
    if (PRODUCT_TYPE_OPTIONS.includes(existingType)) {
      setProductType(existingType);
      setCustomProductType("");
    } else {
      setProductType("Custom...");
      setCustomProductType(existingType);
    }

    setDescription(prod.description);
    setLeadTime(prod.leadTime || "Dispatched in 2-3 studio days");
    setDimensions(prod.dimensions || "");
    setWeight(prod.weight || "");
    setBadge(prod.badge || "");
    setStockStatus(prod.stockStatus || (prod.inStock ? "IN_STOCK" : "OUT_OF_STOCK"));
    setProductionStatus(prod.productionStatus || "READY");
    setImages(prod.images && prod.images.length > 0 ? prod.images : prod.image ? [prod.image] : []);
    setNewImageUrl("");
    setNewVariantName("");
    setNewVariantHex("#A8B29A");
    setNewVariantStatus("IN_STOCK");
    setNewVariantPrice(null);
    setNewVariantImage("");
    setEditingVariantId(null);
    
    // Pricing
    const pPrices = prod.prices || {};
    setUsdPrice(pPrices.USD || prod.priceValue || 28);
    setInrPrice(pPrices.INR || Math.round(prod.priceValue * 82) || 2299);
    setEurPrice(pPrices.EUR || Math.round(prod.priceValue * 0.92) || 26);
    setGbpPrice(pPrices.GBP || Math.round(prod.priceValue * 0.79) || 22);

    // Variants with separate images
    setVariants(
      prod.variants && prod.variants.length > 0
        ? prod.variants
        : prod.colors
        ? prod.colors.map((c: any, i: number) => ({
            id: `var-${i}`,
            name: c.name,
            colorHex: c.hex,
            swatchVar: c.swatchVar,
            stockStatus: "IN_STOCK",
            image: c.image || prod.image || null,
          }))
        : []
    );
    setIsModalOpen(true);
    setMessage(null);
  };

  const handleAddImageLink = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (idx: number) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  const handleAddVariant = () => {
    if (!newVariantName.trim()) return;
    const newVar = {
      id: `var-${Date.now()}`,
      name: newVariantName.trim(),
      colorHex: newVariantHex || "#A8B29A",
      swatchVar: "var(--tone-1)",
      stockStatus: newVariantStatus,
      priceOverride: newVariantPrice ? Number(newVariantPrice) : null,
      image: newVariantImage.trim() || null,
      images: newVariantImage.trim() ? [newVariantImage.trim()] : [],
    };
    setVariants([...variants, newVar]);
    setNewVariantName("");
    setNewVariantHex("#A8B29A");
    setNewVariantPrice(null);
    setNewVariantImage("");
  };

  const handleRemoveVariant = (varId: string) => {
    setVariants(variants.filter((v) => v.id !== varId));
  };

  const handleVariantStockToggle = (varId: string, currentStock: string) => {
    const updatedStock = currentStock === "IN_STOCK" ? "OUT_OF_STOCK" : "IN_STOCK";
    setVariants(
      variants.map((v) => (v.id === varId ? { ...v, stockStatus: updatedStock } : v))
    );
  };

  const handleUpdateVariantImage = (varId: string, imgUrl: string) => {
    setVariants(
      variants.map((v) =>
        v.id === varId
          ? { ...v, image: imgUrl.trim() || null, images: imgUrl.trim() ? [imgUrl.trim()] : [] }
          : v
      )
    );
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const finalCollection = collection === "Custom..." ? customCollection.trim() : collection;
    const finalProductType = productType === "Custom..." ? customProductType.trim() : productType;

    const payload = {
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      categoryName,
      collection: finalCollection || "Premium jars & trays",
      productType: finalProductType || "Premium Trays",
      price: `$${usdPrice}`,
      priceValue: Number(usdPrice),
      prices: {
        USD: Number(usdPrice),
        INR: Number(inrPrice),
        EUR: Number(eurPrice),
        GBP: Number(gbpPrice),
      },
      image: images.length > 0 ? images[0] : null,
      images,
      description,
      leadTime,
      dimensions,
      weight,
      badge: badge || null,
      stockStatus,
      inStock: stockStatus === "IN_STOCK",
      productionStatus,
      variants,
    };
      price: `$${usdPrice}`,
      priceValue: Number(usdPrice),
      prices: {
        USD: Number(usdPrice),
        INR: Number(inrPrice),
        EUR: Number(eurPrice),
        GBP: Number(gbpPrice),
      },
      image: images.length > 0 ? images[0] : null,
      images,
      description,
      leadTime,
      dimensions,
      weight,
      badge: badge || null,
      stockStatus,
      inStock: stockStatus === "IN_STOCK",
      productionStatus,
      variants,
    };

    try {
      const url = modalMode === "create" ? "/api/admin/products" : `/api/admin/products/${currentId}`;
      const method = modalMode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save product");
      }

      setMessage({ text: "Product saved successfully! Catalog updated.", type: "success" });
      setTimeout(() => {
        setIsModalOpen(false);
        fetchProducts();
      }, 1000);
    } catch (err: any) {
      setMessage({ text: err.message || "An error occurred while saving", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}" from the catalog?`)) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchProducts();
      } else {
        alert("Could not delete product.");
      }
    } catch {
      alert("Could not delete product.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* ACTION BAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          background: "#FFFFFF",
          padding: "16px 20px",
          borderRadius: "14px",
          border: "1px solid rgba(43,38,34,0.08)",
        }}
      >
        {/* SEARCH FORM */}
        <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: "260px" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: "340px" }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--ink-faint)" }} />
            <input
              type="text"
              placeholder="Search by title or description..."
              className="form-input"
              style={{ paddingLeft: "36px", paddingRight: "12px", fontSize: "0.88rem" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="admin-btn admin-btn-secondary" style={{ padding: "8px 14px" }}>
            Search
          </button>
        </form>

        {/* FILTERS & ADD BUTTON */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          {/* COLLECTION FILTER */}
          <select
            className="form-select"
            style={{ width: "auto", fontSize: "0.82rem", padding: "8px 10px" }}
            value={collectionFilter}
            onChange={(e) => setCollectionFilter(e.target.value)}
          >
            <option value="All">All Collections</option>
            {COLLECTION_OPTIONS.filter((c) => c !== "Custom...").map((col) => (
              <option key={col} value={col}>
                Collection: {col}
              </option>
            ))}
          </select>

          {/* PRODUCT TYPE FILTER */}
          <select
            className="form-select"
            style={{ width: "auto", fontSize: "0.82rem", padding: "8px 10px" }}
            value={productTypeFilter}
            onChange={(e) => setProductTypeFilter(e.target.value)}
          >
            <option value="All">All Product Types</option>
            {PRODUCT_TYPE_OPTIONS.filter((t) => t !== "Custom...").map((t) => (
              <option key={t} value={t}>
                Type: {t}
              </option>
            ))}
          </select>

          {/* CATEGORY FILTER */}
          <select
            className="form-select"
            style={{ width: "auto", fontSize: "0.82rem", padding: "8px 10px" }}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                Category: {cat}
              </option>
            ))}
          </select>

          {/* STOCK FILTER */}
          <select
            className="form-select"
            style={{ width: "auto", fontSize: "0.82rem", padding: "8px 10px" }}
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
          >
            <option value="ALL">All Stock Statuses</option>
            <option value="IN_STOCK">In Stock</option>
            <option value="OUT_OF_STOCK">Out of Stock</option>
            <option value="UNAVAILABLE">Unavailable</option>
          </select>

          {/* ADD BUTTON */}
          <button onClick={openCreateModal} className="admin-btn admin-btn-primary" style={{ whiteSpace: "nowrap" }}>
            <Plus size={16} />
            <span>Add Piece</span>
          </button>
        </div>
      </div>

      {/* PRODUCTS TABLE */}
      <div className="admin-card" style={{ padding: "0", overflow: "hidden" }}>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Piece & Images</th>
                <th>Category</th>
                <th>Pricing (Multi-Currency)</th>
                <th>Stock Status</th>
                <th>Production Status</th>
                <th>Variants</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "40px 0", color: "var(--ink-faint)" }}>
                    Loading studio catalog...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "40px 0", color: "var(--ink-faint)" }}>
                    No handcrafted pieces match the filter criteria.
                  </td>
                </tr>
              ) : (
                products.map((prod) => (
                  <tr key={prod.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        {prod.image ? (
                          <img
                            src={prod.image}
                            alt={prod.name}
                            style={{ width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover", border: "1px solid rgba(43,38,34,0.08)" }}
                          />
                        ) : (
                          <div style={{ width: "48px", height: "48px", borderRadius: "8px", background: "var(--tone-1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <ImageIcon size={18} color="var(--ink-soft)" />
                          </div>
                        )}
                        <div>
                          <div style={{ fontWeight: 600, fontSize: "0.92rem" }}>{prod.name}</div>
                          <div style={{ fontSize: "0.75rem", color: "var(--ink-faint)", display: "flex", gap: "6px", alignItems: "center" }}>
                            <span>{prod.slug}</span>
                            {prod.images && prod.images.length > 1 && (
                              <span style={{ background: "#F4EFEB", padding: "1px 5px", borderRadius: "4px" }}>
                                {prod.images.length} images
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                        <span style={{ fontSize: "0.86rem", fontWeight: 600, color: "var(--ink)" }}>
                          {prod.productType || prod.categoryName}
                        </span>
                        <span style={{ fontSize: "0.72rem", color: "var(--clay-deep)", background: "var(--clay-tint)", padding: "1px 6px", borderRadius: "4px", width: "fit-content" }}>
                          {prod.collection || "Premium jars & trays"}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div>
                        <div style={{ fontWeight: 700 }}>${prod.prices?.USD || prod.priceValue}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--ink-faint)" }}>
                          ₹{prod.prices?.INR || Math.round(prod.priceValue * 82)} · €{prod.prices?.EUR || Math.round(prod.priceValue * 0.92)}
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className={`status-pill status-${(prod.stockStatus || 'IN_STOCK').toLowerCase().replace(/_/g, '-')}`}>
                        {prod.stockStatus === 'IN_STOCK' ? 'In Stock' : prod.stockStatus === 'OUT_OF_STOCK' ? 'Out of Stock' : 'Unavailable'}
                      </span>
                    </td>

                    <td>
                      <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--clay)" }}>
                        {prod.productionStatus || "READY"}
                      </span>
                    </td>

                    <td>
                      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", maxWidth: "160px" }}>
                        {prod.variants && prod.variants.length > 0 ? (
                          prod.variants.map((v: any, i: number) => (
                            <span
                              key={i}
                              title={`${v.name} (${v.stockStatus})`}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                padding: "2px 6px",
                                borderRadius: "4px",
                                background: "#FCFAF7",
                                border: "1px solid rgba(43,38,34,0.1)",
                                fontSize: "0.72rem",
                              }}
                            >
                              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: v.colorHex || "#C1704E" }}></span>
                              {v.name}
                            </span>
                          ))
                        ) : (
                          <span style={{ fontSize: "0.75rem", color: "var(--ink-faint)" }}>Single Variant</span>
                        )}
                      </div>
                    </td>

                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "6px" }}>
                        <Link
                          href={`/shop/${prod.slug}`}
                          target="_blank"
                          title="Preview on live store"
                          className="admin-btn-outline"
                          style={{ padding: "6px 8px", borderRadius: "6px" }}
                        >
                          <ExternalLink size={14} />
                        </Link>
                        <button
                          onClick={() => openEditModal(prod)}
                          title="Edit product, images & variants"
                          className="admin-btn-secondary"
                          style={{ padding: "6px 8px", borderRadius: "6px" }}
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id, prod.name)}
                          title="Delete from studio catalog"
                          className="admin-btn-danger"
                          style={{ padding: "6px 8px", borderRadius: "6px" }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT / CREATE PRODUCT MODAL */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box" style={{ maxWidth: "800px" }}>
            <div className="admin-modal-header">
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem" }}>
                  {modalMode === "create" ? "Add New Handcrafted Piece" : `Edit: ${name}`}
                </h2>
                <p style={{ fontSize: "0.8rem", color: "var(--ink-soft)" }}>
                  Configure product details, image carousel URLs, multi-currency prices, and separate variants.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct}>
              <div className="admin-modal-body">
                {message && (
                  <div
                    style={{
                      padding: "10px 14px",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      background: message.type === "success" ? "var(--sage-tint)" : "var(--clay-tint)",
                      color: message.type === "success" ? "var(--sage-deep)" : "var(--clay-deep)",
                      border: `1px solid ${message.type === "success" ? "var(--sage)" : "var(--clay)"}`,
                    }}
                  >
                    {message.text}
                  </div>
                )}

                {/* BASIC INFO */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div className="form-group">
                    <label className="form-label">Product Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Marble tray — sage"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">URL Slug *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. marble-tray-sage"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* COLLECTION & PRODUCT TYPE CURATION */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", background: "#FCFAF7", padding: "16px", borderRadius: "12px", border: "1px solid rgba(43,38,34,0.08)" }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span>Collection *</span>
                      <span style={{ fontSize: "0.72rem", color: "var(--ink-faint)" }}>Curated Drop</span>
                    </label>
                    <select
                      className="form-select"
                      value={collection}
                      onChange={(e) => setCollection(e.target.value)}
                    >
                      {COLLECTION_OPTIONS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    {collection === "Custom..." && (
                      <input
                        type="text"
                        placeholder="Enter custom collection (e.g. Festive Drops)..."
                        className="form-input"
                        style={{ marginTop: "6px", fontSize: "0.82rem" }}
                        value={customCollection}
                        onChange={(e) => setCustomCollection(e.target.value)}
                        required
                      />
                    )}
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span>Product Type *</span>
                      <span style={{ fontSize: "0.72rem", color: "var(--ink-faint)" }}>Form &amp; Function</span>
                    </label>
                    <select
                      className="form-select"
                      value={productType}
                      onChange={(e) => setProductType(e.target.value)}
                    >
                      {PRODUCT_TYPE_OPTIONS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {productType === "Custom..." && (
                      <input
                        type="text"
                        placeholder="Enter custom type (e.g. Incense Burner)..."
                        className="form-input"
                        style={{ marginTop: "6px", fontSize: "0.82rem" }}
                        value={customProductType}
                        onChange={(e) => setCustomProductType(e.target.value)}
                        required
                      />
                    )}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
                  <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select
                      className="form-select"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    >
                      <option>Premium trays</option>
                      <option>Raw trays — DIY</option>
                      <option>Vases</option>
                      <option>Coasters</option>
                      <option>Candles — seasonal</option>
                      <option>Starter kits</option>
                      <option>Wholesale jars</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Stock Status</label>
                    <select
                      className="form-select"
                      value={stockStatus}
                      onChange={(e: any) => setStockStatus(e.target.value)}
                    >
                      <option value="IN_STOCK">In Stock (Available)</option>
                      <option value="OUT_OF_STOCK">Out of Stock (Backorder)</option>
                      <option value="UNAVAILABLE">Unavailable (Archived)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Production / Tracking Status</label>
                    <select
                      className="form-select"
                      value={productionStatus}
                      onChange={(e: any) => setProductionStatus(e.target.value)}
                    >
                      <option value="READY">Ready to Ship</option>
                      <option value="CASTING">In Mold Casting</option>
                      <option value="CURING">48h Curing Stage</option>
                      <option value="RESTOCKING">Restocking Batch</option>
                    </select>
                  </div>
                </div>

                {/* MULTI-IMAGE SLIDE MANAGER */}
                <div style={{ background: "#FCFAF7", padding: "16px", borderRadius: "12px", border: "1px solid rgba(43,38,34,0.08)" }}>
                  <label className="form-label" style={{ marginBottom: "8px", display: "block" }}>
                    Image Slides & Gallery (Add / Remove by Image Link)
                  </label>
                  
                  {/* EXISTING IMAGES CAROUSEL PREVIEW */}
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "12px" }}>
                    {images.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        style={{
                          position: "relative",
                          width: "90px",
                          height: "90px",
                          borderRadius: "8px",
                          overflow: "hidden",
                          border: idx === 0 ? "2px solid var(--clay)" : "1px solid rgba(43,38,34,0.1)",
                        }}
                      >
                        <img src={imgUrl} alt={`Slide ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        {idx === 0 && (
                          <span style={{ position: "absolute", bottom: "2px", left: "2px", background: "var(--clay)", color: "#FFF", fontSize: "0.6rem", padding: "1px 4px", borderRadius: "3px", fontWeight: 700 }}>
                            Cover
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          style={{
                            position: "absolute",
                            top: "2px",
                            right: "2px",
                            background: "rgba(0,0,0,0.6)",
                            color: "#FFF",
                            border: "none",
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* ADD NEW IMAGE LINK INPUT */}
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="url"
                      placeholder="Paste image link URL (e.g. https://ik.imagekit.io/... or CDN link)"
                      className="form-input"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={handleAddImageLink}
                      className="admin-btn admin-btn-secondary"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      <Plus size={14} /> Add Image Link
                    </button>
                  </div>
                </div>

                {/* MULTI-CURRENCY PRICING SECTION */}
                <div style={{ background: "#FCFAF7", padding: "16px", borderRadius: "12px", border: "1px solid rgba(43,38,34,0.08)" }}>
                  <label className="form-label" style={{ marginBottom: "8px", display: "block" }}>
                    Separate Currency Pricing
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px" }}>
                    <div className="form-group">
                      <label style={{ fontSize: "0.75rem", color: "var(--ink-soft)" }}>USD Price ($) *</label>
                      <input
                        type="number"
                        className="form-input"
                        value={usdPrice}
                        onChange={(e) => setUsdPrice(Number(e.target.value))}
                        required
                        min={0}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: "0.75rem", color: "var(--ink-soft)" }}>INR Price (₹) *</label>
                      <input
                        type="number"
                        className="form-input"
                        value={inrPrice}
                        onChange={(e) => setInrPrice(Number(e.target.value))}
                        required
                        min={0}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: "0.75rem", color: "var(--ink-soft)" }}>EUR Price (€)</label>
                      <input
                        type="number"
                        className="form-input"
                        value={eurPrice}
                        onChange={(e) => setEurPrice(Number(e.target.value))}
                        min={0}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: "0.75rem", color: "var(--ink-soft)" }}>GBP Price (£)</label>
                      <input
                        type="number"
                        className="form-input"
                        value={gbpPrice}
                        onChange={(e) => setGbpPrice(Number(e.target.value))}
                        min={0}
                      />
                    </div>
                  </div>
                </div>

                {/* SEPARATE VARIANTS & VARIANT IMAGES MANAGER */}
                <div style={{ background: "#FCFAF7", padding: "18px", borderRadius: "14px", border: "1px solid rgba(43,38,34,0.1)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                    <div>
                      <label className="form-label" style={{ marginBottom: "2px", display: "flex", alignItems: "center", gap: "6px" }}>
                        <span>Separate Product Variants &amp; Variant Images</span>
                        <span style={{ fontSize: "0.72rem", background: "var(--clay-tint)", color: "var(--clay-deep)", padding: "2px 6px", borderRadius: "4px", fontWeight: 700 }}>
                          Catalog Separated
                        </span>
                      </label>
                      <p style={{ fontSize: "0.78rem", color: "var(--ink-soft)", margin: 0 }}>
                        Every variant can have its own dedicated image. In the store catalog, each variant is shown as a separate piece, linking to this product&apos;s options.
                      </p>
                    </div>
                  </div>

                  {/* LIST OF CURRENT VARIANTS */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                    {variants.map((v) => (
                      <div
                        key={v.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          background: "#FFFFFF",
                          border: "1px solid rgba(43,38,34,0.08)",
                          boxShadow: "0 2px 6px rgba(43,38,34,0.02)",
                          gap: "12px",
                          flexWrap: "wrap",
                        }}
                      >
                        {/* Variant Thumbnail + Details */}
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: "1 1 240px" }}>
                          <div
                            style={{
                              width: "46px",
                              height: "46px",
                              borderRadius: "8px",
                              overflow: "hidden",
                              background: v.colorHex || "var(--tone-1)",
                              border: "1px solid rgba(0,0,0,0.1)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            {v.image ? (
                              <img
                                src={v.image}
                                alt={v.name}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              />
                            ) : (
                              <ImageIcon size={18} color="#FFFFFF" />
                            )}
                          </div>

                          <div style={{ minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <span
                                style={{
                                  width: "12px",
                                  height: "12px",
                                  borderRadius: "50%",
                                  background: v.colorHex || "#A8B29A",
                                  border: "1px solid rgba(0,0,0,0.15)",
                                  flexShrink: 0,
                                }}
                              />
                              <span style={{ fontWeight: 600, fontSize: "0.9rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {v.name}
                              </span>
                            </div>
                            <div style={{ fontSize: "0.74rem", color: "var(--ink-faint)", marginTop: "2px" }}>
                              {v.priceOverride ? `Custom Price: $${v.priceOverride}` : `Standard $${usdPrice}`} • {v.colorHex || "No hex"}
                            </div>
                          </div>
                        </div>

                        {/* Inline Image URL Input */}
                        <div style={{ flex: "1 1 260px", display: "flex", alignItems: "center", gap: "6px" }}>
                          <input
                            type="url"
                            placeholder="Variant Image URL (https://...)"
                            className="form-input"
                            style={{ fontSize: "0.78rem", padding: "6px 8px", height: "34px" }}
                            value={v.image || ""}
                            onChange={(e) => handleUpdateVariantImage(v.id, e.target.value)}
                          />
                        </div>

                        {/* Actions: Stock Toggle & Delete */}
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                          <button
                            type="button"
                            onClick={() => handleVariantStockToggle(v.id, v.stockStatus)}
                            className={`status-pill ${v.stockStatus === 'IN_STOCK' ? 'status-in-stock' : 'status-out-of-stock'}`}
                            style={{ cursor: "pointer", border: "none", fontSize: "0.72rem", padding: "4px 8px" }}
                            title="Click to toggle stock status"
                          >
                            {v.stockStatus === 'IN_STOCK' ? 'In Stock' : 'Out of Stock'}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveVariant(v.id)}
                            style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", padding: "6px" }}
                            title="Remove variant"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ADD NEW VARIANT FORM */}
                  <div style={{ background: "#FFFFFF", padding: "14px", borderRadius: "10px", border: "1px dashed rgba(43,38,34,0.18)" }}>
                    <div style={{ fontSize: "0.82rem", fontWeight: 700, marginBottom: "10px", color: "var(--ink)" }}>
                      + Add New Variant with Separate Image
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label style={{ fontSize: "0.75rem", color: "var(--ink-soft)" }}>Variant Tone / Name *</label>
                        <input
                          type="text"
                          placeholder="e.g. Terracotta Clay / Charcoal"
                          className="form-input"
                          value={newVariantName}
                          onChange={(e) => setNewVariantName(e.target.value)}
                        />
                      </div>

                      <div className="form-group" style={{ margin: 0 }}>
                        <label style={{ fontSize: "0.75rem", color: "var(--ink-soft)" }}>Color Hex</label>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          <input
                            type="color"
                            value={newVariantHex}
                            onChange={(e) => setNewVariantHex(e.target.value)}
                            style={{ width: "32px", height: "38px", padding: 0, border: "none", borderRadius: "6px", cursor: "pointer", background: "none" }}
                          />
                          <input
                            type="text"
                            placeholder="#C1704E"
                            className="form-input"
                            style={{ fontSize: "0.8rem", padding: "6px 8px" }}
                            value={newVariantHex}
                            onChange={(e) => setNewVariantHex(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-group" style={{ margin: 0 }}>
                        <label style={{ fontSize: "0.75rem", color: "var(--ink-soft)" }}>Price Override ($)</label>
                        <input
                          type="number"
                          placeholder={`$${usdPrice}`}
                          className="form-input"
                          value={newVariantPrice ?? ""}
                          onChange={(e) => setNewVariantPrice(e.target.value ? Number(e.target.value) : null)}
                          min={0}
                        />
                      </div>

                      <div className="form-group" style={{ margin: 0 }}>
                        <label style={{ fontSize: "0.75rem", color: "var(--ink-soft)" }}>Stock Status</label>
                        <select
                          className="form-select"
                          value={newVariantStatus}
                          onChange={(e) => setNewVariantStatus(e.target.value)}
                        >
                          <option value="IN_STOCK">In Stock</option>
                          <option value="OUT_OF_STOCK">Out of Stock</option>
                        </select>
                      </div>
                    </div>

                    {/* Variant Image URL input */}
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <div style={{ flex: 1 }}>
                        <input
                          type="url"
                          placeholder="Variant Image URL (e.g. https://ik.imagekit.io/.../terracotta.jpg)"
                          className="form-input"
                          value={newVariantImage}
                          onChange={(e) => setNewVariantImage(e.target.value)}
                        />
                      </div>

                      {newVariantImage.trim() && (
                        <div
                          style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "6px",
                            overflow: "hidden",
                            border: "1px solid rgba(0,0,0,0.1)",
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={newVariantImage.trim()}
                            alt="Preview"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => (e.currentTarget.style.display = "none")}
                          />
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handleAddVariant}
                        disabled={!newVariantName.trim()}
                        className="admin-btn admin-btn-secondary"
                        style={{ height: "40px", padding: "0 16px", whiteSpace: "nowrap" }}
                      >
                        <Plus size={14} /> Add Variant
                      </button>
                    </div>
                  </div>
                </div>

                {/* DESCRIPTION & SPECIFICATIONS */}
                <div className="form-group">
                  <label className="form-label">Artisan Description *</label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    placeholder="Hand-poured concrete piece..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                  <div className="form-group">
                    <label className="form-label">Lead Time</label>
                    <input
                      type="text"
                      className="form-input"
                      value={leadTime}
                      onChange={(e) => setLeadTime(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Dimensions</label>
                    <input
                      type="text"
                      className="form-input"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Weight</label>
                    <input
                      type="text"
                      className="form-input"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="admin-btn admin-btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="admin-btn admin-btn-primary"
                >
                  {saving ? "Saving Changes..." : modalMode === "create" ? "Create Product" : "Update Product & Variants"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
