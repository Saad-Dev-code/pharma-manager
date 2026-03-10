import { useEffect, useState } from "react";
import { getVentes, annulerVente } from "../../api/ventesApi";
import { getMedicaments } from "../../api/medicamentsApi";
import Button from "../common/Button";
import VenteViewModal from "./VenteViewModal";

export default function VenteTable() {
  const [ventes, setVentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [medicaments, setMedicaments] = useState([]);
  const [viewing, setViewing] = useState(null); 

  const fetchVentes = async () => {
    try {
      const data = await getVentes();
      setVentes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVentes();
    getMedicaments().then(setMedicaments);

  }, []);

  const handleAnnuler = async (id) => {
    if (!window.confirm("Annuler cette vente ?")) return;

    try {
      await annulerVente(id);

      setVentes(
        ventes.map((v) =>
          v.id === id ? { ...v, statut: "annulée" } : v
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getMedName = (id) => {
  const med = medicaments.find((m) => m.id === id);
  return med ? med.nom : `#${id}`;
};

  if (loading) return <p>Chargement...</p>;

  if (!ventes.length) return <p>Aucune vente</p>;

  return (
    <div className="table-container">
      <table className="table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Produits</th>
            <th>Total</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {ventes.map((vente) => (
            <tr key={vente.id}>

              <td>{vente.id}</td>

              <td>
                {new Date(vente.date_vente).toLocaleDateString()}{" "}
                {new Date(vente.date_vente).toLocaleTimeString()}
              </td>

              <td>
                        {vente.lignes.map((ligne, index) => (
                <div key={`${vente.id}-${index}`}>
                     {getMedName(ligne.medicament)} × {ligne.quantite}
                </div>
                ))}
              </td>

              <td>{vente.total_ttc} DH</td>

              <td>
                <span
                  className={
                    vente.statut === "validée"
                      ? "badge success"
                      : "badge danger"
                  }
                >
                  {vente.statut}
                </span>
              </td>

              <td>
                    <div className="actions">
                  <Button variant="primary" onClick={() => setViewing(vente)}>
                    View
                  </Button>
                  {vente.statut === "validée" && (
                    <Button variant="danger" onClick={() => handleAnnuler(vente.id)}>
                      Annuler
                    </Button>
                  )}
                </div>
              </td>

            </tr>
          ))}

        </tbody>
      </table>

         {viewing && (
        <VenteViewModal vente={viewing} medicaments={medicaments} onClose={() => setViewing(null)} />
      )}
    </div>
  );
}