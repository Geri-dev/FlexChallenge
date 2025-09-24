import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CloseModal } from "./CancelChanges";
import { SaveChanges } from "./SaveChanges";
import { CategoryDropdown } from "./CategoryDropdown";
import infoIcon from "../JobsiteTable/icon.jpg";
import "../../../styles/CreateButton.css";
import { StatusDropdown } from "./StatusDropdown";
import { useJobsiteContext } from "../../../contexts/JobsiteContext";

interface Category {
  id: string;
  name: string;
  color: string;
}

interface Status {
  id: string;
  name: string;
  color: string;
}

export const CreateButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [jobsiteName, setJobsiteName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  const { addJobsite } = useJobsiteContext();
  const navigate = useNavigate();

  const handleOpen = () => setShowModal(true);

  const handleClose = () => {
    setShowModal(false);
    setJobsiteName("");
    setSelectedCategories([]);
    setSelectedStatus(null);
  };

  const handleSave = () => {
    if (jobsiteName.trim() && selectedStatus) {
      const newJobsiteId = addJobsite({
        name: jobsiteName.trim(),
        categories: selectedCategories,
        status: selectedStatus,
      });
      handleClose();
      navigate(`/inventory?jobsiteId=${newJobsiteId}`);
    }
  };

  // Clicking Create button will show the modal with other components
  
  return (
    
    <>

      <button className="btn create-btn d-flex p-0" onClick={handleOpen}>
        <span className="px-4 py-1 fs-14 d-flex align-items-center justify-content-center">
          Create
        </span>
        <span
          className="px-2 py-1 d-flex align-items-center justify-content-center"
          style={{ borderLeft: "1.5px solid #68C142" }}
        >
          <i
            className="bi bi-plus"
            style={{ fontSize: "1.5rem", lineHeight: 1 }}
          ></i>
        </span>
      </button>

      

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex={-1}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: "868px", height: "388px" }}
          >
            <div className="modal-content">
              <div
                className="modal-header"
                style={{ background: "#f8f8fa", height: "40px" }}
              >
                <h5 className="modal-title fs-6">Title</h5>
                <button
                  type="button"
                  className="btn-close btn d-flex align-items-center justify-content-center border-0"
                  onClick={handleClose}
                >
                  <i className="bi bi-x" style={{ fontSize: "2rem" }}></i>
                </button>
              </div>

              <div className="modal-body">
                <div className="d-flex align-tems-start" style={{ gap: "5px" }}>
                  <img
                    src={infoIcon}
                    alt="Info"
                    style={{
                      width: "15px",
                      height: "15px",
                      display: "flex",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                  <p
                    className="mb-0 text-muted fw-normal"
                    style={{ fontSize: "0.75rem", lineHeight: 1.3 }}
                  >
                    Informative piece of text that can be used regarding this
                    modal.
                  </p>
                </div>

                <div
                  className="mt-2"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label
                    htmlFor="jobsiteName"
                    className="form-label small mb-0 fw-semibold ms-2"
                  >
                    Name
                  </label>
                  <input
                    id="jobsiteName"
                    className="form-control border-0 custom-input shadow-none"
                    type="text"
                    value={jobsiteName}
                    onChange={(e) => setJobsiteName(e.target.value)}
                    placeholder="Type the jobsite name"
                  />
                </div>

                <div className="d-flex gap-1 mt-2">
                  <CategoryDropdown
                    selectedCategories={selectedCategories}
                    onCategoriesChange={setSelectedCategories}
                  />
                  <StatusDropdown
                    selectedStatus={selectedStatus}
                    onStatusChange={setSelectedStatus}
                  />
                </div>
              </div>

              <div className="modal-footer border-0 mt-5">
                <CloseModal onClose={handleClose} />
                <SaveChanges onSave={handleSave} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
