"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  Search,
  Globe,
  ShoppingBag,
  User as UserIcon,
  ChevronRight,
  ArrowRight,
  Check,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { searchProducts, Product } from "@/data/products";

const LANGUAGES = [
  { code: "EN", name: "English", flag: "US" },
  { code: "FR", name: "Français", flag: "FR" },
  { code: "DE", name: "Deutsch", flag: "DE" },
  { code: "HI", name: "हिन्दी", flag: "IN" },
  { code: "ES", name: "Español", flag: "ES" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Search state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Language state
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const languageRef = useRef<HTMLDivElement>(null);

  // Stores
  const totalCartItems = useCartStore((state) => state.getTotalItems());
  const { isAuthenticated, user } = useAuthStore();

  // Handle outside click for search & language
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
        setSearchQuery("");
      }
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target as Node)
      ) {
        setLanguageOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when expanded
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Handle escape key to close drawer or search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        setSearchOpen(false);
        setLanguageOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Live search query handling
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim().length > 0) {
      setSearchResults(searchProducts(val).slice(0, 5));
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { href: "/shop", label: "Shop All Collection" },
    { href: "/workshops", label: "Workshops & Classes" },
    { href: "/our-story", label: "Our Story & Craft" },
    { href: "/track", label: "Track Your Order" },
    { href: "/contact", label: "Custom Inquiries & Studio" },
  ];

  return (
    <>
      <nav className="nav">
        {/* Left Side: Burger Menu + Brand Logo right next to it */}
        <div className="nav-left-group">
          <button
            className="nav-icon-btn nav-burger-btn"
            aria-label="Open Navigation Menu"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu size={22} strokeWidth={1.75} />
          </button>

          <Link href="/" className="nav-logo" onClick={() => setDrawerOpen(false)}>
            Naaz Arts
          </Link>
        </div>

        {/* Right Side Icons: Search > Language > Cart > My Profile */}
        <div className="nav-right-cluster">
          {/* 1. Search Expander */}
          <div
            ref={searchContainerRef}
            className={`nav-search-wrapper ${searchOpen ? "is-expanded" : ""}`}
          >
            {!searchOpen ? (
              <button
                className="nav-icon-btn"
                aria-label="Search Collection"
                onClick={() => setSearchOpen(true)}
              >
                <Search size={20} strokeWidth={1.75} />
              </button>
            ) : (
              <form onSubmit={handleSearchSubmit} className="nav-search-form">
                <Search size={17} strokeWidth={2} className="nav-search-icon" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search trays, vases, kits..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="nav-search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="nav-search-clear"
                    onClick={() => {
                      setSearchQuery("");
                      setSearchResults([]);
                    }}
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
                <button
                  type="button"
                  className="nav-search-close"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X size={16} />
                </button>

                {/* Instant Search Dropdown */}
                {searchQuery.trim().length > 0 && (
                  <div className="nav-search-dropdown">
                    <div className="search-dropdown-header">
                      <span>Products ({searchResults.length})</span>
                      <span className="search-dropdown-hint">Press Enter to view all</span>
                    </div>

                    {searchResults.length > 0 ? (
                      <div className="search-dropdown-list">
                        {searchResults.map((prod) => (
                          <Link
                            key={prod.slug}
                            href={`/shop/${prod.slug}`}
                            className="search-dropdown-item"
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchQuery("");
                            }}
                          >
                            <div
                              className="search-item-thumb"
                              style={{ background: prod.swatch }}
                            >
                              {prod.image && (
                                <img
                                  src={prod.image}
                                  alt={prod.name}
                                  className="search-item-img"
                                />
                              )}
                            </div>
                            <div className="search-item-info">
                              <div className="search-item-title">{prod.name}</div>
                              <div className="search-item-meta">
                                <span>{prod.category}</span>
                                <span className="search-item-price">{prod.price}</span>
                              </div>
                            </div>
                            <ChevronRight size={14} className="search-item-arrow" />
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="search-dropdown-empty">
                        No pieces found for &ldquo;{searchQuery}&rdquo;
                      </div>
                    )}
                  </div>
                )}
              </form>
            )}
          </div>

          {/* 2. Language Selector */}
          <div ref={languageRef} className="nav-lang-wrapper">
            <button
              className="nav-icon-btn nav-lang-btn"
              aria-label="Select Language"
              onClick={() => setLanguageOpen((prev) => !prev)}
            >
              <Globe size={20} strokeWidth={1.75} />
              <span className="nav-lang-tag">{currentLang}</span>
            </button>

            {languageOpen && (
              <div className="nav-lang-dropdown">
                <div className="lang-dropdown-title">Select Language</div>
                <div className="lang-dropdown-list">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      className={`lang-option ${currentLang === lang.code ? "active" : ""}`}
                      onClick={() => {
                        setCurrentLang(lang.code);
                        setLanguageOpen(false);
                      }}
                    >
                      <span className="lang-code">{lang.code}</span>
                      <span className="lang-name">{lang.name}</span>
                      {currentLang === lang.code && <Check size={14} className="lang-check" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. Cart Icon with live badge */}
          <Link href="/cart" className="nav-icon-btn nav-cart-btn" aria-label="Shopping Cart">
            <ShoppingBag size={20} strokeWidth={1.75} />
            {totalCartItems > 0 && (
              <span className="nav-cart-badge">{totalCartItems}</span>
            )}
          </Link>

          {/* 4. My Profile / Account Icon */}
          <Link
            href={isAuthenticated ? "/profile" : "/login"}
            className="nav-icon-btn nav-profile-btn"
            aria-label={isAuthenticated ? "My Profile" : "Sign In"}
            title={isAuthenticated ? `Profile (${user?.name || "Account"})` : "Sign In"}
          >
            {isAuthenticated ? (
              <span className="nav-avatar-pill">
                {user?.avatarText || "NA"}
              </span>
            ) : (
              <UserIcon size={20} strokeWidth={1.75} />
            )}
          </Link>
        </div>
      </nav>

      {/* Slide-In Navigation Drawer (From Left) */}
      <div
        className={`drawer-backdrop ${drawerOpen ? "is-visible" : ""}`}
        onClick={() => setDrawerOpen(false)}
      />

      <aside className={`nav-drawer ${drawerOpen ? "is-open" : ""}`}>
        <div className="nav-drawer-header">
          <div className="drawer-logo-wrap">
            <span className="eyebrow" style={{ marginBottom: 0 }}>Artisan Studio</span>
            <div className="drawer-logo">Naaz Arts</div>
          </div>
          <button
            className="nav-icon-btn drawer-close-btn"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
          >
            <X size={22} strokeWidth={1.75} />
          </button>
        </div>

        <div className="nav-drawer-content">
          <div className="drawer-links-group">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`drawer-link ${isActive ? "active" : ""}`}
                  onClick={() => setDrawerOpen(false)}
                >
                  <div className="drawer-link-text">
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight size={16} className="drawer-arrow" />
                </Link>
              );
            })}
          </div>

          {/* Secondary Quick Action Bar in Drawer */}
          <div className="drawer-account-card">
            {isAuthenticated ? (
              <div className="drawer-user-info">
                <div className="drawer-user-avatar">{user?.avatarText || "NA"}</div>
                <div>
                  <div className="drawer-user-name">{user?.name}</div>
                  <div className="drawer-user-email">{user?.email}</div>
                </div>
                <Link
                  href="/profile"
                  className="btn btn-outline drawer-profile-cta"
                  onClick={() => setDrawerOpen(false)}
                >
                  My Profile
                </Link>
              </div>
            ) : (
              <div className="drawer-guest-cta">
                <div>
                  <div className="drawer-cta-title">Join Studio Patron Club</div>
                </div>
                <Link
                  href="/login"
                  className="btn btn-clay"
                  style={{ padding: "8px 18px", fontSize: "0.8rem", whiteSpace: "nowrap", flexShrink: 0 }}
                  onClick={() => setDrawerOpen(false)}
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>

          <div className="drawer-footer-block">
            <div className="drawer-studio-quote">
              &ldquo;Functional art for everyday spaces — cast by hand, cured with patience.&rdquo;
            </div>
            <div className="drawer-meta-row">
              <a
                href="https://instagram.com/shop.naazarts"
                target="_blank"
                rel="noopener noreferrer"
                className="drawer-social-link"
              >
                Instagram ↗
              </a>
              <Link href="/contact" className="drawer-social-link" onClick={() => setDrawerOpen(false)}>
                Wholesale & Custom
              </Link>
              <Link href="/track" className="drawer-social-link" onClick={() => setDrawerOpen(false)}>
                Track Order
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
