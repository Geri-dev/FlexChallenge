import '../../../styles/CancelChanges.css'

interface CloseModalProps {
  onClose: () => void;
}

export const CloseModal = ({ onClose }: CloseModalProps) => {
  return (
    <>
      <button className="btn cancel-btn d-flex p-0" onClick={onClose}>
        <span className="px-2 py-0 fs-6 d-flex align-items-center justify-content-center">
          Cancel Changes
        </span>
        <span
          className="px-1 py-1 d-flex align-items-center justify-content-center"
          style={{ borderLeft: "1.5px solid #EB4345" }}
        >
          <i
            className="bi bi-x fs-5"
            style={{ fontSize: "1.5rem", lineHeight: 1 }}
          ></i>
        </span>
      </button>

    </>
  )
}
