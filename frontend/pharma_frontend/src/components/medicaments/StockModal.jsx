import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import { getMedicaments, updateMedicament } from "../../api/medicamentsApi";

export default function StockModal({ onClose, refresh }) {
  const [medicaments, setMedicaments] = useState([]);
  const [selectedMed, setSelectedMed] = useState("");
  const [quantite, setQuantite] = useState("");

  useEffect(() => {
    getMedicaments().then(data => setMedicaments(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMed || !quantite) return;

    const medicament = medicaments.find(m => m.id === Number(selectedMed));
    if (!medicament) return;

    try {
      await updateMedicament(medicament.id, {
        ...medicament,
        stock_actuel: medicament.stock_actuel + Number(quantite)
      });
      refresh();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la mise à jour du stock");
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2>Ajouter au stock</h2>
      <form onSubmit={handleSubmit}>
        <label>Médicament</label>
        <select
          value={selectedMed}
          onChange={(e) => setSelectedMed(e.target.value)}
        >
          <option value="">-- Sélectionner un médicament --</option>
          {medicaments.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nom} ({m.stock_actuel} en stock)
            </option>
          ))}
        </select>

        <Input
          label="Quantité à ajouter"
          type="number"
          value={quantite}
          onChange={(e) => setQuantite(e.target.value)}
        />

        <Button type="submit">Ajouter</Button>
      </form>
    </Modal>
  );
}