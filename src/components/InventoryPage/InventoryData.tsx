import { useState, useEffect } from "react";
import categoriesData from "../../data/categoriesdata.json";
import { ItemEditModal } from "./ItemEditModal";
import '../../styles/InventoryData.css';

interface InventoryItem {
  id: string;
  nr: number;
  item: string;
  quantity: number;
  description: string;
  notes: string;
}

interface InventoryDataProps {
  categoryName: string;
  onClearSelection?: () => void;
}


// Get category data from a static JSON file

const getCategoryData = (categoryName: string): InventoryItem[] => {
  const categories = categoryName.split(",").map((cat) => cat.trim());

  let allItems: InventoryItem[] = [];
  let globalIndex = 1;

  categories.forEach((category) => {
    const categoryData =
      categoriesData[category as keyof typeof categoriesData] || [];

    const categoryItems = categoryData.map((item) => ({
      ...item,
      id: `${category}-${item.id}`,
      nr: globalIndex++,
    }));

    allItems = [...allItems, ...categoryItems];
  });

  return allItems;
};

export const InventoryData = ({categoryName,onClearSelection}: InventoryDataProps) => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);

  // Update inventory data when category selection changes
  useEffect(() => {
    const categoryData = getCategoryData(categoryName);
    setInventoryData(categoryData);
  }, [categoryName]);

  const filteredData = inventoryData.filter((item) =>
    item.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (item: InventoryItem) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const handleSaveItem = (itemData: {
    item: string;
    quantity: string;
    description: string;
    notes: string;
  }) => {
    if (editingItem) {
      const updatedData = inventoryData.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              item: itemData.item,
              quantity: parseInt(itemData.quantity) || 0,
              description: itemData.description,
              notes: itemData.notes,
            }
          : item
      );
      setInventoryData(updatedData);
    }
  };

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-12 h-100 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h2 className="mb-0 fs-5">{categoryName}</h2>
            </div>
            <div className="d-flex align-items-center">
              <div
                className="input-group search-input-group me-2"
                style={{ width: "490px" }}
              >
                <span className="input-group-text bg-white">
                  <i className="bi bi-search" style={{ color: "#dcdcdc" }}></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-white"
                  placeholder="Search items"
                  style={{ borderLeft: "none" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {onClearSelection && (
                <button
                  className="btn  d-flex align-items-center justify-content-center border-0"
                  onClick={onClearSelection}
                  style={{ width: "35px", height: "35px" }}
                  title="Clear selection"
                >
                  <i className="bi bi-x" style={{ fontSize: "2rem" }}></i>
                </button>
              )}
            </div>
          </div>

          <div
            className="card h-100 border rounded-3 flex-grow-1 d-flex flex-column"
            style={{ maxHeight: "400px" }}
          >
            <div className="card-body p-0 h-100">
              <div
                className="table-container-scroll h-100 flex-grow-1 overflow-auto overflow-x-hidden"
                style={{ maxHeight: "400px", minHeight: 0 }}
              >
                <div className="table-responsive rounded shadow-sm mb-3">
                  <table
                    className="table table-striped table-hover mb-0 w-100"
                    style={{ tableLayout: "fixed" }}
                  >
                    <thead className="table-light sticky-top">
                      <tr>
                        <th className="px-3 py-2 text-start" style={{ width: "5%" }}>Nr.</th>
                        <th className="px-3 py-2 text-start" style={{ width: "5%" }}>Item</th>
                        <th className="px-3 py-2 text-center" style={{ width: "5%" }}>Quantity</th>
                        <th className="px-3 py-2 text-start" style={{ width: "15%" }}>Description</th>
                        <th className="px-3 py-2 text-start" style={{ width: "15%" }}>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((item) => (
                        <tr
                          key={item.id}
                          onClick={() => handleOpenModal(item)}
                          className="table-row-clickable"
                        >
                          <td className="px-3 py-2 text-start">{item.nr}</td>
                          <td className="px-3 py-2 text-start">{item.item}</td>
                          <td className="px-3 py-2 text-center">{item.quantity}</td>
                          <td className="px-3 py-2 text-start">{item.description}</td>
                          <td className="px-3 py-2 text-start">{item.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && editingItem && (
        <ItemEditModal
          isOpen={showModal}
          onClose={handleCloseModal}
          onSave={handleSaveItem}
          initialData={editingItem}
        />
      )}
    </div>
  );
};
