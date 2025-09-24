import { useState } from "react";
import { useLocation } from "react-router-dom";
import { InventoryData } from "../components/InventoryPage/InventoryData";
import { LeftSidebar } from "../components/InventoryPage/LeftSidebar";
import emptyBox from './emptyBox.png';

export const InventoryPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const location = useLocation();
  const jobsiteId = new URLSearchParams(location.search).get("jobsiteId");

  return (
    <div className="inventory-page-container">
      <div className="d-flex h-100 gap-2 p-2">
        {/* Left Sidebar */}
        <LeftSidebar
          selectedCategories={selectedCategories}
          onCategoriesChange={setSelectedCategories}
          jobsiteId={jobsiteId || undefined}
        />

        <div className="inventory-main-content flex-grow-1" style={{ height: "501px" }}>
          <div className="p-4 h-100">
            {selectedCategories.length > 0 ? (
              <InventoryData
                categoryName={selectedCategories.join(", ")}
                onClearSelection={() => setSelectedCategories([])}
              />
            ) : (
              <div className="d-flex flex-column h-100">
                
                <h2 className="fw-bold mb-4 text-start fs-6">Data Grid</h2>
                
                <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
                  <div className="text-center">
                    <div className="mb-4">
                      <img src={emptyBox} />
                    </div>
                    <h4 className="mb-2 fs-6">No Service Selected</h4>
                    <p className="text-muted">
                      Please select a service on your left to proceed.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
