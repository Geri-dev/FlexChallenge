import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { InventoryPage } from '../InventoryPage';


jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useLocation: jest.fn(),
  };
});

const mockedUseLocation = useLocation as jest.Mock;


jest.mock('../../components/InventoryPage/LeftSidebar', () => ({
  LeftSidebar: ({ selectedCategories, onCategoriesChange, jobsiteId }: any) => (
    <div data-testid="left-sidebar">
      <span>Selected Categories: {selectedCategories.length}</span>
      <span>Jobsite ID: {jobsiteId || 'None'}</span>
      <button onClick={() => onCategoriesChange(['Category 1', 'Category 2'])}>
        Select Categories
      </button>
      <button onClick={() => onCategoriesChange([])}>
        Clear Categories
      </button>
    </div>
  ),
}));


jest.mock('../../components/InventoryPage/InventoryData', () => ({
  InventoryData: ({ categoryName, onClearSelection }: any) => (
    <div data-testid="inventory-data">
      <h2>Data Grid</h2>
      <span>
        Category:{' '}
        {Array.isArray(categoryName) ? categoryName.join(', ') : categoryName}
      </span>
      <button onClick={onClearSelection}>Clear Selection</button>
    </div>
  ),
}));





const renderWithProviders = (
  component: React.ReactElement,
  search = '?jobsiteId=123'
) => {
  mockedUseLocation.mockReturnValue({
    search,
    pathname: '/inventory',
  });

  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('InventoryPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders left sidebar with correct props', () => {
    renderWithProviders(<InventoryPage />);

    expect(screen.getByTestId('left-sidebar')).toBeInTheDocument();
    expect(screen.getByText('Selected Categories: 0')).toBeInTheDocument();
    expect(screen.getByText('Jobsite ID: 123')).toBeInTheDocument();
  });

  it('shows empty state when no categories are selected', () => {
    renderWithProviders(<InventoryPage />);

    expect(screen.getByText('Data Grid')).toBeInTheDocument();
    expect(screen.getByText('No Service Selected')).toBeInTheDocument();
    expect(
      screen.getByText('Please select a service on your left to proceed.')
    ).toBeInTheDocument();
    expect(screen.getByAltText('Empty box')).toBeInTheDocument();
  });

  it('shows inventory data when categories are selected', () => {
    renderWithProviders(<InventoryPage />);

    fireEvent.click(screen.getByText('Select Categories'));

    expect(screen.getByTestId('inventory-data')).toBeInTheDocument();
    expect(
      screen.getByText('Category: Category 1, Category 2')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('No Service Selected')
    ).not.toBeInTheDocument();
  });

  it('handles category selection changes', () => {
    renderWithProviders(<InventoryPage />);

    expect(screen.getByText('Selected Categories: 0')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Select Categories'));

    expect(screen.getByText('Selected Categories: 2')).toBeInTheDocument();
    expect(screen.getByTestId('inventory-data')).toBeInTheDocument();
  });

  it('handles clearing category selection', () => {
    renderWithProviders(<InventoryPage />);

    fireEvent.click(screen.getByText('Select Categories'));
    expect(screen.getByTestId('inventory-data')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Clear Categories'));

    expect(screen.getByText('Selected Categories: 0')).toBeInTheDocument();
    expect(screen.queryByTestId('inventory-data')).not.toBeInTheDocument();
    expect(screen.getByText('No Service Selected')).toBeInTheDocument();
  });

  it('passes jobsite ID from URL params to sidebar', () => {
    renderWithProviders(<InventoryPage />, '?jobsiteId=456');

    expect(screen.getByText('Jobsite ID: 456')).toBeInTheDocument();
  });

  it('handles missing jobsite ID in URL params', () => {
    renderWithProviders(<InventoryPage />, '');

    expect(screen.getByText('Jobsite ID: None')).toBeInTheDocument();
  });

  it('shows correct layout structure', () => {
    renderWithProviders(<InventoryPage />);

    const container = screen
      .getByText('Selected Categories: 0')
      .closest('.inventory-page-container');
    expect(container).toBeInTheDocument();

    const mainContent = screen
      .getByText('Data Grid')
      .closest('.inventory-main-content');
    expect(mainContent).toBeInTheDocument();
  });

  it('displays empty state image correctly', () => {
    renderWithProviders(<InventoryPage />);

    const emptyImage = screen.getByAltText('Empty box');
    expect(emptyImage).toBeInTheDocument();
    expect(emptyImage).toHaveAttribute('src', 'mocked-empty-box.png');
  });

  it('shows data grid title in empty state', () => {
    renderWithProviders(<InventoryPage />);

    expect(screen.getByText('Data Grid')).toBeInTheDocument();
  });

  it('calls onClearSelection when clear button is clicked in inventory data', () => {
    renderWithProviders(<InventoryPage />);

    fireEvent.click(screen.getByText('Select Categories'));
    fireEvent.click(screen.getByText('Clear Selection'));

    expect(screen.getByText('No Service Selected')).toBeInTheDocument();
    expect(screen.queryByTestId('inventory-data')).not.toBeInTheDocument();
  });
});
