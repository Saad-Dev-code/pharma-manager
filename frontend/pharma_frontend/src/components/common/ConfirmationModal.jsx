import React from "react";
import "../../styles/global.css";

export default function ConfirmationModal({
  title,
  message,
  onCancel,
  onConfirmDeleteAll,
  onConfirmDeleteCategoryOnly
}) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn" onClick={onCancel}>
            Annuler
          </button>
          <button className="btn btn-danger" onClick={onConfirmDeleteCategoryOnly}>
            Supprimer catégorie seulement
          </button>
          <button className="btn btn-danger" onClick={onConfirmDeleteAll}>
            Supprimer catégorie + médicaments
          </button>
        </div>
      </div>
    </div>
  );
}