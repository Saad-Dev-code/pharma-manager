import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportVentesExcel(ventes) {
  if (!ventes || !ventes.length) {
    alert("Aucune vente à exporter");
    return;
  }

  const data = [];

  ventes.forEach((vente) => {
    vente.lignes.forEach((ligne) => {
      data.push({
        Reference: vente.reference,
        Date: new Date(vente.date_vente).toLocaleString(),
        Medicament: ligne.medicament_nom,
        Quantite: ligne.quantite,
        Prix_Unitaire: ligne.prix_unitaire,
        Sous_Total: ligne.sous_total,
        Total_Vente: vente.total_ttc,
        Notes: vente.notes || ""
      });
    });
  });

  const worksheet = XLSX.utils.json_to_sheet(data);

  worksheet["!cols"] = [
    { wch: 15 },
    { wch: 20 },
    { wch: 25 },
    { wch: 10 },
    { wch: 12 },
    { wch: 12 },
    { wch: 12 },
    { wch: 30 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Ventes");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(file, `ventes_${Date.now()}.xlsx`);
}