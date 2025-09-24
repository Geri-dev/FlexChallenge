import '../../../styles/SaveChanges.css'

interface SaveModalProps {
  onSave: () => void;
}

export const SaveChanges = ({ onSave }: SaveModalProps) => {
  return (
    <>
      <button className="btn save-btn d-flex p-0" onClick={onSave}>
        <span className="px-2 py-0 fs-6 d-flex align-items-center justify-content-center">
          Save Changes
        </span>
        <span
          className="px-1 py-1 d-flex align-items-center justify-content-center"
          style={{ borderLeft: "1.5px solid #68C142" }}
        >
          <i
            className="bi bi-check fs-5"
            style={{ fontSize: "1.5rem", lineHeight: 1 }}
          ></i>
        </span>
      </button>

    </>
  )
}
