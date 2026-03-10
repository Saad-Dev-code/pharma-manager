import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Logs() {

if (localStorage.getItem("is_admin") !== "true") {
  return <p>Accès refusé</p>;
}

  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 15;

  useEffect(() => {
    const fetchLogs = async () => {
      const token = localStorage.getItem("access");

      const res = await fetch("http://127.0.0.1:8000/api/auth/logs/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setLogs(data);
    };

    fetchLogs();
  }, []);

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentLogs = logs.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(logs.length / rowsPerPage);

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(logs);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Logs");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(file, "logs.xlsx");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Logs de connexion</h2>

        <button style={styles.exportBtn} onClick={exportExcel}>
          Export Excel
        </button>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Utilisateur</th>
              <th style={styles.th}>Login</th>
              <th style={styles.th}>Logout</th>
            </tr>
          </thead>

          <tbody>
            {currentLogs.map((log) => (
              <tr key={log.id}>
                <td style={styles.td}>{log.username}</td>
                <td style={styles.td}>{log.login_time}</td>
                <td style={styles.td}>
                  {log.logout_time || (
                    <span style={styles.active}>Session active</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={styles.pagination}>
        <button
          style={styles.pageBtn}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        <span>
          Page {currentPage} / {totalPages}
        </span>

        <button
          style={styles.pageBtn}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Inter, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  exportBtn: {
    padding: "10px 16px",
    border: "none",
    background: "#06720c",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },

  tableWrapper: {
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    padding: "20px",
  },

  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 10px",
  },

  th: {
    textAlign: "left",
    padding: "12px 20px",
    color: "#666",
  },

  td: {
    padding: "14px 20px",
    background: "#f9fafb",
  },

  active: {
    color: "#16a34a",
    fontWeight: "500",
  },

  pagination: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    alignItems: "center",
  },

  pageBtn: {
    padding: "8px 14px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    cursor: "pointer",
  },
};