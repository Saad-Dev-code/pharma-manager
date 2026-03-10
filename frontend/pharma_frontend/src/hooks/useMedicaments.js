import { useEffect, useState } from "react";
import {
  getMedicaments,
  createMedicament,
  deleteMedicament
} from "../api/medicamentsApi";

export function useMedicaments() {
  const [medicaments, setMedicaments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMedicaments = async () => {
    try {
      const data = await getMedicaments();
      setMedicaments(data);
    } finally {
      setLoading(false);
    }
  };

  const addMedicament = async (med) => {
    const newMed = await createMedicament(med);
    setMedicaments([...medicaments, newMed]);
  };

  const removeMedicament = async (id) => {
    await deleteMedicament(id);
    setMedicaments(medicaments.filter((m) => m.id !== id));
  };

  useEffect(() => {
    fetchMedicaments();
  }, []);

  return {
    medicaments,
    loading,
    addMedicament,
    removeMedicament,
    refresh: fetchMedicaments
  };
}