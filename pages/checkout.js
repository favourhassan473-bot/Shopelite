import { useState } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useWindowSize from "../hooks/useWindowSize";

export default function Checkout() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();
  const { isMobile } = useWindowSize();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "Nigeria",
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const shipping = cartTotal > 50 ? 0 : 9.99;
  const tax = cartTotal * 0.075;
  const finalTotal = cartTotal + shipping + tax;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    const id = "ORD-" + Date.now().toString().slice(-8);
    setOrderId(id);
    setOrderPlaced(true);
    clearCart();
    setLoading(false);
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
    borderRadius: "16px",
    padding: isMobile ? "20px" : "28px",
    marginBottom: "20px",
  };

  const cardTitleStyle = {
    color: "#fff",
    fontSize: "16px",
    fontWeight: "700",
    marginBottom: "20px",
    paddingBottom: "14px",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  };

  const rowStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
    gap: "16px",
  };

  // Empty cart
  if (cart.length === 0 && !orderPlaced) {
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
            padding: isMobile ? "60px 20px" : "100px 40px",
          }}
        >
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>🛒</div>
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
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/products")}
            style={{
              padding: "14px 32px",
              background: "linear-gradient(135deg, #f97316, #ec4899)",
              border: "none",
              borderRadius: "100px",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Shop Now
          </motion.button>
        </motion.div>
        <Footer />
      </div>
    );
  }

  // Order success
  if (orderPlaced) {
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          style={{
            textAlign: "center",
            padding: isMobile ? "60px 20px" : "80px 40px",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #10b981, #059669)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
              margin: "0 auto 24px",
            }}
          >
            ✓
          </motion.div>
          <h1
            style={{
              color: "#fff",
              fontSize: isMobile ? "28px" : "36px",
              fontWeight: "900",
              marginBottom: "12px",
              letterSpacing: "-1px",
            }}
          >
            Order Placed! 🎉
          </h1>
          <p style={{ color: "#888", fontSize: "16px", marginBottom: "8px" }}>
            Thank you,{" "}
            <strong style={{ color: "#fff" }}>{form.firstName}</strong>! Your
            order has been received.
          </p>
          <div
            style={{
              background: "rgba(249,115,22,0.1)",
              border: "1px solid rgba(249,115,22,0.2)",
              borderRadius: "12px",
              padding: "20px",
              margin: "24px 0",
            }}
          >
            <p style={{ color: "#888", fontSize: "13px", marginBottom: "4px" }}>
              Order ID
            </p>
            <p
              style={{
                color: "#f97316",
                fontSize: "22px",
                fontWeight: "800",
                letterSpacing: "2px",
              }}
            >
              {orderId}
            </p>
          </div>
          <p style={{ color: "#888", fontSize: "14px", marginBottom: "32px" }}>
            A confirmation will be sent to{" "}
            <strong style={{ color: "#fff" }}>{form.email}</strong>
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/")}
              style={{
                padding: "14px 28px",
                background: "linear-gradient(135deg, #f97316, #ec4899)",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Continue Shopping
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/products")}
              style={{
                padding: "14px 28px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                color: "#fff",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Browse Products
            </motion.button>
          </div>
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
          maxWidth: "1100px",
          margin: "0 auto",
          padding: isMobile ? "24px 16px" : "48px 40px",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            color: "#fff",
            fontSize: isMobile ? "28px" : "36px",
            fontWeight: "900",
            letterSpacing: "-1px",
            marginBottom: "32px",
          }}
        >
          Checkout
        </motion.h1>

        {/* Step Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          {[
            { num: 1, label: isMobile ? "Ship" : "Shipping" },
            { num: 2, label: isMobile ? "Pay" : "Payment" },
            { num: 3, label: isMobile ? "Review" : "Review" },
          ].map((s, i) => (
            <div
              key={s.num}
              style={{
                display: "flex",
                alignItems: "center",
                flex: i < 2 ? 1 : 0,
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <motion.div
                  animate={{
                    background:
                      step > s.num
                        ? "#34d399"
                        : step === s.num
                          ? "#f97316"
                          : "rgba(255,255,255,0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    color: step >= s.num ? "#fff" : "#555",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: "700",
                    flexShrink: 0,
                  }}
                >
                  {step > s.num ? "✓" : s.num}
                </motion.div>
                <span
                  style={{
                    color:
                      step === s.num
                        ? "#f97316"
                        : step > s.num
                          ? "#34d399"
                          : "#555",
                    fontSize: isMobile ? "12px" : "14px",
                    fontWeight: step === s.num ? "600" : "400",
                    whiteSpace: "nowrap",
                  }}
                >
                  {s.label}
                </span>
              </div>
              {i < 2 && (
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background: "rgba(255,255,255,0.1)",
                    margin: "0 8px",
                  }}
                />
              )}
            </div>
          ))}
        </motion.div>

        <div
          style={{
            display: isMobile ? "flex" : "grid",
            flexDirection: "column",
            gridTemplateColumns: "1fr 360px",
            gap: isMobile ? "20px" : "32px",
            alignItems: "start",
          }}
        >
          <div>
            <AnimatePresence mode="wait">
              {/* Step 1 - Shipping */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  style={cardStyle}
                >
                  <div style={cardTitleStyle}>📦 Shipping Information</div>

                  <div style={rowStyle}>
                    <div>
                      <label style={labelStyle}>First Name *</label>
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Last Name *</label>
                      <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <label style={labelStyle}>Email Address *</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    style={inputStyle}
                  />

                  <label style={labelStyle}>Phone Number</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+234 800 000 0000"
                    style={inputStyle}
                  />

                  <label style={labelStyle}>Street Address *</label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                    style={inputStyle}
                  />

                  <div style={rowStyle}>
                    <div>
                      <label style={labelStyle}>City *</label>
                      <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="Lagos"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>State</label>
                      <input
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        placeholder="Lagos State"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div style={rowStyle}>
                    <div>
                      <label style={labelStyle}>ZIP Code</label>
                      <input
                        name="zip"
                        value={form.zip}
                        onChange={handleChange}
                        placeholder="100001"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Country</label>
                      <select
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        style={{ ...inputStyle, background: "#1a1a1a" }}
                      >
                        <option>Nigeria</option>
                        <option>Ghana</option>
                        <option>Kenya</option>
                        <option>South Africa</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Canada</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (
                        !form.firstName ||
                        !form.email ||
                        !form.address ||
                        !form.city
                      ) {
                        alert("Please fill in all required fields");
                        return;
                      }
                      setStep(2);
                    }}
                    style={{
                      width: "100%",
                      padding: "14px",
                      background: "linear-gradient(135deg, #f97316, #ec4899)",
                      border: "none",
                      borderRadius: "10px",
                      color: "#fff",
                      fontSize: "15px",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    Continue to Payment →
                  </motion.button>
                </motion.div>
              )}

              {/* Step 2 - Payment */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  style={cardStyle}
                >
                  <div style={cardTitleStyle}>💳 Payment Method</div>

                  {[
                    {
                      value: "card",
                      label: "💳 Credit / Debit Card",
                      desc: "Visa, Mastercard, Verve",
                    },
                    {
                      value: "transfer",
                      label: "🏦 Bank Transfer",
                      desc: "Direct bank transfer",
                    },
                    {
                      value: "cod",
                      label: "💵 Cash on Delivery",
                      desc: "Pay when you receive",
                    },
                  ].map((opt) => (
                    <div
                      key={opt.value}
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          paymentMethod: opt.value,
                        }))
                      }
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "14px 16px",
                        borderRadius: "10px",
                        border: `1px solid ${form.paymentMethod === opt.value ? "#f97316" : "rgba(255,255,255,0.1)"}`,
                        background:
                          form.paymentMethod === opt.value
                            ? "rgba(249,115,22,0.1)"
                            : "transparent",
                        cursor: "pointer",
                        marginBottom: "10px",
                        transition: "all 0.2s",
                      }}
                    >
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          border: `2px solid ${form.paymentMethod === opt.value ? "#f97316" : "#555"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {form.paymentMethod === opt.value && (
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: "#f97316",
                            }}
                          />
                        )}
                      </div>
                      <div>
                        <p
                          style={{
                            color:
                              form.paymentMethod === opt.value
                                ? "#f97316"
                                : "#888",
                            fontSize: "14px",
                            fontWeight:
                              form.paymentMethod === opt.value ? "600" : "400",
                          }}
                        >
                          {opt.label}
                        </p>
                        <p style={{ color: "#555", fontSize: "12px" }}>
                          {opt.desc}
                        </p>
                      </div>
                    </div>
                  ))}

                  {form.paymentMethod === "card" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        marginTop: "20px",
                        paddingTop: "20px",
                        borderTop: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <label style={labelStyle}>Card Number</label>
                      <input
                        name="cardNumber"
                        value={form.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        style={inputStyle}
                      />
                      <label style={labelStyle}>Cardholder Name</label>
                      <input
                        name="cardName"
                        value={form.cardName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        style={inputStyle}
                      />
                      <div style={rowStyle}>
                        <div>
                          <label style={labelStyle}>Expiry Date</label>
                          <input
                            name="cardExpiry"
                            value={form.cardExpiry}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            maxLength={5}
                            style={inputStyle}
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>CVV</label>
                          <input
                            name="cardCvv"
                            value={form.cardCvv}
                            onChange={handleChange}
                            placeholder="123"
                            maxLength={4}
                            type="password"
                            style={inputStyle}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {form.paymentMethod === "transfer" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        marginTop: "16px",
                        padding: "16px",
                        background: "rgba(99,102,241,0.1)",
                        border: "1px solid rgba(99,102,241,0.2)",
                        borderRadius: "10px",
                      }}
                    >
                      <p
                        style={{
                          color: "#818cf8",
                          fontSize: "14px",
                          fontWeight: "600",
                          marginBottom: "8px",
                        }}
                      >
                        Bank Transfer Details
                      </p>
                      <p
                        style={{
                          color: "#888",
                          fontSize: "13px",
                          lineHeight: 1.8,
                        }}
                      >
                        Bank: First Bank Nigeria
                        <br />
                        Account: 0123456789
                        <br />
                        Name: ShopElite Ltd
                      </p>
                    </motion.div>
                  )}

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(3)}
                    style={{
                      width: "100%",
                      padding: "14px",
                      background: "linear-gradient(135deg, #f97316, #ec4899)",
                      border: "none",
                      borderRadius: "10px",
                      color: "#fff",
                      fontSize: "15px",
                      fontWeight: "700",
                      cursor: "pointer",
                      marginTop: "16px",
                    }}
                  >
                    Review Order →
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(1)}
                    style={{
                      width: "100%",
                      padding: "13px",
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px",
                      color: "#888",
                      fontSize: "14px",
                      cursor: "pointer",
                      marginTop: "10px",
                    }}
                  >
                    ← Back to Shipping
                  </motion.button>
                </motion.div>
              )}

              {/* Step 3 - Review */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <div style={cardStyle}>
                    <div style={cardTitleStyle}>📋 Order Items</div>
                    {cart.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          gap: "14px",
                          alignItems: "center",
                          marginBottom: "16px",
                          paddingBottom: "16px",
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        <div
                          style={{
                            width: "56px",
                            height: "56px",
                            borderRadius: "8px",
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
                                fontSize: "20px",
                              }}
                            >
                              📦
                            </div>
                          )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p
                            style={{
                              color: "#fff",
                              fontSize: "14px",
                              fontWeight: "600",
                              marginBottom: "2px",
                            }}
                          >
                            {item.name}
                          </p>
                          <p style={{ color: "#888", fontSize: "12px" }}>
                            Qty: {item.quantity}
                            {item.size && ` · Size: ${item.size}`}
                            {item.color && ` · Color: ${item.color}`}
                          </p>
                        </div>
                        <span
                          style={{
                            color: "#f97316",
                            fontWeight: "700",
                            flexShrink: 0,
                          }}
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={cardStyle}>
                    <div style={cardTitleStyle}>📍 Shipping To</div>
                    <p
                      style={{
                        color: "#ccc",
                        fontSize: "14px",
                        lineHeight: 1.8,
                      }}
                    >
                      {form.firstName} {form.lastName}
                      <br />
                      {form.address}
                      <br />
                      {form.city}
                      {form.state ? `, ${form.state}` : ""} {form.zip}
                      <br />
                      {form.country}
                      <br />
                      📧 {form.email}
                    </p>
                  </div>

                  <div style={cardStyle}>
                    <div style={cardTitleStyle}>💳 Payment</div>
                    <p style={{ color: "#ccc", fontSize: "14px" }}>
                      {form.paymentMethod === "card" &&
                        `💳 Card ending in ${form.cardNumber.slice(-4) || "****"}`}
                      {form.paymentMethod === "transfer" && "🏦 Bank Transfer"}
                      {form.paymentMethod === "cod" && "💵 Cash on Delivery"}
                    </p>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    style={{
                      width: "100%",
                      padding: "16px",
                      background: loading
                        ? "#333"
                        : "linear-gradient(135deg, #f97316, #ec4899)",
                      border: "none",
                      borderRadius: "10px",
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "700",
                      cursor: loading ? "not-allowed" : "pointer",
                      marginBottom: "12px",
                    }}
                  >
                    {loading ? "⏳ Placing Order..." : "🚀 Place Order"}
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(2)}
                    style={{
                      width: "100%",
                      padding: "13px",
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px",
                      color: "#888",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    ← Back to Payment
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
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
                fontSize: "16px",
                fontWeight: "700",
                marginBottom: "20px",
                paddingBottom: "14px",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              Order Summary
            </h2>

            <div style={{ marginBottom: "16px" }}>
              {cart.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ color: "#888", fontSize: "13px" }}>
                    {item.name} × {item.quantity}
                  </span>
                  <span style={{ color: "#fff", fontSize: "13px" }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.07)",
                paddingTop: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <span style={{ color: "#888", fontSize: "14px" }}>
                  Subtotal
                </span>
                <span style={{ color: "#fff", fontSize: "14px" }}>
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <span style={{ color: "#888", fontSize: "14px" }}>
                  Shipping
                </span>
                <span
                  style={{
                    color: shipping === 0 ? "#34d399" : "#fff",
                    fontSize: "14px",
                  }}
                >
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              >
                <span style={{ color: "#888", fontSize: "14px" }}>
                  Tax (7.5%)
                </span>
                <span style={{ color: "#fff", fontSize: "14px" }}>
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  paddingTop: "14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
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
                    fontSize: "22px",
                    fontWeight: "800",
                  }}
                >
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div
              style={{
                marginTop: "20px",
                paddingTop: "16px",
                borderTop: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {["🔒 SSL Secured", "↩️ 30-Day Returns", "🚚 Fast Delivery"].map(
                (badge) => (
                  <div
                    key={badge}
                    style={{
                      color: "#666",
                      fontSize: "12px",
                      marginBottom: "6px",
                    }}
                  >
                    {badge}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
