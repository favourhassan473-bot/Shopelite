import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useWindowSize from "../../hooks/useWindowSize";

const categories = [
  { label: "All", value: "" },
  { label: "👟 Shoes", value: "shoes" },
  { label: "👕 Clothing", value: "clothing" },
  { label: "📱 Electronics", value: "electronics" },
  { label: "⌚ Accessories", value: "accessories" },
  { label: "📦 Other", value: "other" },
];

function ProductCard({ product, router, addToCart, isMobile }) {
  const [added, setAdded] = useState(false);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
      onClick={() => router.push(`/products/${product._id}`)}
      style={{
        background: "#111",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <div
        style={{
          aspectRatio: "1",
          overflow: "hidden",
          background: "#1a1a1a",
          position: "relative",
        }}
      >
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
            }}
          >
            📦
          </div>
        )}
        <div
          style={{
            position: "absolute",
            top: "8px",
            left: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {discount && (
            <span
              style={{
                background: "linear-gradient(135deg, #f97316, #ec4899)",
                color: "#fff",
                fontSize: "10px",
                fontWeight: "700",
                padding: "2px 6px",
                borderRadius: "100px",
              }}
            >
              -{discount}%
            </span>
          )}
          {product.isFeatured && (
            <span
              style={{
                background: "rgba(99,102,241,0.9)",
                color: "#fff",
                fontSize: "10px",
                fontWeight: "700",
                padding: "2px 6px",
                borderRadius: "100px",
              }}
            >
              ⭐
            </span>
          )}
          {product.stock === 0 && (
            <span
              style={{
                background: "rgba(239,68,68,0.9)",
                color: "#fff",
                fontSize: "10px",
                fontWeight: "700",
                padding: "2px 6px",
                borderRadius: "100px",
              }}
            >
              Out
            </span>
          )}
        </div>
      </div>

      <div style={{ padding: isMobile ? "10px" : "16px" }}>
        <p
          style={{
            color: "#f97316",
            fontSize: "10px",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "4px",
          }}
        >
          {product.category}
        </p>
        <h3
          style={{
            color: "#fff",
            fontSize: isMobile ? "13px" : "15px",
            fontWeight: "600",
            marginBottom: "8px",
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "6px",
          }}
        >
          <span
            style={{
              color: "#f97316",
              fontSize: isMobile ? "14px" : "18px",
              fontWeight: "700",
            }}
          >
            ${product.price}
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            style={{
              padding: isMobile ? "6px 10px" : "8px 14px",
              background: added
                ? "linear-gradient(135deg, #10b981, #059669)"
                : product.stock === 0
                  ? "#333"
                  : "linear-gradient(135deg, #f97316, #ec4899)",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontSize: isMobile ? "11px" : "12px",
              fontWeight: "600",
              cursor: product.stock === 0 ? "not-allowed" : "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {added ? "✓" : product.stock === 0 ? "Out" : "+ Cart"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Products() {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isMobile } = useWindowSize();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [priceMax, setPriceMax] = useState("");

  useEffect(() => {
    if (router.query.category) setCategory(router.query.category);
    if (router.query.search) {
      setSearch(router.query.search);
      setSearchInput(router.query.search);
    }
  }, [router.query]);

  useEffect(() => {
    fetchProducts();
  }, [category, search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = "/api/products?";
      if (category) url += `category=${category}&`;
      if (search) url += `search=${search}&`;
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (e) {}
    setLoading(false);
  };

  const getSorted = () => {
    let list = [...products];
    if (priceMax) list = list.filter((p) => p.price <= Number(priceMax));
    if (sort === "price_asc") return list.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") return list.sort((a, b) => b.price - a.price);
    if (sort === "name_asc")
      return list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  };

  const sorted = getSorted();

  return (
    <div
      style={{
        background: "#0a0a0a",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Navbar />

      <div
        style={{
          padding: isMobile ? "32px 20px 20px" : "48px 40px",
          textAlign: "center",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontSize: isMobile ? "28px" : "40px",
            fontWeight: "900",
            marginBottom: "8px",
            letterSpacing: "-1px",
          }}
        >
          {category
            ? categories.find((c) => c.value === category)?.label || category
            : "All Products"}
        </h1>
        <p style={{ color: "#888", fontSize: "15px" }}>
          {sorted.length} products found
        </p>
      </div>

      {/* Mobile Category Chips */}
      {isMobile && (
        <div
          style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            padding: "16px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              style={{
                padding: "8px 14px",
                borderRadius: "100px",
                border: `1px solid ${category === cat.value ? "#f97316" : "rgba(255,255,255,0.1)"}`,
                background:
                  category === cat.value
                    ? "rgba(249,115,22,0.15)"
                    : "transparent",
                color: category === cat.value ? "#f97316" : "#888",
                fontSize: "13px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: isMobile ? "20px" : "40px",
          display: isMobile ? "block" : "grid",
          gridTemplateColumns: "240px 1fr",
          gap: "32px",
        }}
      >
        {/* Desktop Sidebar */}
        {!isMobile && (
          <aside
            style={{ position: "sticky", top: "90px", alignSelf: "start" }}
          >
            <div
              style={{
                background: "#111",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "16px",
              }}
            >
              <p
                style={{
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "14px",
                }}
              >
                🔍 Search
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSearch(searchInput);
                }}
                style={{ display: "flex", gap: "8px" }}
              >
                <input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search..."
                  style={{
                    flex: 1,
                    padding: "10px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "10px 14px",
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
              {search && (
                <button
                  onClick={() => {
                    setSearch("");
                    setSearchInput("");
                  }}
                  style={{
                    color: "#f97316",
                    background: "none",
                    border: "none",
                    fontSize: "13px",
                    cursor: "pointer",
                    marginTop: "8px",
                  }}
                >
                  ✕ Clear
                </button>
              )}
            </div>

            <div
              style={{
                background: "#111",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "16px",
              }}
            >
              <p
                style={{
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "14px",
                }}
              >
                📂 Category
              </p>
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "9px 12px",
                    borderRadius: "8px",
                    border: "none",
                    background:
                      category === cat.value
                        ? "rgba(249,115,22,0.15)"
                        : "transparent",
                    color: category === cat.value ? "#f97316" : "#888",
                    fontSize: "14px",
                    cursor: "pointer",
                    marginBottom: "4px",
                    fontWeight: category === cat.value ? "600" : "400",
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div
              style={{
                background: "#111",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <p
                style={{
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "14px",
                }}
              >
                💰 Max Price
              </p>
              <input
                type="number"
                placeholder="e.g. 100"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              {priceMax && (
                <button
                  onClick={() => setPriceMax("")}
                  style={{
                    color: "#f97316",
                    background: "none",
                    border: "none",
                    fontSize: "13px",
                    cursor: "pointer",
                    marginTop: "8px",
                  }}
                >
                  ✕ Clear
                </button>
              )}
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main>
          {/* Mobile Search Bar */}
          {isMobile && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearch(searchInput);
              }}
              style={{ display: "flex", gap: "8px", marginBottom: "16px" }}
            >
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products..."
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
              />
              <button
                type="submit"
                style={{
                  padding: "10px 14px",
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
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <p style={{ color: "#888", fontSize: "14px" }}>
              <strong style={{ color: "#fff" }}>{sorted.length}</strong> results
              {search && (
                <span>
                  {" "}
                  for "<strong style={{ color: "#f97316" }}>{search}</strong>"
                </span>
              )}
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{
                padding: "9px 12px",
                background: "#111",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "13px",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name A-Z</option>
            </select>
          </div>

          {loading ? (
            <div
              style={{
                color: "#888",
                textAlign: "center",
                padding: "60px",
                fontSize: "16px",
              }}
            >
              ⏳ Loading...
            </div>
          ) : sorted.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
              <h3
                style={{
                  color: "#fff",
                  fontSize: "18px",
                  fontWeight: "700",
                  marginBottom: "8px",
                }}
              >
                No products found
              </h3>
              <button
                onClick={() => {
                  setCategory("");
                  setSearch("");
                  setSearchInput("");
                  setPriceMax("");
                }}
                style={{
                  padding: "12px 24px",
                  background: "linear-gradient(135deg, #f97316, #ec4899)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  fontWeight: "600",
                  cursor: "pointer",
                  marginTop: "16px",
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "repeat(2, 1fr)"
                  : "repeat(auto-fill, minmax(240px, 1fr))",
                gap: isMobile ? "12px" : "24px",
              }}
            >
              {sorted.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  router={router}
                  addToCart={addToCart}
                  isMobile={isMobile}
                />
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
