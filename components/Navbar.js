import { useState } from "react";
import { useRouter } from "next/router";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import useWindowSize from "../hooks/useWindowSize";

export default function Navbar() {
  const router = useRouter();
  const { cart } = useCart();
  const { isMobile } = useWindowSize();
  const [searchVal, setSearchVal] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/products?search=${searchVal.trim()}`);
      setMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Shoes", path: "/products?category=shoes" },
    { label: "Electronics", path: "/products?category=electronics" },
  ];

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(10,10,10,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          padding: isMobile ? "0 20px" : "0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "70px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          style={{
            fontSize: "22px",
            fontWeight: "800",
            background: "linear-gradient(135deg, #f97316, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            cursor: "pointer",
            letterSpacing: "-0.5px",
            flexShrink: 0,
          }}
        >
          ShopElite
        </div>

        {/* Desktop Nav Links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            {navLinks.map((link) => (
              <span
                key={link.path}
                onClick={() => router.push(link.path)}
                style={{
                  color: router.pathname === link.path ? "#f97316" : "#888",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "color 0.2s",
                  borderBottom:
                    router.pathname === link.path
                      ? "2px solid #f97316"
                      : "2px solid transparent",
                  paddingBottom: "2px",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (router.pathname !== link.path)
                    e.target.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  if (router.pathname !== link.path)
                    e.target.style.color = "#888";
                }}
              >
                {link.label}
              </span>
            ))}
          </div>
        )}

        {/* Desktop Search */}
        {!isMobile && (
          <form
            onSubmit={handleSearch}
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "100px",
              padding: "8px 16px",
              gap: "8px",
            }}
          >
            <span style={{ color: "#888", fontSize: "14px" }}>🔍</span>
            <input
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "14px",
                outline: "none",
                width: "180px",
              }}
              placeholder="Search products..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </form>
        )}

        {/* Right Side */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Cart */}
          <button
            onClick={() => router.push("/cart")}
            style={{
              position: "relative",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              padding: "8px 12px",
              color: "#fff",
              cursor: "pointer",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
            }}
          >
            🛒
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-6px",
                  background: "linear-gradient(135deg, #f97316, #ec4899)",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "11px",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          {/* Admin Button - Desktop only */}
          {!isMobile && (
            <button
              onClick={() => router.push("/admin")}
              style={{
                padding: "8px 16px",
                background: "linear-gradient(135deg, #f97316, #ec4899)",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Admin
            </button>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "#fff",
                padding: "8px 12px",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "#111",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              overflow: "hidden",
              position: "sticky",
              top: "70px",
              zIndex: 99,
            }}
          >
            <div style={{ padding: "20px" }}>
              {/* Mobile Search */}
              <form
                onSubmit={handleSearch}
                style={{ display: "flex", gap: "8px", marginBottom: "16px" }}
              >
                <input
                  style={{
                    flex: 1,
                    padding: "10px 14px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "14px",
                    outline: "none",
                  }}
                  placeholder="Search products..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                />
                <button
                  type="submit"
                  style={{
                    padding: "10px 16px",
                    background: "linear-gradient(135deg, #f97316, #ec4899)",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Go
                </button>
              </form>

              {/* Mobile Nav Links */}
              {navLinks.map((link) => (
                <div
                  key={link.path}
                  onClick={() => {
                    router.push(link.path);
                    setMenuOpen(false);
                  }}
                  style={{
                    padding: "14px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    color: router.pathname === link.path ? "#f97316" : "#ccc",
                    fontSize: "16px",
                    fontWeight: router.pathname === link.path ? "600" : "400",
                    cursor: "pointer",
                  }}
                >
                  {link.label}
                </div>
              ))}

              <button
                onClick={() => {
                  router.push("/admin");
                  setMenuOpen(false);
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "linear-gradient(135deg, #f97316, #ec4899)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  marginTop: "16px",
                }}
              >
                Admin Panel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
