import api from "./axiosConfig";

export const getMedicaments = async () => {
  const res = await api.get("medicaments/");
  return res.data;
};

export const getMedicament = async (id) => {
  const res = await api.get(`medicaments/${id}/`);
  return res.data;
};

export const createMedicament = async (data) => {
  const res = await api.post("medicaments/", data);
  return res.data;
};

export const updateMedicament = async (id, data) => {
  const res = await api.put(`medicaments/${id}/`, data);
  return res.data;
};

export const deleteMedicament = async (id) => {
  const res = await api.delete(`medicaments/${id}/`);
  return res.data;
};

export const getAlertesStock = async () => {
  const res = await api.get("medicaments/alertes/");
  return res.data;
};