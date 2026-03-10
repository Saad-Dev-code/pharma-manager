import VenteForm from "../components/ventes/VenteForm";
import VenteTable from "../components/ventes/VenteTable";
import { useState } from "react";

export default function VentesPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="page-header">
        <h1>Ventes</h1>

        <button className="btn-primary" onClick={() => setShowForm(true)}>
          + Nouvelle vente
        </button>
      </div>

      <VenteTable />

      {showForm && (
        <VenteForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}