// src/components/ventes/VenteViewModal.jsx
import Modal from "../common/Modal";
import Button from "../common/Button";

export default function VenteViewModal({ vente, medicaments, onClose }) {
  if (!vente) return null;

  const getMedName = (id) => {
    const med = medicaments.find((m) => m.id === id);
    return med ? med.nom : `#${id}`;
  };

  return (
    <Modal onClose={onClose}>
      <div style={{ padding: "1rem", maxWidth: "500px" }}>
        <h2 style={{ marginBottom: "1rem" }}>Détails de la vente</h2>

        <div style={{ display: "grid", gap: "0.5rem" }}>
          <div><strong>Référence:</strong> {vente.reference}</div>
          <div>
            <strong>Date:</strong>{" "}
            {new Date(vente.date_vente).toLocaleDateString()}{" "}
            {new Date(vente.date_vente).toLocaleTimeString()}
          </div>
          <div><strong>Statut:</strong> {vente.statut}</div>
          {vente.notes && <div><strong>Notes:</strong> {vente.notes}</div>}

          <div style={{ marginTop: "1rem" }}>
            <strong>Produits:</strong>
            <ul style={{ paddingLeft: "1rem" }}>
              {vente.lignes.map((ligne, index) => (
                <li key={index}>
                  {getMedName(ligne.medicament)} × {ligne.quantite} — {ligne.prix_unitaire} DH / unité — Sous-total: {ligne.sous_total} DH
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: "0.5rem", fontWeight: "bold" }}>
            Total TTC: {vente.total_ttc} DH
          </div>
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