import Sidebar from "./Sidebar";
import "../../styles/global.css";

export default function Layout({ children }) {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">{children}</div>
    </div>
  );
}

