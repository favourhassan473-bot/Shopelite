import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import AdminLayout from "../../components/AdminLayout";

export default function AdminCustomers() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status]);

  return (
    <AdminLayout>
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <div style={{ fontSize: "64px", marginBottom: "20px" }}>👥</div>
        <h2
          style={{
            color: "#fff",
            fontSize: "24px",
            fontWeight: "800",
            marginBottom: "12px",
          }}
        >
          Customers
        </h2>
        <p style={{ color: "#888", fontSize: "15px", marginBottom: "32px" }}>
          No customers yet. Customer data will appear here after orders are
          placed.
        </p>
        <button
          onClick={() => router.push("/admin")}
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
          Back to Dashboard
        </button>
      </div>
    </AdminLayout>
  );
}
