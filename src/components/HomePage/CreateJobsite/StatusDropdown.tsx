import { useState, useRef, useEffect } from "react";
import "../../../styles/StatusDropdown.css";

interface Status {
  id: string;
  name: string;
  color: string;
}

const statuses: Status[] = [
  { id: "1", name: "Completed", color: "#7AC14D" },
  { id: "2", name: "In Progress", color: "#ECDE7C" },
  { id: "3", name: "On Hold", color: "#FE4C4A" },
];

interface StatusDropdownProps {
  selectedStatus: Status | null;
  onStatusChange: (status: Status | null) => void;
}

export const StatusDropdown = ({ selectedStatus, onStatusChange }: StatusDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredStatus, setHoveredStatus] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleStatusSelect = (status: Status) => {
    onStatusChange(status);
    setIsOpen(false);
  };

  return (
    <div
      className="d-flex flex-column flex-grow-1 position-relative"
      ref={dropdownRef}
    >
      <label
        htmlFor="statusDropdown"
        className="form-label small mb-0 fw-semibold ms-2"
      >
        Status
      </label>

      
      <div className="position-relative" style={{width:"263px"}}>
        <div
          className="custom-dropdown-input"
          onClick={toggleDropdown}
        >
          {selectedStatus ? (
            <div className="d-flex align-items-center gap-2">
              <div
                className="status-dot"
                style={{ backgroundColor: selectedStatus.color }}
              ></div>
              <span>{selectedStatus.name}</span>
            </div>
          ) : (
            <span className="placeholder-text">Select one</span>
          )}

          <i className="bi bi-caret-down-fill dropdown-icon"></i>
        </div>

        {/* Status Dropdown */}
        {isOpen && (
          <div className="custom-dropdown-menu">
            {statuses.map((status, index) => {
              const isSelected = selectedStatus?.id === status.id;
              const isHovered = hoveredStatus === status.id;

              return (
                <div key={status.id}>
                  <div
                    className="custom-dropdown-item px-2 py-1"
                    onClick={() => handleStatusSelect(status)}
                    onMouseEnter={() => setHoveredStatus(status.id)}
                    onMouseLeave={() => setHoveredStatus(null)}
                    style={{
                      backgroundColor: isHovered
                        ? status.color
                        : isSelected
                        ? status.color
                        : "transparent",
                      color:
                        isHovered || isSelected ? "white" : "#212529",
                    }}
                  >
                    <span>{status.name}</span>
                  </div>
                  {index < statuses.length - 1 && (
                    <div className="custom-dropdown-divider"></div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
