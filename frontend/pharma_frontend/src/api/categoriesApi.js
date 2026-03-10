import api from "./axiosConfig";

export const getCategories = async () => {
  const res = await api.get("categories/");
  return res.data;
};

export const createCategorie = async (data) => {
  const res = await api.post("categories/", data);
  return res.data;
};

// Update a category
export const updateCategorie = async (id, data) => {
  const res = await api.put(`categories/${id}/`, data);
  return res.data;
};

// Delete a category
export const deleteCategorie = async (id) => {
  const res = await api.delete(`categories/${id}/`);
  return res.data;
};