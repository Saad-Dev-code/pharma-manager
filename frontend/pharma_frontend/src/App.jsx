import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import MedicamentsPage from "./pages/MedicamentsPage";
import VentesPage from "./pages/VentesPage";
import CategoriesPage from "./pages/CategoriesPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/medicaments" element={<MedicamentsPage />} />
          <Route path="/ventes" element={<VentesPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;