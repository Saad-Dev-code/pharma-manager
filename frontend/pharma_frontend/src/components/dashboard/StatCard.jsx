export default function StatCard({ title, value, icon, color = "#4f46e5" }) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "14px",
        padding: "24px",
        boxShadow: "0 6px 16px rgba(0,0,0,0.05)",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-4px)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "translateY(0)")
      }
    >
      <div
        style={{
          fontSize: "28px",
          backgroundColor: color + "20",
          borderRadius: "10px",
          width: "56px",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>

      <div>
        <div
          style={{
            fontSize: "14px",
            color: "#6b7280",
            marginBottom: "4px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: "24px",
            fontWeight: "600",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}