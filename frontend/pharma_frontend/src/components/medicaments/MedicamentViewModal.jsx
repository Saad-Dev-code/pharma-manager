// src/components/medicaments/MedicamentViewModal.jsx
import Modal from "../common/Modal";
import Button from "../common/Button";

export default function MedicamentViewModal({ medicament, onClose }) {
  if (!medicament) return null;

  return (
    <Modal onClose={onClose}>
      <div style={{ padding: "1rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>{medicament.nom}</h2>

        <div style={{ display: "grid", gap: "0.5rem", gridTemplateColumns: "1fr 1fr" }}>
          <div><strong>DCI:</strong> {medicament.dci}</div>
          <div><strong>Forme:</strong> {medicament.forme}</div>
          <div><strong>Dosage:</strong> {medicament.dosage}</div>
          <div><strong>Catégorie:</strong> {medicament.categorie_nom}</div>
          <div><strong>Prix Achat:</strong> {medicament.prix_achat} DH</div>
          <div><strong>Prix Vente:</strong> {medicament.prix_vente} DH</div>
          <div><strong>Stock Actuel:</strong> {medicament.stock_actuel}</div>
          <div><strong>Stock Minimum:</strong> {medicament.stock_minimum}</div>
          <div><strong>Ordonnance Requise:</strong> {medicament.ordonnance_requise ? "Oui" : "Non"}</div>
          <div><strong>Date Expiration:</strong> {medicament.date_expiration}</div>
          <div><strong>Créé le:</strong> {new Date(medicament.date_creation).toLocaleString()}</div>
          <div><strong>Actif:</strong> {medicament.est_actif ? "Oui" : "Non"}</div>
        </div>

        <div style={{ marginTop: "1.5rem", textAlign: "right" }}>
          <Button variant="secondary" onClick={onClose}>
            Fermer
          </Button>
        </div>
      </div>
    </Modal>
  );
}