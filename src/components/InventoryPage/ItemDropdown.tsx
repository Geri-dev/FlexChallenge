import { useState, useRef, useEffect } from "react";
import categoriesData from "../../data/categoriesdata.json";

interface Item {
  id: string;
  nr: number;
  item: string;
  quantity: number;
  description: string;
  notes: string;
}

interface ItemDropdownProps {
  selectedItem: string;
  onItemSelect: (item: string) => void;
  placeholder?: string;
}

export const ItemDropdown = ({ selectedItem, onItemSelect, placeholder = "Search & Select item"}: ItemDropdownProps) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const allItems: Item[] = Object.values(categoriesData).flat();


  const filteredItems = allItems.filter(item =>
    item.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemSelect = (item: Item) => {
    onItemSelect(item.item);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  return (
    <div className="position-relative" ref={dropdownRef}>
      <div className="d-flex flex-column">
        <label
          htmlFor="itemSelect"
          className="form-label small mb-0 fw-semibold ms-2"
        >
          Item
        </label>
        <div className="position-relative">
          <input
            id="itemSelect"
            className="form-control border-0 custom-input shadow-none"
            type="text"
            value={isOpen ? searchTerm : selectedItem}
            onChange={handleInputChange}
            onClick={handleInputClick}
            placeholder={placeholder}
            autoComplete="off"
          />
          <div className="position-absolute end-0 top-50 translate-middle-y pe-3">
            <i className="bi bi-caret-down-fill dropdown-icon"></i>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="position-absolute w-100 bg-white border rounded shadow-sm"
          style={{
            top: "100%",
            left: 0,
            zIndex: 1000,
            maxHeight: "200px",
            overflowY: "auto"
          }}
        >
           {filteredItems.length > 0 ? (
             filteredItems.map((item) => (
               <div
                 key={item.id}
                 className="px-2 py-2 cursor-pointer hover-bg-light"
                 onClick={() => handleItemSelect(item)}
                 style={{
                   cursor: "pointer",
                   borderBottom: "1px solid #f0f0f0"
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.backgroundColor = "#f8f9fa";
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.backgroundColor = "white";
                 }}
               >
                 <div className="fw-semibold">{item.item}</div>
               </div>
             ))
           ) : (
             <div className="px-3 py-2 text-muted">No items found</div>
           )}
        </div>
      )}
    </div>
  );
};
