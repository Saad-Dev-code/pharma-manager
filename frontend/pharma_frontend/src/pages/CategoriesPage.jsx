import { useEffect, useState } from "react";
import { getCategories } from "../api/categoriesApi";
import Button from "../components/common/Button";
import CategoriesTable from "../components/categories/CategoriesTable";
import CategorieForm from "../components/categories/CategorieForm";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>

      <div className="page-header">

        <h1>Catégories</h1>

        <Button onClick={() => setShowForm(true)}>
          + Ajouter
        </Button>

      </div>

      <CategoriesTable
        categories={categories}
        refresh={fetchCategories}
      />

      {showForm && (
        <CategorieForm
          onClose={() => setShowForm(false)}
          refresh={fetchCategories}
        />
      )}

    </div>
  );
}