import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useWindowSize from "../../hooks/useWindowSize";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();
  const { isMobile } = useWindowSize();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data.product);
        setLoading(false);
        if (data.product?.category) {
          fetch(`/api/products?category=${data.product.category}`)
            .then((r) => r.json())
            .then((d) =>
              setRelated(
                (d.products || []).filter((p) => p._id !== id).slice(0, 4),
              ),
            );
        }
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product?.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;

  if (loading)
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
            textAlign: "center",
            padding: "100px 40px",
            color: "#888",
            fontSize: "16px",
          }}
        >
          ⏳ Loading product...
        </div>
        <Footer />
      </div>
    );

  if (!product)
    return (
      <div
        style={{
          background: "#0a0a0a",
          minHeight: "100vh",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <Navbar />
        <div style={{ textAlign: "center", padding: "100px 40px" }}>
          <div style={{ fontSize: "56px", marginBottom: "16px" }}>😕</div>
          <h2 style={{ color: "#fff", fontSize: "24px", marginBottom: "16px" }}>
            Product not found
          </h2>
          <button
            onClick={() => router.push("/products")}
            style={{
              padding: "12px 28px",
              background: "linear-gradient(135deg, #f97316, #ec4899)",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Back to Products
          </button>
        </div>
        <Footer />
      </div>
    );

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
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "24px 16px" : "48px 40px",
        }}
      >
        {/* Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "#666",
            fontSize: "12px",
            marginBottom: "24px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{ cursor: "pointer", color: "#888" }}
            onClick={() => router.push("/")}
          >
            Home
          </span>
          <span>›</span>
          <span
            style={{ cursor: "pointer", color: "#888" }}
            onClick={() => router.push("/products")}
          >
            Products
          </span>
          <span>›</span>
          <span
            style={{ cursor: "pointer", color: "#888" }}
            onClick={() =>
              router.push(`/products?category=${product.category}`)
            }
          >
            {product.category}
          </span>
          <span>›</span>
          <span style={{ color: "#fff" }}>{product.name}</span>
        </div>

        {/* Main Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "24px" : "60px",
            marginBottom: "60px",
          }}
        >
          {/* Images */}
          <div>
            <div
              style={{
                aspectRatio: "1",
                borderRadius: "16px",
                overflow: "hidden",
                background: "#111",
                border: "1px solid rgba(255,255,255,0.07)",
                marginBottom: "12px",
              }}
            >
              {product.images?.[selectedImage] ? (
                <img
                  src={product.images[selectedImage]}
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
                    fontSize: "80px",
                  }}
                >
                  📦
                </div>
              )}
            </div>

            {product.images?.length > 1 && (
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    style={{
                      width: isMobile ? "60px" : "72px",
                      height: isMobile ? "60px" : "72px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      border: `2px solid ${i === selectedImage ? "#f97316" : "rgba(255,255,255,0.1)"}`,
                      cursor: "pointer",
                      transition: "border 0.2s",
                      background: "#111",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={img}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {product.isFeatured && (
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: "100px",
                  fontSize: "12px",
                  fontWeight: "700",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "#fff",
                  marginBottom: "12px",
                }}
              >
                ⭐ Featured
              </span>
            )}

            <p
              style={{
                color: "#f97316",
                fontSize: "12px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "10px",
              }}
            >
              {product.category}
            </p>

            <h1
              style={{
                color: "#fff",
                fontSize: isMobile ? "24px" : "clamp(24px, 3vw, 36px)",
                fontWeight: "800",
                lineHeight: 1.2,
                letterSpacing: "-0.5px",
                marginBottom: "14px",
              }}
            >
              {product.name}
            </h1>

            {product.brand && (
              <p
                style={{
                  color: "#666",
                  fontSize: "14px",
                  marginBottom: "14px",
                }}
              >
                Brand: <span style={{ color: "#aaa" }}>{product.brand}</span>
              </p>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: isMobile ? "28px" : "36px",
                  fontWeight: "800",
                  color: "#f97316",
                }}
              >
                ${product.price}
              </span>
              {product.originalPrice && (
                <span
                  style={{
                    fontSize: isMobile ? "16px" : "20px",
                    color: "#555",
                    textDecoration: "line-through",
                  }}
                >
                  ${product.originalPrice}
                </span>
              )}
              {discount && (
                <span
                  style={{
                    background: "linear-gradient(135deg, #f97316, #ec4899)",
                    color: "#fff",
                    padding: "4px 10px",
                    borderRadius: "100px",
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  Save {discount}%
                </span>
              )}
            </div>

            <p
              style={{
                color: "#999",
                fontSize: "14px",
                lineHeight: 1.8,
                marginBottom: "24px",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                paddingBottom: "24px",
              }}
            >
              {product.description}
            </p>

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div style={{ marginBottom: "18px" }}>
                <p
                  style={{
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "10px",
                  }}
                >
                  Size{" "}
                  {selectedSize && (
                    <span style={{ color: "#f97316" }}>— {selectedSize}</span>
                  )}
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        setSelectedSize(selectedSize === size ? "" : size)
                      }
                      style={{
                        padding: "8px 14px",
                        borderRadius: "8px",
                        border: `1px solid ${selectedSize === size ? "#f97316" : "rgba(255,255,255,0.15)"}`,
                        background:
                          selectedSize === size
                            ? "rgba(249,115,22,0.15)"
                            : "transparent",
                        color: selectedSize === size ? "#f97316" : "#888",
                        fontSize: "13px",
                        fontWeight: selectedSize === size ? "600" : "400",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div style={{ marginBottom: "18px" }}>
                <p
                  style={{
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "10px",
                  }}
                >
                  Color{" "}
                  {selectedColor && (
                    <span style={{ color: "#f97316" }}>— {selectedColor}</span>
                  )}
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() =>
                        setSelectedColor(selectedColor === color ? "" : color)
                      }
                      style={{
                        padding: "8px 14px",
                        borderRadius: "8px",
                        border: `1px solid ${selectedColor === color ? "#f97316" : "rgba(255,255,255,0.15)"}`,
                        background:
                          selectedColor === color
                            ? "rgba(249,115,22,0.15)"
                            : "transparent",
                        color: selectedColor === color ? "#f97316" : "#888",
                        fontSize: "13px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <p
              style={{
                color: "#fff",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "10px",
              }}
            >
              Quantity
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: "24px",
              }}
            >
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontSize: "18px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                −
              </button>
              <span
                style={{
                  color: "#fff",
                  fontSize: "18px",
                  fontWeight: "700",
                  minWidth: "32px",
                  textAlign: "center",
                }}
              >
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontSize: "18px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                +
              </button>
              <span style={{ color: "#666", fontSize: "13px" }}>
                {product.stock} available
              </span>
            </div>

            {/* Buttons */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              style={{
                width: "100%",
                padding: "16px",
                background: added
                  ? "linear-gradient(135deg, #10b981, #059669)"
                  : "linear-gradient(135deg, #f97316, #ec4899)",
                border: "none",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "700",
                cursor: product.stock === 0 ? "not-allowed" : "pointer",
                transition: "all 0.3s",
                marginBottom: "12px",
              }}
            >
              {added
                ? "✓ Added to Cart!"
                : product.stock === 0
                  ? "Out of Stock"
                  : "🛒 Add to Cart"}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                handleAddToCart();
                router.push("/cart");
              }}
              disabled={product.stock === 0}
              style={{
                width: "100%",
                padding: "16px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "600",
                cursor: product.stock === 0 ? "not-allowed" : "pointer",
                marginBottom: "24px",
              }}
            >
              ⚡ Buy Now
            </motion.button>

            {/* Meta */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {[
                "🚚 Free shipping over $50",
                "↩️ 30-day returns",
                "🔒 Secure checkout",
              ].map((item) => (
                <span key={item} style={{ color: "#666", fontSize: "12px" }}>
                  {item}
                </span>
              ))}
            </div>

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#888",
                      padding: "4px 10px",
                      borderRadius: "100px",
                      fontSize: "12px",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.07)",
              paddingTop: "48px",
            }}
          >
            <h2
              style={{
                color: "#fff",
                fontSize: isMobile ? "20px" : "24px",
                fontWeight: "800",
                letterSpacing: "-0.5px",
                marginBottom: "24px",
              }}
            >
              You might also like
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "repeat(2, 1fr)"
                  : "repeat(auto-fill, minmax(220px, 1fr))",
                gap: isMobile ? "12px" : "20px",
              }}
            >
              {related.map((p) => (
                <motion.div
                  key={p._id}
                  whileHover={{ y: -4 }}
                  onClick={() => router.push(`/products/${p._id}`)}
                  style={{
                    background: "#111",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                >
                  <div
                    style={{
                      aspectRatio: "1",
                      background: "#1a1a1a",
                      overflow: "hidden",
                    }}
                  >
                    {p.images?.[0] ? (
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "40px",
                        }}
                      >
                        📦
                      </div>
                    )}
                  </div>
                  <div style={{ padding: isMobile ? "10px" : "14px" }}>
                    <p
                      style={{
                        color: "#f97316",
                        fontSize: "10px",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        marginBottom: "4px",
                      }}
                    >
                      {p.category}
                    </p>
                    <h4
                      style={{
                        color: "#fff",
                        fontSize: isMobile ? "13px" : "14px",
                        fontWeight: "600",
                        marginBottom: "6px",
                      }}
                    >
                      {p.name}
                    </h4>
                    <span
                      style={{
                        color: "#f97316",
                        fontWeight: "700",
                        fontSize: isMobile ? "14px" : "16px",
                      }}
                    >
                      ${p.price}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
