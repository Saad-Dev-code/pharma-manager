import VenteForm from "../components/ventes/VenteForm";
import VenteTable from "../components/ventes/VenteTable";
import { useState } from "react";
import { exportVentesExcel } from "../utils/exportExcel";
export default function VentesPage() {
  const [showForm, setShowForm] = useState(false);
  const [ventes, setVentes] = useState([]);

  return (
    <div>
      <div className="page-header">
        <h1>Ventes</h1>

        <div className="actions">
          <button
            className="btn-secondary"
            onClick={() => exportVentesExcel(ventes)}
          >
            Export Excel
          </button>

          <button
            className="btn-primary"
            onClick={() => setShowForm(true)}
          >
            + Nouvelle vente
          </button>
        </div>
      </div>

      <VenteTable  setParentVentes={setVentes} />

      {showForm && (
        <VenteForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}