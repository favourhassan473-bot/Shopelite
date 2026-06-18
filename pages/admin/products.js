import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AdminLayout from "../../components/AdminLayout";

export default function AdminProducts() {
  const { status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (e) {}
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (e) {}
    setDeleting(null);
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(search.toLowerCase())),
  );

  if (status === "loading" || loading) {
    return (
      <AdminLayout>
        <div
          style={{
            color: "#888",
            fontSize: "16px",
            textAlign: "center",
            padding: "60px",
          }}
        >
          ⏳ Loading products...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: "700" }}>
          All Products{" "}
          <span style={{ color: "#888", fontWeight: "400", fontSize: "16px" }}>
            ({products.length})
          </span>
        </h2>
        <button
          onClick={() => router.push("/admin/add-product")}
          style={{
            padding: "10px 20px",
            background: "linear-gradient(135deg, #f97316, #ec4899)",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          ➕ Add Product
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="🔍 Search products by name, category or brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
            color: "#fff",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Products List */}
      {filtered.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px",
            background: "#111",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>📦</div>
          <h3 style={{ color: "#fff", marginBottom: "8px", fontSize: "18px" }}>
            {search ? "No products match your search" : "No products yet"}
          </h3>
          <p style={{ color: "#888", marginBottom: "24px", fontSize: "14px" }}>
            {search
              ? "Try a different search term"
              : "Start by adding your first product"}
          </p>
          {!search && (
            <button
              onClick={() => router.push("/admin/add-product")}
              style={{
                padding: "12px 24px",
                background: "linear-gradient(135deg, #f97316, #ec4899)",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Add First Product
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map((product) => (
            <div
              key={product._id}
              style={{
                background: "#111",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "12px",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                transition: "border 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(249,115,22,0.2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")
              }
            >
              {/* Image */}
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  background: "#1a1a1a",
                  flexShrink: 0,
                }}
              >
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
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
                      fontSize: "24px",
                    }}
                  >
                    📦
                  </div>
                )}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3
                  style={{
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: "600",
                    marginBottom: "4px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.name}
                </h3>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      color: "#f97316",
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span
                      style={{
                        color: "#555",
                        fontSize: "12px",
                        textDecoration: "line-through",
                      }}
                    >
                      ${product.originalPrice}
                    </span>
                  )}
                  <span style={{ color: "#888", fontSize: "13px" }}>
                    📂 {product.category}
                  </span>
                  {product.brand && (
                    <span style={{ color: "#888", fontSize: "13px" }}>
                      🏷️ {product.brand}
                    </span>
                  )}
                  <span
                    style={{
                      color:
                        product.stock > 5
                          ? "#34d399"
                          : product.stock > 0
                            ? "#f59e0b"
                            : "#ef4444",
                      fontSize: "13px",
                    }}
                  >
                    📦{" "}
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </span>
                  {product.isFeatured && (
                    <span
                      style={{
                        background: "rgba(99,102,241,0.15)",
                        color: "#818cf8",
                        fontSize: "11px",
                        fontWeight: "600",
                        padding: "2px 8px",
                        borderRadius: "100px",
                      }}
                    >
                      ⭐ Featured
                    </span>
                  )}
                  <span
                    style={{
                      background: product.isPublished
                        ? "rgba(16,185,129,0.15)"
                        : "rgba(239,68,68,0.15)",
                      color: product.isPublished ? "#34d399" : "#f87171",
                      fontSize: "11px",
                      fontWeight: "600",
                      padding: "2px 8px",
                      borderRadius: "100px",
                    }}
                  >
                    {product.isPublished ? "🟢 Published" : "🔴 Draft"}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                <button
                  onClick={() => router.push(`/products/${product._id}`)}
                  style={{
                    padding: "8px 14px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#ccc",
                    fontSize: "13px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.3)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.1)")
                  }
                >
                  👁️ View
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  disabled={deleting === product._id}
                  style={{
                    padding: "8px 14px",
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    borderRadius: "8px",
                    color: "#ef4444",
                    fontSize: "13px",
                    cursor:
                      deleting === product._id ? "not-allowed" : "pointer",
                    transition: "all 0.2s",
                    opacity: deleting === product._id ? 0.6 : 1,
                  }}
                >
                  {deleting === product._id ? "⏳" : "🗑️ Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Stats */}
      {filtered.length > 0 && (
        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            background: "#111",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "12px",
            display: "flex",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          <span style={{ color: "#888", fontSize: "13px" }}>
            Total: <strong style={{ color: "#fff" }}>{products.length}</strong>{" "}
            products
          </span>
          <span style={{ color: "#888", fontSize: "13px" }}>
            Published:{" "}
            <strong style={{ color: "#34d399" }}>
              {products.filter((p) => p.isPublished).length}
            </strong>
          </span>
          <span style={{ color: "#888", fontSize: "13px" }}>
            Featured:{" "}
            <strong style={{ color: "#818cf8" }}>
              {products.filter((p) => p.isFeatured).length}
            </strong>
          </span>
          <span style={{ color: "#888", fontSize: "13px" }}>
            Out of Stock:{" "}
            <strong style={{ color: "#ef4444" }}>
              {products.filter((p) => p.stock === 0).length}
            </strong>
          </span>
        </div>
      )}
    </AdminLayout>
  );
}
