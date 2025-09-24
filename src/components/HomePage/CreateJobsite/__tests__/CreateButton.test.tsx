import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { CreateButton } from "../CreateButton";
import { JobsiteProvider } from "../../../../contexts/JobsiteContext";


jest.mock("../CategoryDropdown", () => ({
  CategoryDropdown: ({ selectedCategories, onCategoriesChange }: any) => (
    <div data-testid="category-dropdown">
      <span>Categories: {selectedCategories.length}</span>
      <button
        onClick={() =>
          onCategoriesChange([
            { id: "1", name: "Test Category", color: "#000" },
          ])
        }
      >
        Add Category
      </button>
    </div>
  ),
}));

jest.mock("../StatusDropdown", () => ({
  StatusDropdown: ({ selectedStatus, onStatusChange }: any) => (
    <div data-testid="status-dropdown">
      <span>Status: {selectedStatus?.name || "None"}</span>
      <button
        onClick={() =>
          onStatusChange({ id: "1", name: "Active", color: "#28a745" })
        }
      >
        Set Status
      </button>
    </div>
  ),
}));

jest.mock("../SaveChanges", () => ({
  SaveChanges: ({ onSave }: any) => (
    <button data-testid="save-button" onClick={onSave}>
      Save
    </button>
  ),
}));

jest.mock("../CancelChanges", () => ({
  CloseModal: ({ onClose }: any) => (
    <button data-testid="cancel-button" onClick={onClose}>
      Cancel
    </button>
  ),
}));


const renderWithProviders = (component: React.ReactElement) =>
  render(
    <BrowserRouter>
      <JobsiteProvider>{component}</JobsiteProvider>
    </BrowserRouter>
  );


const openModal = async () => {
  const createButton = screen.getByRole("button", { name: /create/i });
  await userEvent.click(createButton);
};

describe("CreateButton Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the create button", () => {
    renderWithProviders(<CreateButton />);
    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  describe("Modal behavior", () => {
    beforeEach(async () => {
      renderWithProviders(<CreateButton />);
      await openModal();
    });

    it("renders modal inputs, dropdowns, and footer", () => {
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Type the jobsite name")
      ).toBeInTheDocument();

      expect(screen.getByTestId("category-dropdown")).toBeInTheDocument();
      expect(screen.getByTestId("status-dropdown")).toBeInTheDocument();

      expect(screen.getByTestId("save-button")).toBeInTheDocument();
      expect(screen.getByTestId("cancel-button")).toBeInTheDocument();
    });

    it("closes modal via cancel button", async () => {
      await userEvent.click(screen.getByTestId("cancel-button"));
      expect(screen.queryByText("Title")).not.toBeInTheDocument();
    });

    it("closes modal via close icon", async () => {
      const closeIcon = screen.getByText("×").closest("button")!;
      await userEvent.click(closeIcon);
      expect(screen.queryByText("Title")).not.toBeInTheDocument();
    });

    it("resets form after closing", async () => {
      const nameInput = screen.getByPlaceholderText("Type the jobsite name");
      await userEvent.type(nameInput, "Test Jobsite");

      await userEvent.click(screen.getByTestId("cancel-button"));

      await openModal();
      expect(screen.getByPlaceholderText("Type the jobsite name")).toHaveValue(
        ""
      );
    });
  });

  describe("Form interactions", () => {
    beforeEach(async () => {
      renderWithProviders(<CreateButton />);
      await openModal();
    });

    it("updates jobsite name input", async () => {
      const nameInput = screen.getByPlaceholderText("Type the jobsite name");
      await userEvent.type(nameInput, "Test Jobsite");
      expect(nameInput).toHaveValue("Test Jobsite");
    });

    it("allows selecting categories", async () => {
      const addCategoryButton = screen.getByText("Add Category");
      await userEvent.click(addCategoryButton);
      expect(screen.getByText("Categories: 1")).toBeInTheDocument();
    });

    it("allows selecting status", async () => {
      const setStatusButton = screen.getByText("Set Status");
      await userEvent.click(setStatusButton);
      expect(screen.getByText("Status: Active")).toBeInTheDocument();
    });
  });
});
