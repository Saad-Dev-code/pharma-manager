import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Tableau de bord", path: "/" },
    { name: "Médicaments", path: "/medicaments" },
    { name: "Ventes", path: "/ventes" },
    { name: "Catégories", path: "/categories" }
  ];

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
    </div>
  );
}