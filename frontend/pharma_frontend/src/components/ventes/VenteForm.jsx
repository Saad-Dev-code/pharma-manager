import { useState, useEffect } from "react";
import { getMedicaments } from "../../api/medicamentsApi";
import { useVentes } from "../../hooks/useVentes";

export default function VenteForm({ onClose }) {
  const { addVente, refresh } = useVentes();
  const [medicaments, setMedicaments] = useState([]);
  const [lignes, setLignes] = useState([]);
  const [notes, setNotes] = useState("");

  // Charger les médicaments au montage
  useEffect(() => {
    async function fetch() {
      const data = await getMedicaments();
      setMedicaments(data);
    }
    fetch();

    // Ajouter une ligne vide par défaut
    setLignes([{ medicament: "", quantite: 1 }]);
  }, []);

  const addLigne = () => {
    setLignes([...lignes, { medicament: "", quantite: 1 }]);
  };

  const handleChange = (index, field, value) => {
    const copy = [...lignes];
    copy[index][field] = value;
    setLignes(copy);
  };

const submit = async () => {
  if (!lignes.length) {
    alert("Ajoutez au moins un médicament");
    return;
  }

  // Vérifier que toutes les lignes ont un médicament choisi
  for (let ligne of lignes) {
    if (!ligne.medicament) {
      alert("Sélectionnez un médicament pour chaque ligne !");
      return;
    }
  }

  // Construire payload pour l'API
  const payloadLignes = lignes.map((ligne) => {
    const med = medicaments.find((m) => m.id === Number(ligne.medicament));
    return {
      medicament: Number(ligne.medicament),
      quantite: Number(ligne.quantite),
      prix_unitaire: med ? Number(med.prix_vente) : 0,
      sous_total: med ? Number(med.prix_vente) * Number(ligne.quantite) : 0
    };
  });

  // Calculer total_ttc avant envoi
  const total_ttc = payloadLignes.reduce((sum, l) => sum + l.sous_total, 0);

  // Générer référence unique automatiquement
  const reference = `ref-${Date.now()}`;

  try {
    await addVente({
      reference,
      statut: "validée", // statut par défaut
      lignes_vente: payloadLignes,
      total_ttc,  
      notes,        // <--- nécessaire pour éviter l'erreur 400
    });

    refresh(); // mettre à jour le tableau des ventes
    onClose();
  } catch (err) {
    console.error(err.response?.data || err);
    alert("Erreur lors de l'ajout de la vente !");
  }
};

  return (
    <div className="modal-overlay">
      <div className="modal large">
        <h2>Nouvelle vente</h2>

        {lignes.map((ligne, index) => (
          <div key={index} className="vente-ligne">
            <select
              value={ligne.medicament}
              onChange={(e) =>
                handleChange(index, "medicament", e.target.value)
              }
            >
              <option value="">Médicament</option>
              {medicaments.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nom} ({m.stock_actuel} en stock, {m.prix_vente} DH)
                </option>
              ))}
            </select>

            <div className="vente-notes">
              <label>Notes (facultatif)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ajouter une note pour cette vente"
                rows={3}
                style={{ width: "100%", padding: "0.5rem" }}
              />
            </div>

            <input
              type="number"
              min={1}
              value={ligne.quantite}
              onChange={(e) =>
                handleChange(index, "quantite", Number(e.target.value))
              }
            />
          </div>
        ))}

           <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
      <button className="btn-danger" onClick={onClose}>
        Fermer
      </button>
      <button className="btn-primary" onClick={submit}>
        Valider Vente
      </button>
      <button className="btn-secondary" onClick={addLigne}>
        Ajouter ligne
      </button>
    </div>

      </div>
    </div>
  );
}