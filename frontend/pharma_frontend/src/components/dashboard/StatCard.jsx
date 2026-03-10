export default function StatCard({ title, value, icon, color = "#4f46e5" }) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "1.5rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        transition: "transform 0.2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div
        style={{
          fontSize: "2.5rem",
          backgroundColor: color + "33",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontSize: "1.2rem", color: "#6b7280" }}>{title}</div>
        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{value}</div>
      </div>
    </div>
  );
}