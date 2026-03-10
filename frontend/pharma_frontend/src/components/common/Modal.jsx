export default function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay">

      <div className="modal">

        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {children}

      </div>

    </div>
  );
}