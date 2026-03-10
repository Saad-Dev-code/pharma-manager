import api from "./axiosConfig";

export const getVentes = async () => {
  const res = await api.get("ventes/");
  return res.data;
};

export const createVente = async (data) => {
  const res = await api.post("ventes/", data);
  return res.data;
};

export const annulerVente = async (id) => {
  const res = await api.post(`ventes/${id}/annuler`);
  return res.data;
};