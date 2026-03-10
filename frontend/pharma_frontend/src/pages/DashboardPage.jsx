// src/pages/DashboardPage.jsx
import { useEffect, useState, useMemo } from "react";
import StatCard from "../components/dashboard/StatCard";
import { useMedicaments } from "../hooks/useMedicaments";
import { useVentes } from "../hooks/useVentes";
import { getAlertesStock } from "../api/medicamentsApi";
import { useCategories } from "../hooks/useCategories";
// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function DashboardPage() {
  const { medicaments } = useMedicaments();
  const { ventes } = useVentes();
  const { categories } = useCategories();

  const [alertes, setAlertes] = useState([]);

  useEffect(() => {
    async function fetchAlertes() {
      const data = await getAlertesStock();
      setAlertes(data);
    }
    fetchAlertes();
  }, []);

  const totalMedicaments = medicaments.length;
  const totalVentes = ventes.length;
  const totalAlertes = alertes.length;
  const totalCategories = categories.length;

  /*** Données graphiques ***/
  const ventesParJour = useMemo(() => {
    const map = {};
    ventes.forEach((v) => {
      const date = new Date(v.date_vente).toLocaleDateString();
      map[date] = (map[date] || 0) + Number(v.total_ttc);
    });
    return {
      labels: Object.keys(map),
      datasets: [
        {
          label: "Total Ventes (DH)",
          data: Object.values(map),
          borderColor: "#10b981",
          backgroundColor: "#10b98133",
          tension: 0.3,
          fill: true,
        },
      ],
    };
  }, [ventes]);

  const stocksCritiques = useMemo(() => {
    const crit = medicaments
      .filter((m) => m.stock_actuel < m.stock_minimum)
      .map((m) => ({ nom: m.nom, stock: m.stock_actuel }));
    return {
      labels: crit.map((c) => c.nom),
      datasets: [
        {
          label: "Stock actuel",
          data: crit.map((c) => c.stock),
          backgroundColor: "#ef4444",
        },
      ],
    };
  }, [medicaments]);

  return (
  <div
    style={{
      padding: "32px",
      maxWidth: "1400px",
      margin: "0 auto",
      fontFamily: "sans-serif",
    }}
  >
    <h1
      style={{
        marginBottom: "32px",
        fontSize: "28px",
        fontWeight: "600",
      }}
    >
      Tableau de bord
    </h1>

    {/* KPI Cards */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "24px",
        marginBottom: "32px",
      }}
    >
      <StatCard title="Médicaments" value={totalMedicaments} icon="💊" color="#4f46e5" />
      <StatCard title="Ventes" value={totalVentes} icon="🛒" color="#10b981" />
      <StatCard title="Catégories" value={totalCategories} icon="📂" color="#f59e0b" />
      <StatCard title="Alertes" value={totalAlertes} icon="⚠️" color="#ef4444" />
    </div>

    {/* Alertes */}
    {alertes.length > 0 && (
      <div
        style={{
          marginBottom: "32px",
          padding: "20px 24px",
          borderRadius: "10px",
          backgroundColor: "#fff3f2",
          border: "1px solid #fca5a5",
        }}
      >
        <h3 style={{ marginBottom: "12px", color: "#b91c1c" }}>
          ⚠ Alertes Stock
        </h3>

        {alertes.map((a) => (
          <p key={a.id} style={{ marginBottom: "6px" }}>
            <strong>{a.nom}</strong> — Stock actuel: {a.stock_actuel}
          </p>
        ))}
      </div>
    )}

    {/* Graphiques */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "32px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
        }}
      >
        <h4 style={{ marginBottom: "20px", fontSize: "16px" }}>
          Ventes par jour
        </h4>
        <Line data={ventesParJour} />
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
        }}
      >
        <h4 style={{ marginBottom: "20px", fontSize: "16px" }}>
          Stocks critiques
        </h4>

        {stocksCritiques.labels.length ? (
          <Bar data={stocksCritiques} />
        ) : (
          <p style={{ color: "#6b7280" }}>
            Pas de stocks critiques
          </p>
        )}
      </div>
    </div>
  </div>
);
}