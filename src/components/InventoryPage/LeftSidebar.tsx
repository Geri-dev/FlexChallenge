import { useJobsiteContext } from "../../contexts/JobsiteContext";
import { useNavigate } from "react-router-dom";
import '../../styles/LeftSidebar.css';

interface LeftSidebarProps {
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  jobsiteId?: string;
}

export const LeftSidebar = ({selectedCategories,onCategoriesChange,jobsiteId}: LeftSidebarProps) => {
  
  const { jobsites } = useJobsiteContext();
  const navigate = useNavigate();

  const jobsite = jobsiteId
    ? jobsites.find((j) => j.id === jobsiteId)
    : jobsites[0];

  if (!jobsite) {
    return (
      <div
        className="inventory-sidebar"
        style={{ width: "347px", height: "501px" }}
      >
        <div className="p-4 h-100 d-flex flex-column">
          <div className="text-center">
            <h4 className="mb-4 fw-bold text-dark fs-5">No Jobsite</h4>
            <p className="text-muted">No jobsites found</p>
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="inventory-sidebar"
      style={{ width: "347px", height: "501px" }}
    >
      <div className="p-4 h-100 d-flex flex-column">
        
        <h4 className="mb-4 fw-bold text-dark fs-6">{jobsite.name}</h4>

        {/* Categories */}
        <div className="flex-grow-1">
          <div className="d-flex flex-column categories-container">
            {jobsite.categories.map((category) => {
              const isSelected = selectedCategories.includes(category.name);
              return (
                <button
                  key={category.id}
                  className="btn category-btn position-relative text-center"
                  onClick={() => {
                    if (isSelected) {
                      onCategoriesChange(
                        selectedCategories.filter((c) => c !== category.name)
                      );
                    } else {
                      onCategoriesChange([
                        ...selectedCategories,
                        category.name,
                      ]);
                    }
                  }}
                  style={{
                    backgroundColor: isSelected ? category.color : "#F8F8FA",
                    color: isSelected ? "white" : "#212529",
                    border: "none",
                  }}
                >
                  {category.name}
                  {isSelected && (
                    <i
                      className="bi bi-check"
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "2rem",
                      }}
                    ></i>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <button
            className="btn d-flex p-0 go-back-btn"
            onClick={() => navigate("/")}
          >
            <span className="px-2 py-1 fs-6 d-flex align-items-center justify-content-center text-white">
              Go Back
            </span>
            <span
              className="px-1 py-1 d-flex align-items-center justify-content-center"
              style={{ borderLeft: "1.5px solid #0F5C97" }}
            >
              <i
                className="bi bi-arrow-left"
                style={{ fontSize: "1rem", lineHeight: 1, color: "white" }}
              ></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
