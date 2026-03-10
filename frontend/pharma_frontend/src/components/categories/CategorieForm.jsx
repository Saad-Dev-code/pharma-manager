import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import { createCategorie, updateCategorie } from "../../api/categoriesApi";

export default function CategorieForm({ categorie, onClose, refresh }) {
  const [form, setForm] = useState({
    nom: "",
    description: ""
  });

  useEffect(() => {
    if (categorie) setForm(categorie);
  }, [categorie]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (categorie) {
        await updateCategorie(categorie.id, form);
      } else {
        await createCategorie(form);
      }
      refresh();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la sauvegarde");
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2>{categorie ? "Modifier Catégorie" : "Ajouter Catégorie"}</h2>
      <form onSubmit={submit}>
        <Input label="Nom" name="nom" value={form.nom} onChange={handleChange} />
        <Input
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <Button type="submit">{categorie ? "Modifier" : "Ajouter"}</Button>
      </form>
    </Modal>
  );
}