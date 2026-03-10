import { useEffect, useState } from "react";
import { getVentes, createVente } from "../api/ventesApi";

export function useVentes() {
  const [ventes, setVentes] = useState([]);

  const fetchVentes = async () => {
    const data = await getVentes();
    setVentes(data);
  };

  const addVente = async (vente) => {
    const newVente = await createVente(vente);
    setVentes((prev) => [newVente, ...prev]);
  };

  useEffect(() => {
    fetchVentes();
  }, []);

  return {
    ventes,
    addVente,
    refresh: fetchVentes
  };
}