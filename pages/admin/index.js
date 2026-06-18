import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "../../components/AdminLayout";

function StatCard({ icon, label, value, color }) {
  return (
    <div
      style={{
        background: "#111",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "12px",
        padding: "24px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "12px",
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ color: "#888", fontSize: "13px", marginBottom: "4px" }}>
          {label}
        </div>
        <div style={{ color: "#fff", fontSize: "26px", fontWeight: "700" }}>
          {value}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({ products: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setStats({ products: data.products?.length || 0 });
      } catch (e) {}
      setLoading(false);
    }
    fetchStats();
  }, []);

  if (status === "loading" || loading) {
    return (
      <AdminLayout>
        <div style={{ color: "#888", fontSize: "16px" }}>⏳ Loading...</div>
      </AdminLayout>
    );
  }

  const quickActions = [
    {
      label: "Add New Product",
      icon: "➕",
      path: "/admin/add-product",
      color: "linear-gradient(135deg, #f97316, #ec4899)",
    },
    {
      label: "View All Products",
      icon: "📦",
      path: "/admin/products",
      color: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    },
    {
      label: "View Store",
      icon: "🛍️",
      path: "/",
      color: "linear-gradient(135deg, #10b981, #059669)",
    },
  ];

  return (
    <AdminLayout>
      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        <StatCard
          icon="📦"
          label="Total Products"
          value={stats.products}
          color="rgba(249,115,22,0.15)"
        />
        <StatCard
          icon="🛒"
          label="Total Orders"
          value="0"
          color="rgba(99,102,241,0.15)"
        />
        <StatCard
          icon="👥"
          label="Customers"
          value="0"
          color="rgba(16,185,129,0.15)"
        />
        <StatCard
          icon="💰"
          label="Revenue"
          value="$0"
          color="rgba(236,72,153,0.15)"
        />
      </div>

      {/* Quick Actions */}
      <div
        style={{
          background: "#111",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "12px",
          padding: "24px",
          marginBottom: "32px",
        }}
      >
        <h2
          style={{
            color: "#fff",
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: "16px",
          }}
        >
          Quick Actions
        </h2>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {quickActions.map((action) => (
            <button
              key={action.path}
              onClick={() => router.push(action.path)}
              style={{
                padding: "12px 20px",
                background: action.color,
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {action.icon} {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Welcome Banner */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(249,115,22,0.1), rgba(236,72,153,0.1))",
          border: "1px solid rgba(249,115,22,0.2)",
          borderRadius: "12px",
          padding: "24px",
        }}
      >
        <h2
          style={{
            color: "#fff",
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "8px",
          }}
        >
          🎉 Welcome to ShopElite Admin
        </h2>
        <p style={{ color: "#888", fontSize: "14px", lineHeight: 1.6 }}>
          Your store is live and ready. Add products, manage inventory and grow
          your business. You currently have{" "}
          <strong style={{ color: "#f97316" }}>{stats.products}</strong> product
          {stats.products !== 1 ? "s" : ""} in your store.
        </p>
      </div>
    </AdminLayout>
  );
}
