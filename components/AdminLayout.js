import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AdminLayout({ children }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { label: "Dashboard", icon: "📊", path: "/admin" },
    { label: "Products", icon: "📦", path: "/admin/products" },
    { label: "Add Product", icon: "➕", path: "/admin/add-product" },
    { label: "Orders", icon: "🛒", path: "/admin/orders" },
    { label: "Customers", icon: "👥", path: "/admin/customers" },
  ];

  const currentPath = router.pathname;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0a0a0a",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: sidebarOpen ? "240px" : "70px",
          background: "#111111",
          borderRight: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.3s ease",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "24px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "6px",
              color: "#fff",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
              fontSize: "14px",
            }}
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
          <span
            style={{
              fontSize: "20px",
              fontWeight: "800",
              background: "linear-gradient(135deg, #f97316, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              whiteSpace: "nowrap",
              opacity: sidebarOpen ? 1 : 0,
              transition: "opacity 0.2s",
            }}
          >
            ShopElite
          </span>
        </div>

        {/* Nav */}
        <nav
          style={{
            flex: 1,
            padding: "16px 12px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <div
                key={item.path}
                onClick={() => router.push(item.path)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(236,72,153,0.15))"
                    : "transparent",
                  border: isActive
                    ? "1px solid rgba(249,115,22,0.3)"
                    : "1px solid transparent",
                  color: isActive ? "#f97316" : "#888",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.color = "#fff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#888";
                  }
                }}
              >
                <span style={{ fontSize: "18px", flexShrink: 0 }}>
                  {item.icon}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    opacity: sidebarOpen ? 1 : 0,
                    transition: "opacity 0.2s",
                  }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </nav>

        {/* Bottom */}
        <div
          style={{
            padding: "16px 12px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #f97316, #ec4899)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "700",
                color: "#fff",
                flexShrink: 0,
              }}
            >
              {session?.user?.name?.charAt(0) || "A"}
            </div>
            <div
              style={{
                opacity: sidebarOpen ? 1 : 0,
                transition: "opacity 0.2s",
                overflow: "hidden",
              }}
            >
              <p
                style={{
                  color: "#ccc",
                  fontSize: "13px",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                }}
              >
                {session?.user?.name || "Admin"}
              </p>
              <p
                style={{
                  color: "#666",
                  fontSize: "11px",
                  whiteSpace: "nowrap",
                }}
              >
                {session?.user?.email || ""}
              </p>
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px",
              borderRadius: "8px",
              cursor: "pointer",
              color: "#ef4444",
              background: "rgba(239,68,68,0.05)",
              border: "1px solid rgba(239,68,68,0.1)",
              width: "100%",
              fontSize: "14px",
              fontWeight: "500",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239,68,68,0.15)";
              e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(239,68,68,0.05)";
              e.currentTarget.style.borderColor = "rgba(239,68,68,0.1)";
            }}
          >
            <span style={{ fontSize: "18px", flexShrink: 0 }}>🚪</span>
            <span
              style={{
                opacity: sidebarOpen ? 1 : 0,
                transition: "opacity 0.2s",
              }}
            >
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        {/* Topbar */}
        <div
          style={{
            padding: "20px 32px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#111111",
          }}
        >
          <div style={{ color: "#fff", fontSize: "22px", fontWeight: "700" }}>
            {navItems.find((i) => i.path === currentPath)?.label || "Admin"}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={() => router.push("/")}
              style={{
                padding: "8px 16px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "#888",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              🛍️ View Store
            </button>
            <div style={{ color: "#888", fontSize: "14px" }}>
              👋 Welcome,{" "}
              <span style={{ color: "#fff", fontWeight: "600" }}>
                {session?.user?.name || "Admin"}
              </span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div style={{ padding: "32px", flex: 1 }}>{children}</div>
      </div>
    </div>
  );
}
