import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Table } from '../Table';
import { JobsiteProvider } from '../../../../contexts/JobsiteContext';


jest.mock('../../CreateJobsite/CreateButton', () => ({
  CreateButton: () => <button data-testid="create-button">Create</button>,
}));


const mockJobsites = [
  {
    id: '1',
    name: 'Rruga Barrikadave',
    status: { id: '1', name: 'Active', color: '#28a745' },
    categories: [],
  },
  {
    id: '2',
    name: 'Zona Blloku',
    status: { id: '2', name: 'Inactive', color: '#6c757d' },
    categories: [],
  },
  {
    id: '3',
    name: 'Rruga Kavajes, Kompleksi Delijorgji',
    status: { id: '1', name: 'Active', color: '#28a745' },
    categories: [],
  },
];

const renderWithProviders = (component: React.ReactElement, initialJobsites = mockJobsites) => {
  const TestProvider = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>
      <JobsiteProvider>
        {children}
      </JobsiteProvider>
    </BrowserRouter>
  );

  
  const mockContextValue = {
    jobsites: initialJobsites,
    addJobsite: jest.fn(),
  };

  jest.doMock('../../../../contexts/JobsiteContext', () => ({
    useJobsiteContext: () => mockContextValue,
  }));

  return render(component, { wrapper: TestProvider });
};

describe('Table Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders table header correctly', () => {
    renderWithProviders(<Table />);
    
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Jobsite Name')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('renders search input and create button', () => {
    renderWithProviders(<Table />);
    
    expect(screen.getByPlaceholderText('Search jobsites')).toBeInTheDocument();
    expect(screen.getByTestId('create-button')).toBeInTheDocument();
  });

  it('displays all jobsites when no search term', () => {
    renderWithProviders(<Table />);
    
    expect(screen.getByText('Rruga Barrikadave')).toBeInTheDocument();
    expect(screen.getByText('Zona Blloku')).toBeInTheDocument();
    expect(screen.getByText('Rruga Kavajes, Kompleksi Delijorgji')).toBeInTheDocument();
  });

  it('filters jobsites based on search term', () => {
    renderWithProviders(<Table />);
    
    const searchInput = screen.getByPlaceholderText('Search jobsites');
    fireEvent.change(searchInput, { target: { value: 'Design' } });
    
    expect(screen.getByText('Rruga Barrikadave')).toBeInTheDocument();
    expect(screen.getByText('Zona Blloku')).toBeInTheDocument();
    expect(screen.getByText('Rruga Kavajes, Kompleksi Delijorgji')).toBeInTheDocument();
  });

  it('performs case-insensitive search', () => {
    renderWithProviders(<Table />);
    
    const searchInput = screen.getByPlaceholderText('Search jobsites');
    fireEvent.change(searchInput, { target: { value: 'Marketing' } });
    
    expect(screen.getByText('Zona Blloku')).toBeInTheDocument();
    expect(screen.queryByText('Rruga Barrikadave')).not.toBeInTheDocument();
  });

  it('shows no results message when search yields no matches', () => {
    renderWithProviders(<Table />);
    
    const searchInput = screen.getByPlaceholderText('Search jobsites');
    fireEvent.change(searchInput, { target: { value: 'NonExistent' } });
    
    expect(screen.getByText('No jobsites found matching your search.')).toBeInTheDocument();
  });

  it('shows no jobsites message when no jobsites exist', () => {
    renderWithProviders(<Table />, []);
    
    expect(screen.getByText('No jobsites found. Create one using the Create button above.')).toBeInTheDocument();
  });

  it('displays status badges with correct colors', () => {
    renderWithProviders(<Table />);
    
    const activeBadge = screen.getByText('Active');
    const inactiveBadge = screen.getByText('Inactive');
    
    expect(activeBadge).toHaveStyle('background-color: #28a745');
    expect(inactiveBadge).toHaveStyle('background-color: #6c757d');
  });

  it('makes jobsite names clickable', () => {
    renderWithProviders(<Table />);
    
    const jobsiteLinks = screen.getAllByRole('button');
    const jobsiteNameButtons = jobsiteLinks.filter(button => 
      button.textContent === 'Rruga Barrikadave' || 
      button.textContent === 'Zona Blloku' ||
      button.textContent === 'Rruga Kavajes, Kompleksi Delijorgji'
    );
    
    expect(jobsiteNameButtons).toHaveLength(3);
    jobsiteNameButtons.forEach(button => {
      expect(button).toHaveClass('btn-link');
    });
  });

  it('displays informative text with icon', () => {
    renderWithProviders(<Table />);
    
    expect(screen.getByText('Informative piece of text that can be used regarding this modal.')).toBeInTheDocument();
    expect(screen.getByAltText('Info')).toBeInTheDocument();
  });

  it('clears search when input is emptied', () => {
    renderWithProviders(<Table />);
    
    const searchInput = screen.getByPlaceholderText('Search jobsites');
    
    
    fireEvent.change(searchInput, { target: { value: 'Design' } });
    expect(screen.queryByText('Zona Blloku')).not.toBeInTheDocument();
    
    
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.getByText('Zona Blloku')).toBeInTheDocument();
  });
});
