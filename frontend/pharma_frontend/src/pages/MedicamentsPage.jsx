import { useState } from "react";
import MedicamentTable from "../components/medicaments/MedicamentTable";
import MedicamentForm from "../components/medicaments/MedicamentForm";
import { useMedicaments } from "../hooks/useMedicaments";
import StockModal from "../components/medicaments/StockModal";
export default function MedicamentsPage() {
  const { medicaments, loading , refresh  } = useMedicaments();
  const [showForm, setShowForm] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);

  return (
    <div>
      <div className="page-header">
        <h1>Médicaments</h1>

        <button className="btn-primary" onClick={() => setShowForm(true)}>
          + Ajouter
        </button>

        <button className="btn-secondary" onClick={() => setShowStockModal(true)}>
        + Ajouter au stock
      </button>
      </div>
    

      <MedicamentTable medicaments={medicaments} loading={loading} refresh={refresh} />

      {showForm && (
        <MedicamentForm onClose={() => setShowForm(false)} refresh={refresh} />
      )}

      {showStockModal && (
      <StockModal onClose={() => setShowStockModal(false)} refresh={refresh} />
      )}
    </div>
  );
}