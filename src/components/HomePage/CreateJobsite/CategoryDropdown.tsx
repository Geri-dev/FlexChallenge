import { useState, useRef, useEffect } from "react";
import "../../../styles/CategoryDropdown.css";

interface Category {
  id: string;
  name: string;
  color: string;
}

const categories: Category[] = [
  { id: "1", name: "Design", color: "#67AA3C" },
  { id: "2", name: "Logo & Branding", color: "#EFD652" },
  { id: "3", name: "Marketing", color: "#9640BE" },
];

interface CategoryDropdownProps {
  selectedCategories: Category[];
  onCategoriesChange: (categories: Category[]) => void;
}

export const CategoryDropdown = ({selectedCategories,onCategoriesChange}: CategoryDropdownProps) => {

  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
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

  const handleCategorySelect = (category: Category) => {
    const isSelected = selectedCategories.some((cat) => cat.id === category.id);

    if (isSelected) {
      const newSelectedCategories = selectedCategories.filter(
        (cat) => cat.id !== category.id
      );
      onCategoriesChange(newSelectedCategories);
      
      if (newSelectedCategories.length === 0) {
        setIsOpen(false);
      }
      
    } else {
      const newSelectedCategories = [...selectedCategories, category];
      onCategoriesChange(newSelectedCategories);

      if (newSelectedCategories.length === 3) {
        setIsOpen(false);
      }
      
    }
  };

  const removeCategory = (categoryId: string) => {
    onCategoriesChange(
      selectedCategories.filter((cat) => cat.id !== categoryId)
    );
  };

  const isCategorySelected = (categoryId: string) => {
    return selectedCategories.some((cat) => cat.id === categoryId);
  };

  return (
    <div
      className="d-flex flex-column flex-grow-1 position-relative"
      ref={dropdownRef}
    >
      <label
        htmlFor="categoryDropdown"
        className="form-label small mb-0 fw-semibold ms-2"
      >
        Category Included
      </label>

      {/*Dropdown */}
      <div className="position-relative" style={{ width: "564px" }}>
        <div
          className="d-flex align-items-center justify-content-between rounded px-3 py-1"
          style={{
            backgroundColor: "#F5F5F7",
            cursor: "pointer",
            height: "32px",
            position: "relative",
          }}
          onClick={toggleDropdown}
        >
          <span style={{ color: "#dcdcdcff" }}>Select</span>
          <i
            className="bi bi-caret-down-fill"
            style={{
              fontSize: "0.75rem",
              color: "#000000ff",
              transition: "transform 0.2s ease",
            }}
          ></i>
        </div>

        {isOpen && (
          <div className="custom-dropdown-menu">
            {categories.map((category, index) => {
              const isSelected = isCategorySelected(category.id);
              const isHovered = hoveredCategory === category.id;

              return (
                <div key={category.id}>
                  <div
                    className="custom-dropdown-item"
                    onClick={() => handleCategorySelect(category)}
                    onMouseEnter={() => setHoveredCategory(category.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    style={{
                      backgroundColor:
                        (isHovered || isSelected) && isOpen
                          ? category.color
                          : "#ffffff",
                      color: isHovered || isSelected ? "white" : "#212529",
                    }}
                  >
                    <span>{category.name}</span>
                    {isSelected && (
                      <i className="bi bi-check" style={{ color: "white" }}></i>
                    )}
                  </div>
                  {index < categories.length - 1 && (
                    <div className="custom-dropdown-divider"></div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      
      {selectedCategories.length > 0 && (
        <div
          className="d-flex flex-wrap gap-2 mt-2 position-relative"
          style={{ zIndex: 1 }}
        >
          {selectedCategories.map((category) => (
            <div
              key={category.id}
              className="d-flex align-items-center bg-white px-2 py-1 gap-2 small"
            >
              <div
                className="rounded-circle flex-shrink-0"
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: category.color,
                }}
              ></div>
              <span>{category.name}</span>

              <button
                type="button"
                className="btn p-0 d-flex align-items-center justify-content-center rounded-0"
                style={{
                  backgroundColor: "#FE4C4A",
                  color: "#fff",
                  width: "16px",
                  height: "16px",
                  transition: "background-color 0.2s ease",
                }}
                onClick={() => removeCategory(category.id)}
              >
                <i
                  className="bi bi-x"
                  style={{ fontSize: "1rem", lineHeight: 1 }}
                ></i>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
