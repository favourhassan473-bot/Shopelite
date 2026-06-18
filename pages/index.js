import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FadeIn from "../components/FadeIn";
import useWindowSize from "../hooks/useWindowSize";

const categories = [
  {
    name: "Shoes",
    icon: "👟",
    value: "shoes",
    color: "linear-gradient(135deg, #f97316, #ea580c)",
  },
  {
    name: "Clothing",
    icon: "👕",
    value: "clothing",
    color: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
  },
  {
    name: "Electronics",
    icon: "📱",
    value: "electronics",
    color: "linear-gradient(135deg, #06b6d4, #0891b2)",
  },
  {
    name: "Accessories",
    icon: "⌚",
    value: "accessories",
    color: "linear-gradient(135deg, #ec4899, #db2777)",
  },
];

function HeroSection({ router }) {
  const { isMobile } = useWindowSize();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Step Into",
      highlight: "New Arrivals",
      subtitle: "Discover the latest shoes, clothing and electronics.",
      cta: "Shop Now",
      accent: "#f97316",
    },
    {
      title: "Dress For",
      highlight: "Every Moment",
      subtitle: "Premium clothing collections for every style.",
      cta: "Explore Clothing",
      accent: "#8b5cf6",
    },
    {
      title: "Tech That",
      highlight: "Moves You",
      subtitle: "Cutting-edge electronics for modern living.",
      cta: "Shop Electronics",
      accent: "#06b6d4",
    },
  ];

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      4000,
    );
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div
      style={{
        minHeight: isMobile ? "70vh" : "90vh",
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: isMobile ? "40px 20px" : "40px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: isMobile ? "300px" : "600px",
          height: isMobile ? "300px" : "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${slide.accent}22 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          transition: "background 1s ease",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "800px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: `${slide.accent}22`,
            border: `1px solid ${slide.accent}44`,
            borderRadius: "100px",
            padding: "6px 16px",
            color: slide.accent,
            fontSize: "12px",
            fontWeight: "600",
            marginBottom: "20px",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          ✨ New Season Collection
        </div>

        <h1
          style={{
            fontSize: isMobile ? "36px" : "clamp(40px, 7vw, 80px)",
            fontWeight: "900",
            color: "#fff",
            lineHeight: 1.1,
            marginBottom: "8px",
            letterSpacing: "-2px",
          }}
        >
          {slide.title}
        </h1>

        <h1
          style={{
            fontSize: isMobile ? "36px" : "clamp(40px, 7vw, 80px)",
            fontWeight: "900",
            lineHeight: 1.1,
            marginBottom: "20px",
            letterSpacing: "-2px",
            background: `linear-gradient(135deg, ${slide.accent}, #ec4899)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {slide.highlight}
        </h1>

        <p
          style={{
            fontSize: isMobile ? "15px" : "18px",
            color: "#888",
            marginBottom: "32px",
            maxWidth: "500px",
            margin: "0 auto 32px",
            lineHeight: 1.6,
            padding: "0 10px",
          }}
        >
          {slide.subtitle}
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
            padding: "0 20px",
          }}
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/products")}
            style={{
              padding: isMobile ? "14px 28px" : "16px 36px",
              background: `linear-gradient(135deg, ${slide.accent}, #ec4899)`,
              border: "none",
              borderRadius: "100px",
              color: "#fff",
              fontSize: isMobile ? "14px" : "16px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            {slide.cta} →
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/products")}
            style={{
              padding: isMobile ? "14px 28px" : "16px 36px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "100px",
              color: "#fff",
              fontSize: isMobile ? "14px" : "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Browse All
          </motion.button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              style={{
                width: i === currentSlide ? "24px" : "8px",
                height: "8px",
                borderRadius: "100px",
                background:
                  i === currentSlide ? slide.accent : "rgba(255,255,255,0.2)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CategorySection({ router }) {
  return (
    <div style={{ padding: "80px 40px", maxWidth: "1200px", margin: "0 auto" }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p
            style={{
              color: "#f97316",
              fontSize: "13px",
              fontWeight: "600",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            SHOP BY CATEGORY
          </p>
          <h2
            style={{
              color: "#fff",
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: "800",
              letterSpacing: "-1px",
            }}
          >
            What are you looking for?
          </h2>
        </div>
      </FadeIn>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {categories.map((cat, index) => (
          <motion.div
            key={cat.value}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            onClick={() => router.push(`/products?category=${cat.value}`)}
            style={{
              background: "#111",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px",
              padding: "32px 24px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "20px",
                background: cat.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                margin: "0 auto 16px",
              }}
            >
              {cat.icon}
            </div>
            <h3
              style={{
                color: "#fff",
                fontSize: "18px",
                fontWeight: "700",
                marginBottom: "6px",
              }}
            >
              {cat.name}
            </h3>
            <p style={{ color: "#888", fontSize: "13px" }}>Shop {cat.name} →</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FeaturedProducts({ router }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?featured=true")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div style={{ padding: "80px 40px", textAlign: "center", color: "#888" }}>
        Loading...
      </div>
    );

  if (products.length === 0)
    return (
      <div
        style={{
          padding: "80px 40px",
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "#111",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "16px",
            padding: "48px",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🛍️</div>
          <h3
            style={{
              color: "#fff",
              fontSize: "20px",
              fontWeight: "700",
              marginBottom: "8px",
            }}
          >
            No featured products yet
          </h3>
          <p style={{ color: "#888", fontSize: "14px", marginBottom: "24px" }}>
            Add products from admin and mark them featured
          </p>
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
              fontSize: "14px",
            }}
          >
            Browse All Products
          </button>
        </div>
      </div>
    );

  return (
    <div
      style={{ padding: "0 40px 80px", maxWidth: "1200px", margin: "0 auto" }}
    >
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p
          style={{
            color: "#f97316",
            fontSize: "13px",
            fontWeight: "600",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          HANDPICKED FOR YOU
        </p>
        <h2
          style={{
            color: "#fff",
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: "800",
            letterSpacing: "-1px",
          }}
        >
          Featured Products
        </h2>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "24px",
        }}
      >
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={() => router.push(`/products/${product._id}`)}
            style={{
              background: "#111",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                aspectRatio: "1",
                overflow: "hidden",
                background: "#1a1a1a",
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
            </div>
            <div style={{ padding: "16px" }}>
              <p
                style={{
                  color: "#f97316",
                  fontSize: "11px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "6px",
                }}
              >
                {product.category}
              </p>
              <h3
                style={{
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                {product.name}
              </h3>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span
                  style={{
                    color: "#f97316",
                    fontSize: "18px",
                    fontWeight: "700",
                  }}
                >
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span
                    style={{
                      color: "#555",
                      fontSize: "14px",
                      textDecoration: "line-through",
                    }}
                  >
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function BannerSection({ router }) {
  return (
    <div
      style={{ padding: "0 40px 80px", maxWidth: "1200px", margin: "0 auto" }}
    >
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(236,72,153,0.15))",
          border: "1px solid rgba(249,115,22,0.2)",
          borderRadius: "24px",
          padding: "60px 40px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: "900",
            color: "#fff",
            marginBottom: "16px",
            letterSpacing: "-1px",
          }}
        >
          Free Shipping on Orders Over{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #f97316, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            $50
          </span>
        </h2>
        <p style={{ color: "#888", fontSize: "16px", marginBottom: "32px" }}>
          Shop more, save more. Limited time offer on all categories.
        </p>
        <button
          onClick={() => router.push("/products")}
          style={{
            padding: "16px 40px",
            background: "linear-gradient(135deg, #f97316, #ec4899)",
            border: "none",
            borderRadius: "100px",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Shop Now & Save
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  return (
    <div
      style={{
        background: "#0a0a0a",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Navbar />
      <HeroSection router={router} />
      <CategorySection router={router} />
      <FeaturedProducts router={router} />
      <BannerSection router={router} />
      <Footer />
    </div>
  );
}
