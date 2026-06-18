import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();

  return (
    <footer
      style={{
        background: "#111",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "60px 40px 30px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "40px",
          maxWidth: "1200px",
          margin: "0 auto 40px",
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: "800",
              background: "linear-gradient(135deg, #f97316, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "12px",
            }}
          >
            ShopElite
          </div>
          <p
            style={{
              color: "#666",
              fontSize: "14px",
              lineHeight: 1.6,
              marginBottom: "20px",
            }}
          >
            Your one-stop destination for shoes, clothing, electronics and
            accessories.
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            {["📘", "🐦", "📸", "▶️"].map((icon, i) => (
              <div
                key={i}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "16px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(249,115,22,0.4)";
                  e.currentTarget.style.background = "rgba(249,115,22,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <div
            style={{
              color: "#fff",
              fontSize: "14px",
              fontWeight: "700",
              marginBottom: "16px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Shop
          </div>
          {[
            { label: "All Products", path: "/products" },
            { label: "Shoes", path: "/products?category=shoes" },
            { label: "Clothing", path: "/products?category=clothing" },
            { label: "Electronics", path: "/products?category=electronics" },
            { label: "Accessories", path: "/products?category=accessories" },
          ].map((item) => (
            <span
              key={item.path}
              onClick={() => router.push(item.path)}
              style={{
                display: "block",
                color: "#666",
                fontSize: "14px",
                marginBottom: "10px",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#f97316")}
              onMouseLeave={(e) => (e.target.style.color = "#666")}
            >
              {item.label}
            </span>
          ))}
        </div>

        {/* Help */}
        <div>
          <div
            style={{
              color: "#fff",
              fontSize: "14px",
              fontWeight: "700",
              marginBottom: "16px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Help
          </div>
          {[
            "FAQ",
            "Shipping Policy",
            "Returns",
            "Track Order",
            "Contact Us",
          ].map((item) => (
            <span
              key={item}
              style={{
                display: "block",
                color: "#666",
                fontSize: "14px",
                marginBottom: "10px",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#f97316")}
              onMouseLeave={(e) => (e.target.style.color = "#666")}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div
            style={{
              color: "#fff",
              fontSize: "14px",
              fontWeight: "700",
              marginBottom: "16px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Contact
          </div>
          <p style={{ color: "#666", fontSize: "14px", lineHeight: 2 }}>
            📧 support@shopelite.com
            <br />
            📞 +234 9166400824
            <br />
            📍 Lagos, Nigeria
            <br />
            🕐 Mon-Fri, 9am-6pm
          </p>

          <div style={{ marginTop: "16px" }}>
            <div
              style={{
                color: "#fff",
                fontSize: "13px",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Newsletter
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                placeholder="Your email"
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "6px",
                  color: "#fff",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
              <button
                style={{
                  padding: "8px 12px",
                  background: "linear-gradient(135deg, #f97316, #ec4899)",
                  border: "none",
                  borderRadius: "6px",
                  color: "#fff",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingTop: "24px",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <p style={{ color: "#444", fontSize: "13px" }}>
          © {new Date().getFullYear()} ShopElite. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: "20px" }}>
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
            (item) => (
              <span
                key={item}
                style={{
                  color: "#444",
                  fontSize: "13px",
                  cursor: "pointer",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#888")}
                onMouseLeave={(e) => (e.target.style.color = "#444")}
              >
                {item}
              </span>
            ),
          )}
        </div>
      </div>
    </footer>
  );
}
