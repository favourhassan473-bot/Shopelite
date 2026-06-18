import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AdminLayout from "../../components/AdminLayout";
import useWindowSize from "../../hooks/useWindowSize";

export default function AddProduct() {
  const { status } = useSession();
  const router = useRouter();
  const { isMobile } = useWindowSize();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    brand: "",
    stock: "",
    sizes: "",
    colors: "",
    tags: "",
    isFeatured: false,
    isPublished: true,
  });

  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setUploading(true);
    setError("");

    try {
      const uploadedUrls = [];
      for (const file of files) {
        const reader = new FileReader();
        const base64 = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: base64 }),
        });
        const data = await res.json();
        if (data.url) uploadedUrls.push(data.url);
      }
      setImages((prev) => [...prev, ...uploadedUrls]);
    } catch (err) {
      setError("Image upload failed. Check your Cloudinary credentials.");
    }
    setUploading(false);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    if (images.length === 0) {
      setError("Please upload at least one image");
      setSubmitting(false);
      return;
    }

    try {
      const productData = {
        ...form,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
        stock: Number(form.stock),
        images,
        sizes: form.sizes
          ? form.sizes
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        colors: form.colors
          ? form.colors
              .split(",")
              .map((c) => c.trim())
              .filter(Boolean)
          : [],
        tags: form.tags
          ? form.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create product");
      } else {
        setSuccess("✅ Product created successfully!");
        setTimeout(() => router.push("/admin/products"), 1500);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "14px",
    marginBottom: "16px",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    color: "#aaa",
    fontSize: "13px",
    fontWeight: "500",
    marginBottom: "6px",
  };

  const cardStyle = {
    background: "#111",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "20px",
  };

  const cardTitleStyle = {
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    marginBottom: "20px",
    paddingBottom: "12px",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  };

  if (status === "loading") {
    return (
      <AdminLayout>
        <div style={{ color: "#888", textAlign: "center", padding: "60px" }}>
          ⏳ Loading...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit}>
        {error && (
          <div
            style={{
              background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#f87171",
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "14px",
              marginBottom: "20px",
            }}
          >
            ⚠️ {error}
          </div>
        )}
        {success && (
          <div
            style={{
              background: "rgba(16,185,129,0.15)",
              border: "1px solid rgba(16,185,129,0.3)",
              color: "#34d399",
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "14px",
              marginBottom: "20px",
            }}
          >
            {success}
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "20px",
          }}
        >
          {/* Left Column */}
          <div>
            {/* Basic Info */}
            <div style={cardStyle}>
              <div style={cardTitleStyle}>📝 Basic Information</div>

              <label style={labelStyle}>Product Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Nike Air Max 90"
                required
                style={inputStyle}
              />

              <label style={labelStyle}>Description *</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the product..."
                required
                style={{
                  ...inputStyle,
                  minHeight: "100px",
                  resize: "vertical",
                }}
              />

              <label style={labelStyle}>Brand</label>
              <input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                placeholder="e.g. Nike, Apple, Samsung"
                style={inputStyle}
              />

              <label style={labelStyle}>Category *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                style={{ ...inputStyle, background: "#1a1a1a" }}
              >
                <option value="">Select category...</option>
                <option value="shoes">👟 Shoes</option>
                <option value="clothing">👕 Clothing</option>
                <option value="electronics">📱 Electronics</option>
                <option value="accessories">⌚ Accessories</option>
                <option value="other">📦 Other</option>
              </select>
            </div>

            {/* Pricing */}
            <div style={cardStyle}>
              <div style={cardTitleStyle}>💰 Pricing & Stock</div>

              <label style={labelStyle}>Price ($) *</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
                required
                min="0"
                style={inputStyle}
              />

              <label style={labelStyle}>
                Original Price ($) — for discount display
              </label>
              <input
                name="originalPrice"
                type="number"
                value={form.originalPrice}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                style={inputStyle}
              />

              <label style={labelStyle}>Stock Quantity *</label>
              <input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                placeholder="0"
                required
                min="0"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Images */}
            <div style={cardStyle}>
              <div style={cardTitleStyle}>🖼️ Product Images</div>

              {images.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
                    gap: "10px",
                    marginBottom: "16px",
                  }}
                >
                  {images.map((url, i) => (
                    <div
                      key={i}
                      style={{
                        position: "relative",
                        aspectRatio: "1",
                        borderRadius: "8px",
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <img
                        src={url}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        style={{
                          position: "absolute",
                          top: "4px",
                          right: "4px",
                          background: "rgba(239,68,68,0.9)",
                          border: "none",
                          borderRadius: "50%",
                          width: "22px",
                          height: "22px",
                          color: "#fff",
                          fontSize: "12px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <label
                style={{
                  border: "2px dashed rgba(249,115,22,0.3)",
                  borderRadius: "12px",
                  padding: "28px 20px",
                  textAlign: "center",
                  cursor: "pointer",
                  display: "block",
                  background: "rgba(249,115,22,0.03)",
                  marginBottom: "16px",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
                {uploading ? (
                  <div style={{ color: "#f97316" }}>⏳ Uploading...</div>
                ) : (
                  <>
                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>
                      📸
                    </div>
                    <div style={{ color: "#888", fontSize: "13px" }}>
                      Click to upload images
                    </div>
                    <div
                      style={{
                        color: "#555",
                        fontSize: "11px",
                        marginTop: "4px",
                      }}
                    >
                      PNG, JPG up to 10MB
                    </div>
                  </>
                )}
              </label>
            </div>

            {/* Variants */}
            <div style={cardStyle}>
              <div style={cardTitleStyle}>🎨 Variants & Tags</div>

              <label style={labelStyle}>Sizes (comma separated)</label>
              <input
                name="sizes"
                value={form.sizes}
                onChange={handleChange}
                placeholder="e.g. S, M, L, XL or 40, 41, 42"
                style={inputStyle}
              />

              <label style={labelStyle}>Colors (comma separated)</label>
              <input
                name="colors"
                value={form.colors}
                onChange={handleChange}
                placeholder="e.g. Red, Black, White"
                style={inputStyle}
              />

              <label style={labelStyle}>Tags (comma separated)</label>
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="e.g. sale, new, trending"
                style={inputStyle}
              />
            </div>

            {/* Settings */}
            <div style={cardStyle}>
              <div style={cardTitleStyle}>⚙️ Settings</div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "16px",
                }}
              >
                <input
                  type="checkbox"
                  name="isFeatured"
                  id="isFeatured"
                  checked={form.isFeatured}
                  onChange={handleChange}
                  style={{ width: "16px", height: "16px", cursor: "pointer" }}
                />
                <label
                  htmlFor="isFeatured"
                  style={{ color: "#ccc", fontSize: "14px", cursor: "pointer" }}
                >
                  ⭐ Feature this product on homepage
                </label>
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <input
                  type="checkbox"
                  name="isPublished"
                  id="isPublished"
                  checked={form.isPublished}
                  onChange={handleChange}
                  style={{ width: "16px", height: "16px", cursor: "pointer" }}
                />
                <label
                  htmlFor="isPublished"
                  style={{ color: "#ccc", fontSize: "14px", cursor: "pointer" }}
                >
                  🌐 Publish product (visible to customers)
                </label>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{
            width: "100%",
            padding: "16px",
            background: submitting
              ? "#333"
              : "linear-gradient(135deg, #f97316, #ec4899)",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "700",
            cursor: submitting ? "not-allowed" : "pointer",
            marginTop: "8px",
            transition: "all 0.2s",
          }}
        >
          {submitting ? "⏳ Creating Product..." : "🚀 Create Product"}
        </button>
      </form>
    </AdminLayout>
  );
}
