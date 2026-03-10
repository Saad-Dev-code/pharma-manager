import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const menu = [
    { name: "Tableau de bord", path: "/" },
    { name: "Médicaments", path: "/medicaments" },
    { name: "Ventes", path: "/ventes" },
    { name: "Catégories", path: "/categories" },
    { name: "Profil", path: "/profile" },
    { name: "Logs", path: "/logs" }
  ];
const handleLogout = async () => {
  try {
    const accessToken = localStorage.getItem("access");
    const refreshToken = localStorage.getItem("refresh");

    if (!refreshToken) {
      console.error("Refresh token manquant");
      logout();
      navigate("/login");
      return;
    }

    await fetch("http://127.0.0.1:8000/api/auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

  } catch (error) {
    console.error("Logout error", error);
  }

  logout();
  navigate("/login");
};

  return (
    <div className="sidebar">
      <h2 className="logo">PharmaSys</h2>

      {menu.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={
            location.pathname === item.path
              ? "menu-item active"
              : "menu-item"
          }
        >
          {item.name}
        </Link>
      ))}

      <button className="logout-btn" onClick={handleLogout}>
        Déconnexion
      </button>
    </div>
  );
}