import { useState } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useWindowSize from "../hooks/useWindowSize";

export default function Cart() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } =
    useCart();
  const { isMobile } = useWindowSize();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoMsg, setPromoMsg] = useState("");

  const validCodes = { SAVE10: 10, ELITE20: 20, WELCOME15: 15 };

  const handlePromo = () => {
    const code = promoCode.toUpperCase();
    if (validCodes[code]) {
      setDiscount(validCodes[code]);
      setPromoMsg(`✅ Code applied! ${validCodes[code]}% off`);
    } else {
      setDiscount(0);
      setPromoMsg("❌ Invalid promo code");
    }
  };

  const discountAmount = (cartTotal * discount) / 100;
  const shipping = cartTotal > 50 ? 0 : 9.99;
  const finalTotal = cartTotal - discountAmount + shipping;

  if (cart.length === 0) {
    return (
      <div
        style={{
          background: "#0a0a0a",
          minHeight: "100vh",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <Navbar />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            textAlign: "center",
            padding: isMobile ? "60px 20px" : "80px 40px",
          }}
        >
          <div style={{ fontSize: "80px", marginBottom: "24px" }}>🛒</div>
          <h2
            style={{
              color: "#fff",
              fontSize: isMobile ? "24px" : "28px",
              fontWeight: "800",
              marginBottom: "12px",
            }}
          >
            Your cart is empty
          </h2>
          <p style={{ color: "#666", fontSize: "16px", marginBottom: "32px" }}>
            Looks like you haven't added anything yet.
          </p>
          <motion.button
            whileTap={{ scale: 0.97 }}
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
            Start Shopping →
          </motion.button>
        </motion.div>
        <Footer />
      </div>
    );
  }

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
        <h1
          style={{
            color: "#fff",
            fontSize: isMobile ? "28px" : "40px",
            fontWeight: "900",
            letterSpacing: "-1px",
            marginBottom: "8px",
          }}
        >
          Shopping Cart
        </h1>
        <p style={{ color: "#666", fontSize: "15px", marginBottom: "16px" }}>
          {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
        </p>

        <button
          onClick={clearCart}
          style={{
            background: "none",
            border: "none",
            color: "#ef4444",
            fontSize: "14px",
            cursor: "pointer",
            marginBottom: "24px",
          }}
        >
          🗑️ Clear all items
        </button>

        <div
          style={{
            display: isMobile ? "flex" : "grid",
            flexDirection: "column",
            gridTemplateColumns: "1fr 360px",
            gap: isMobile ? "20px" : "32px",
            alignItems: "start",
          }}
        >
          {/* Cart Items */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <AnimatePresence>
              {cart.map((item, index) => (
                <motion.div
                  key={`${item._id}-${item.size}-${item.color}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: "#111",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "16px",
                    padding: isMobile ? "14px" : "20px",
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    gap: "16px",
                    alignItems: isMobile ? "flex-start" : "center",
                  }}
                >
                  {/* Top Row for Mobile */}
                  <div
                    style={{
                      display: "flex",
                      gap: "14px",
                      width: "100%",
                      alignItems: "flex-start",
                    }}
                  >
                    {/* Image */}
                    <div
                      style={{
                        width: isMobile ? "80px" : "90px",
                        height: isMobile ? "80px" : "90px",
                        borderRadius: "10px",
                        overflow: "hidden",
                        background: "#1a1a1a",
                        flexShrink: 0,
                      }}
                    >
                      {item.images?.[0] ? (
                        <img
                          src={item.images[0]}
                          alt={item.name}
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
                            fontSize: "28px",
                          }}
                        >
                          📦
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
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
                        {item.category}
                      </p>
                      <h3
                        style={{
                          color: "#fff",
                          fontSize: isMobile ? "14px" : "16px",
                          fontWeight: "600",
                          marginBottom: "4px",
                          lineHeight: 1.3,
                        }}
                      >
                        {item.name}
                      </h3>
                      {(item.size || item.color) && (
                        <p
                          style={{
                            color: "#666",
                            fontSize: "12px",
                            marginBottom: "8px",
                          }}
                        >
                          {item.size && `Size: ${item.size}`}
                          {item.size && item.color && " · "}
                          {item.color && `Color: ${item.color}`}
                        </p>
                      )}

                      {/* Price on mobile shown here */}
                      {isMobile && (
                        <p
                          style={{
                            color: "#f97316",
                            fontSize: "18px",
                            fontWeight: "700",
                          }}
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      )}
                    </div>

                    {/* Price on desktop */}
                    {!isMobile && (
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <p
                          style={{
                            color: "#f97316",
                            fontSize: "20px",
                            fontWeight: "700",
                            marginBottom: "8px",
                          }}
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            removeFromCart(item._id, item.size, item.color)
                          }
                          style={{
                            background: "none",
                            border: "none",
                            color: "#ef4444",
                            fontSize: "13px",
                            cursor: "pointer",
                          }}
                        >
                          🗑️ Remove
                        </motion.button>
                      </div>
                    )}
                  </div>

                  {/* Bottom Row — Qty + Remove */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            item.quantity - 1,
                            item.size,
                            item.color,
                          )
                        }
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "6px",
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#fff",
                          fontSize: "16px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        −
                      </motion.button>
                      <span
                        style={{
                          color: "#fff",
                          fontWeight: "700",
                          fontSize: "16px",
                          minWidth: "24px",
                          textAlign: "center",
                        }}
                      >
                        {item.quantity}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            item.quantity + 1,
                            item.size,
                            item.color,
                          )
                        }
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "6px",
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#fff",
                          fontSize: "16px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        +
                      </motion.button>
                      <span style={{ color: "#666", fontSize: "12px" }}>
                        ${item.price} each
                      </span>
                    </div>

                    {/* Remove on mobile */}
                    {isMobile && (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          removeFromCart(item._id, item.size, item.color)
                        }
                        style={{
                          background: "none",
                          border: "none",
                          color: "#ef4444",
                          fontSize: "13px",
                          cursor: "pointer",
                        }}
                      >
                        🗑️ Remove
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div
            style={{
              background: "#111",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px",
              padding: "24px",
              position: isMobile ? "relative" : "sticky",
              top: isMobile ? "auto" : "90px",
              width: "100%",
            }}
          >
            <h2
              style={{
                color: "#fff",
                fontSize: "18px",
                fontWeight: "700",
                marginBottom: "24px",
                paddingBottom: "16px",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              Order Summary
            </h2>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
                marginBottom: "12px",
              }}
            >
              <span style={{ color: "#888" }}>Subtotal</span>
              <span style={{ color: "#fff" }}>${cartTotal.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  marginBottom: "12px",
                }}
              >
                <span style={{ color: "#34d399" }}>Discount ({discount}%)</span>
                <span style={{ color: "#34d399" }}>
                  -${discountAmount.toFixed(2)}
                </span>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
                marginBottom: "12px",
              }}
            >
              <span style={{ color: "#888" }}>Shipping</span>
              <span
                style={
                  shipping === 0
                    ? { color: "#34d399", fontWeight: "600" }
                    : { color: "#fff" }
                }
              >
                {shipping === 0 ? "🎉 Free!" : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            {cartTotal <= 50 && (
              <p
                style={{
                  color: "#888",
                  fontSize: "12px",
                  marginBottom: "12px",
                }}
              >
                Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
              </p>
            )}

            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.07)",
                margin: "16px 0",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <span
                style={{ color: "#fff", fontSize: "16px", fontWeight: "700" }}
              >
                Total
              </span>
              <span
                style={{
                  color: "#f97316",
                  fontSize: "24px",
                  fontWeight: "800",
                }}
              >
                ${finalTotal.toFixed(2)}
              </span>
            </div>

            {/* Promo Code */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
              <input
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "13px",
                  outline: "none",
                }}
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button
                onClick={handlePromo}
                style={{
                  padding: "10px 14px",
                  background: "rgba(249,115,22,0.15)",
                  border: "1px solid rgba(249,115,22,0.3)",
                  borderRadius: "8px",
                  color: "#f97316",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Apply
              </button>
            </div>

            {promoMsg && (
              <p
                style={{
                  fontSize: "12px",
                  color: promoMsg.startsWith("✅") ? "#34d399" : "#f87171",
                  marginBottom: "8px",
                }}
              >
                {promoMsg}
              </p>
            )}

            <p
              style={{ color: "#555", fontSize: "11px", marginBottom: "16px" }}
            >
              Try: SAVE10 · ELITE20 · WELCOME15
            </p>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/checkout")}
              style={{
                width: "100%",
                padding: "16px",
                background: "linear-gradient(135deg, #f97316, #ec4899)",
                border: "none",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
                marginBottom: "12px",
              }}
            >
              Proceed to Checkout →
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/products")}
              style={{
                width: "100%",
                padding: "14px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#888",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Continue Shopping
            </motion.button>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "16px",
                marginTop: "20px",
                paddingTop: "16px",
                borderTop: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {["🔒 Secure", "↩️ Returns", "🚚 Fast"].map((badge) => (
                <span key={badge} style={{ color: "#555", fontSize: "12px" }}>
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
