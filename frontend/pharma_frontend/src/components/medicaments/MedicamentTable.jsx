import { useState, useMemo } from "react";
import Button from "../common/Button";
import MedicamentForm from "./MedicamentForm";
import { deleteMedicament } from "../../api/medicamentsApi";
import { getMedicaments } from "../../api/medicamentsApi";
import MedicamentViewModal from "./MedicamentViewModal"; // <-- import

export default function MedicamentTable({ medicaments, refresh }) {
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [viewing, setViewing] = useState(null); 


  const remove = async (id) => {
    if (!window.confirm("Supprimer ?")) return;
    await deleteMedicament(id);
    refresh();
  };

  // Filtrer les médicaments selon la recherche
  const filteredMeds = useMemo(() => {
    if (!search) return medicaments;
    const lower = search.toLowerCase();
    return medicaments.filter(
      (m) =>
        m.nom.toLowerCase().includes(lower) ||
        m.dci.toLowerCase().includes(lower) ||
        m.forme.toLowerCase().includes(lower) ||
        m.categorie_nom.toLowerCase().includes(lower)
    );
  }, [medicaments, search]);

  // Pagination
  const totalPages = Math.ceil(filteredMeds.length / itemsPerPage);
  const paginatedMeds = filteredMeds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="search-pagination">
        <input
          className="search-input"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              &lt;
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              &gt;
            </button>
          </div>
        )}
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>DCI</th>
            <th>Forme</th>
            <th>Dosage</th>
            <th>Catégorie</th>
            <th>Prix</th>
            <th>Stock</th>
            <th>Stock Minimum</th>
            <th>Ordonnance Requise</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginatedMeds.map((m) => (
            <tr
              key={m.id}
              style={{
                backgroundColor:
                  m.stock_actuel < m.stock_minimum ? "#f8d7da" : "transparent",
              }}
            >
              <td>{m.nom}</td>
              <td>{m.dci}</td>
              <td>{m.forme}</td>
              <td>{m.dosage}</td>
              <td>{m.categorie_nom}</td>
              <td>{m.prix_vente} DH</td>
              <td>{m.stock_actuel}</td>
              <td>{m.stock_minimum}</td>
              <td>{m.ordonnance_requise ? "Oui" : "Non"}</td>
              <td>
                <div className="actions">
                  <Button variant="primary" onClick={() => setViewing(m)}>
                    View
                  </Button>
                  <Button variant="secondary" onClick={() => setEditing(m)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => remove(m.id)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <MedicamentForm
          medicament={editing}
          onClose={() => setEditing(null)}
          refresh={refresh}
        />
      )}

      {viewing && <MedicamentViewModal medicament={viewing} onClose={() => setViewing(null)} />}

    </>
  );
}