import { useState } from "react";
import { useNavigate } from "react-router-dom";
import infoIcon from "./icon.jpg";
import { CreateButton } from "../CreateJobsite/CreateButton";
import { useJobsiteContext } from "../../../contexts/JobsiteContext";
import "../../../styles/Table.css";

export const Table = () => {
  
  const { jobsites } = useJobsiteContext();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredJobsites = jobsites.filter((jobsite) =>
    jobsite.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJobsiteClick = (jobsiteId: string) => {
    navigate(`/inventory?jobsiteId=${jobsiteId}`);
  };

  return (
    <div className="table-container">
      <div className="header-section bg-white">
        <div
          className="d-flex justify-content-start align-items-center p-3"
          style={{ backgroundColor: "#f8f8fa" }}
        >
          <h4 className="mb-0 fs-5">Title</h4>
        </div>

        {/* Information, Search Bar and Create button */}
        <div className="controls-container p-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="me-2">
                <img
                  src={infoIcon}
                  alt="Info"
                  style={{
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <p className="mb-0 text-muted fw-normal fs-6">
                Informative piece of text that can be used regarding this modal.
              </p>
            </div>
            <div className="d-flex align-items-center">
              <div className="input-group me-3" style={{ width: "492px" }}>
                <span className="input-group-text bg-white">
                  <i className="bi bi-search" style={{ color: "#dcdcdc" }}></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-white shadow-none"
                  placeholder="Search jobsites"
                  style={{ borderLeft: "none" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <CreateButton />
            </div>
          </div>
        </div>
      </div>

      {/* Jobsite Table Section */}
      <div className="table-section">
        <table className="table table-hover mb-0">
          <thead className="table-light text-center">
            <tr>
              <th
                scope="col"
                className="py-2 bg-white"
                style={{ width: "50%" }}
              >
                Jobsite Name
              </th>
              <th
                scope="col"
                className="py-2 bg-white"
                style={{ width: "50%" }}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredJobsites.length === 0 ? (
              <tr>
                <td colSpan={2} className="py-3 text-center text-muted">
                  {searchTerm
                    ? "No jobsites found matching your search."
                    : "No jobsites found. Create one using the Create button above."}
                </td>
              </tr>
            ) : (
              filteredJobsites.map((jobsite) => (
                <tr key={jobsite.id}>
                  <td className="py-1 text-center">
                    <button
                      className="btn btn-link text-primary text-decoration-none w-50 text-start"
                      onClick={() => handleJobsiteClick(jobsite.id)}
                      style={{ fontSize: "inherit", marginLeft:"35%" }}
                    >
                      {jobsite.name}
                    </button>
                  </td>
                  <td className="py-2 text-center">
                    <span
                      className="badge d-inline-block py-2 text-white"
                      style={{
                        width: "100px",
                        backgroundColor: jobsite.status.color,
                        fontWeight: 400,
                      }}
                    >
                      {jobsite.status.name}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
