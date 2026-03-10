import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import { getCategories } from "../../api/categoriesApi";
import {
  createMedicament,
  updateMedicament
} from "../../api/medicamentsApi";

export default function MedicamentForm({
  onClose,
  refresh,
  medicament
}) {
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    nom: "",
    dci: "",
    categorie: "",
    forme: "",
    dosage: "",
    prix_achat: "",
    prix_vente: "",
    stock_actuel: "",
    stock_minimum: "",
    date_expiration: "",
    ordonnance_requise: false
  });

  useEffect(() => {
    getCategories().then(setCategories);

    if (medicament) {
      setForm(medicament);
    }
  }, [medicament]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

const submit = async (e) => {
  e.preventDefault();

  const payload = {
    ...form,
    categorie: Number(form.categorie),
    prix_achat: Number(form.prix_achat),
    prix_vente: Number(form.prix_vente),
    stock_actuel: Number(form.stock_actuel),
    stock_minimum: Number(form.stock_minimum)
  };

  try {

    if (medicament) {
      await updateMedicament(medicament.id, payload);
    } else {
      await createMedicament(payload);
    }

    refresh();
    onClose();

  } catch (error) {
    console.log(error.response?.data);
  }
};

  return (
    <Modal onClose={onClose}>

      <h2>
        {medicament ? "Modifier Médicament" : "Ajouter Médicament"}
      </h2>

      <form onSubmit={submit}>

        <Input
          label="Nom commercial"
          name="nom"
          value={form.nom}
          onChange={handleChange}
        />
        <Input
          label="DCI"
          name="dci"
          value={form.dci}
          onChange={handleChange}
          />

        <div className="checkbox">
          <label>Ordonnance requise</label>

          <input
            type="checkbox"
            checked={form.ordonnance_requise}
            onChange={(e) =>
              setForm({
                ...form,
                ordonnance_requise: e.target.checked
              })
            }
          />
        </div>
          <Input
          label="Forme"
          name="forme"
          value={form.forme}
          onChange={handleChange}
          />
            <Input
            label="Dosage"
            name="dosage"
            value={form.dosage}
            onChange={handleChange}
            />          

        <select
          name="categorie"
          value={form.categorie}
          onChange={handleChange}
        >
          <option>Catégorie</option>

          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nom}
            </option>
          ))}
        </select>

        <Input
          label="Prix Achat"
          name="prix_achat"
          value={form.prix_achat}
          onChange={handleChange}
        />

        <Input
          label="Prix Vente"
          name="prix_vente"
          value={form.prix_vente}
          onChange={handleChange}
        />

        <Input
          label="Stock"
          name="stock_actuel"
          value={form.stock_actuel}
          onChange={handleChange}
        />

        <Input
          label="Stock Minimum"
          name="stock_minimum"
          value={form.stock_minimum}
          onChange={handleChange}
        />

        <Input
          type="date"
          name="date_expiration"
          value={form.date_expiration}
          onChange={handleChange}
        />

        <Button type="submit">
          {medicament ? "Modifier" : "Ajouter"}
        </Button>

      </form>

    </Modal>
  );
}