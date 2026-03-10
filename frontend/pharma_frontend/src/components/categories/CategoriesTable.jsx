import { useState } from "react";
import Button from "../common/Button";
import CategorieForm from "./CategorieForm";
import ConfirmationModal from "../common/ConfirmationModal";
import { deleteCategorie } from "../../api/categoriesApi";
import { getMedicaments, updateMedicament, deleteMedicament } from "../../api/medicamentsApi";

export default function CategoriesTable({ categories, refresh }) {
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Gestion de la suppression
  const handleDelete = async (deleteMeds) => {
    if (!deleteTarget) return;

    try {
      const meds = await getMedicaments();
      const relatedMeds = meds.filter((m) => m.categorie === deleteTarget.id);

      if (deleteMeds) {
        // Supprimer tous les médicaments liés
        for (const med of relatedMeds) {
          await deleteMedicament(med.id);
        }
      } else {
        // Mettre la catégorie à null pour les médicaments liés
        for (const med of relatedMeds) {
          await updateMedicament(med.id, { ...med, categorie: null });
        }
      }

      // Supprimer la catégorie
      await deleteCategorie(deleteTarget.id);

      refresh();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la suppression de la catégorie ou des médicaments liés");
    } finally {
      setDeleteTarget(null);
    }
  };

  if (!categories.length) return <p>Aucune catégorie</p>;

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((c) => (
            <tr key={c.id}>
              <td>{c.nom}</td>
              <td>{c.description}</td>
              <td>
                <div className="actions">
                  <Button variant="secondary" onClick={() => setEditing(c)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => setDeleteTarget(c)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <CategorieForm
          categorie={editing}
          onClose={() => setEditing(null)}
          refresh={refresh}
        />
      )}

      {deleteTarget && (
        <ConfirmationModal
          title={`Supprimer "${deleteTarget.nom}" ?`}
          message="Cette catégorie est liée à des médicaments. Que voulez-vous faire ?"
          onCancel={() => setDeleteTarget(null)}
          onConfirmDeleteAll={() => handleDelete(true)}
          onConfirmDeleteCategoryOnly={() => handleDelete(false)}
        />
      )}
    </>
  );
}