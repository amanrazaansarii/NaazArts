"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Star,
  Inbox,
  Calendar,
  Tag,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import "./admin.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // If on admin login page, don't show the admin shell
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    const verifyAdmin = async () => {
      try {
        const res = await fetch("/api/admin/auth/me");
        if (!res.ok) {
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        if (data.authenticated && data.admin) {
          setAdminUser(data.admin);
        } else {
          router.push("/admin/login");
        }
      } catch (err) {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch {
      router.push("/admin/login");
    }
  };

  if (isLoginPage) {
    return <div className="admin-body">{children}</div>;
  }

  if (loading) {
    return (
      <div className="admin-body" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100dvh" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid var(--clay)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }}></div>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>Opening Naaz Arts Studio Console...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "Products & Variants",
      href: "/admin/products",
      icon: Package,
    },
    {
      label: "Orders & Tracking",
      href: "/admin/orders",
      icon: ShoppingBag,
    },
    {
      label: "Social Reviews",
      href: "/admin/reviews",
      icon: Star,
    },
    {
      label: "Customer Inquiries",
      href: "/admin/inquiries",
      icon: Inbox,
    },
    {
      label: "Workshops",
      href: "/admin/workshops",
      icon: Calendar,
    },
    {
      label: "Promo Codes",
      href: "/admin/promos",
      icon: Tag,
    },
  ];

  return (
    <div className="admin-body">
      <div className="admin-layout">
        {/* SIDEBAR BACKDROP ON MOBILE */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 35,
            }}
          />
        )}

        {/* SIDEBAR */}
        <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="admin-sidebar-header">
            <Link href="/admin" className="admin-brand" onClick={() => setSidebarOpen(false)}>
              <div className="admin-brand-logo">N</div>
              <div>
                <div className="admin-brand-title">Naaz Arts</div>
                <div className="admin-brand-badge">
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981", display: "inline-block" }}></span>
                  Studio Console
                </div>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="admin-btn-outline"
              style={{ display: "none", padding: "4px 8px" }}
            >
              <X size={18} />
            </button>
          </div>

          {/* NAVIGATION */}
          <nav className="admin-nav">
            {navItems.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              const IconComponent = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`admin-nav-item ${isActive ? "active" : ""}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="admin-nav-item-left">
                    <IconComponent size={18} />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* FOOTER */}
          <div className="admin-sidebar-footer">
            <Link
              href="/"
              target="_blank"
              className="admin-nav-item"
              style={{ background: "#FDFBF8", border: "1px solid rgba(43, 38, 34, 0.08)" }}
            >
              <div className="admin-nav-item-left">
                <ExternalLink size={16} />
                <span>View Live Store</span>
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--ink-faint)" }}>↗</span>
            </Link>

            <div className="admin-user-card">
              <div className="admin-user-avatar">
                {adminUser?.name ? adminUser.name.slice(0, 2).toUpperCase() : "NA"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {adminUser?.name || "Studio Director"}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--ink-faint)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {adminUser?.email || "admin@naazarts.com"}
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Sign out of admin console"
                style={{ background: "none", border: "none", color: "var(--ink-faint)", cursor: "pointer", padding: "4px" }}
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN BODY */}
        <main className="admin-main">
          {/* TOPBAR */}
          <header className="admin-topbar">
            <div className="admin-topbar-left">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="admin-btn-outline"
                style={{ padding: "8px 10px", borderRadius: "8px" }}
              >
                <Menu size={18} />
              </button>
              <div className="admin-topbar-title">
                {pathname === "/admin" && "Studio Analytics & Dashboard"}
                {pathname.startsWith("/admin/products") && "Products & Variant Catalog"}
                {pathname.startsWith("/admin/orders") && "Orders & 5-Stage Tracking"}
                {pathname.startsWith("/admin/reviews") && "Social Media Reviews Hub"}
                {pathname.startsWith("/admin/inquiries") && "Customer Queries & Submissions"}
                {pathname.startsWith("/admin/workshops") && "Workshop Masterclasses"}
                {pathname.startsWith("/admin/promos") && "Promotional Discounts"}
              </div>
            </div>

            <div className="admin-topbar-right">
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--ink-soft)" }}>
                <ShieldCheck size={16} color="#10B981" />
                <span style={{ fontWeight: 600 }}>Master Mode</span>
              </div>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <div className="admin-content">{children}</div>
        </main>
      </div>
    </div>
  );
}
