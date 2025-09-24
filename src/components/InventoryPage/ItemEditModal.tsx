import { useState } from "react";
import { SaveChanges } from "../HomePage/CreateJobsite/SaveChanges";
import { ItemDropdown } from "./ItemDropdown";
import "../../styles/ItemEditModal.css";

interface ItemEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (itemData: {
    item: string;
    quantity: string;
    description: string;
    notes: string;
  }) => void;
  initialData?: {
    item: string;
    quantity: number;
    description: string;
    notes: string;
  };
}

export const ItemEditModal = ({isOpen,onClose,onSave,initialData}: ItemEditModalProps) => {

  const [item, setItem] = useState(initialData?.item || "");
  const [quantity, setQuantity] = useState(initialData?.quantity?.toString() || "");
  const [description, setDescription] = useState(initialData?.description || "" );
  const [notes, setNotes] = useState(initialData?.notes || "");

  const handleSave = () => {
    onSave({ item, quantity, description, notes });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      tabIndex={-1}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: "868px", height: "519px" }}
      >
        <div className="modal-content rounded-3">
          <div
            className="modal-header border-bottom rounded-top"
            style={{ height: "40px", background: "#f8f8fa" }}
          >
            <h5 className="modal-title fs-6">Title</h5>
            <button
              type="button"
              className="btn-close btn d-flex align-items-center justify-content-center border-0"
              onClick={onClose}
            >
              <i className="bi bi-x" style={{ fontSize: "2rem" }}></i>
            </button>
          </div>

          <div className="modal-body">
            <div className="d-flex align-items-start" style={{ gap: "5px" }}>
              <div
                className="info-icon"
                style={{
                  background: "#1264A3",
                  width: "15px",
                  height: "15px",
                  display: "flex",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              >
                i
              </div>
              <p
                className="mb-0 text-muted fw-normal"
                style={{
                  fontSize: "0.75rem",
                  lineHeight: 1.3,
                }}
              >
                Informative piece of text that can be used regarding this modal.
              </p>
            </div>

            <div className="d-flex gap-3 mt-3">
              <div style={{ flex: 1 }}>
                <ItemDropdown
                  selectedItem={item}
                  onItemSelect={setItem}
                  placeholder="Search & Select item"
                />
              </div>
              <div style={{ flex: 1 }}>
                <div className="d-flex flex-column">
                  <label
                    htmlFor="quantity"
                    className="form-label small mb-0 fw-semibold ms-2"
                  >
                    Quantity
                  </label>
                  <input
                    id="quantity"
                    className="form-control border-0 custom-input shadow-none"
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Set Quantity"
                  />
                </div>
              </div>
            </div>

            <div className="mt-3 d-flex flex-column">
              <label
                htmlFor="description"
                className="form-label small mb-0 fw-semibold ms-2"
              >
                Description
              </label>
              <textarea
                id="description"
                className="form-control border-0 custom-input shadow-none"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Type the description..."
                style={{ resize: "none", minHeight: "114px" }}
              />
            </div>

            <div className="mt-3 d-flex flex-column">
              <label
                htmlFor="notes"
                className="form-label small mb-0 fw-semibold ms-2"
              >
                Notes
              </label>
              <textarea
                id="notes"
                className="form-control border-0 custom-input shadow-none"
                rows={5}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Type a note..."
                style={{ resize: "none", minHeight: "114px" }}
              />
            </div>
          </div>

          <div className="modal-footer border-0 px-4 py-3 mt-5">
            <SaveChanges onSave={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
};
