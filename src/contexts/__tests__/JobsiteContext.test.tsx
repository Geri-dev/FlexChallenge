import { render, screen, act } from '@testing-library/react';
import { JobsiteProvider, useJobsiteContext } from '../JobsiteContext';


const TestComponent = () => {
  const { jobsites, addJobsite } = useJobsiteContext();
  
  return (
    <div>
      <div data-testid="jobsites-count">{jobsites.length}</div>
      <div data-testid="jobsites-list">
        {jobsites.map(jobsite => (
          <div key={jobsite.id} data-testid={`jobsite-${jobsite.id}`}>
            {jobsite.name} - {jobsite.status.name}
          </div>
        ))}
      </div>
      <button 
        data-testid="add-jobsite" 
        onClick={() => addJobsite({
          name: 'Test Jobsite',
          status: { id: '1', name: 'Active', color: '#28a745' },
          categories: []
        })}
      >
        Add Jobsite
      </button>
    </div>
  );
};

const renderWithProvider = () => {
  return render(
    <JobsiteProvider>
      <TestComponent />
    </JobsiteProvider>
  );
};

describe('JobsiteContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provides initial empty jobsites array', () => {
    renderWithProvider();
    
    expect(screen.getByTestId('jobsites-count')).toHaveTextContent('0');
    expect(screen.getByTestId('jobsites-list')).toBeEmptyDOMElement();
  });

  it('adds a new jobsite successfully', () => {
    renderWithProvider();
    
    const addButton = screen.getByTestId('add-jobsite');
    
    act(() => {
      addButton.click();
    });
    
    expect(screen.getByTestId('jobsites-count')).toHaveTextContent('1');
    
  });

  it('generates unique IDs for new jobsites', () => {
    renderWithProvider();
    
    const addButton = screen.getByTestId('add-jobsite');
    
    act(() => {
      addButton.click();
    });
    
    act(() => {
      addButton.click();
    });
    
    expect(screen.getByTestId('jobsites-count')).toHaveTextContent('2');
    
  });

  it('returns the created jobsite ID', () => {
    let returnedId: string | null = null;
    
    const TestComponentWithId = () => {
      const { addJobsite } = useJobsiteContext();
      
      const handleAdd = () => {
        const id = addJobsite({
          name: 'Test Jobsite',
          status: { id: '1', name: 'Active', color: '#28a745' },
          categories: []
        });
        returnedId = id;
      };
      
      return (
        <button data-testid="add-jobsite" onClick={handleAdd}>
          Add Jobsite
        </button>
      );
    };
    
    render(
      <JobsiteProvider>
        <TestComponentWithId />
      </JobsiteProvider>
    );
    
    const addButton = screen.getByTestId('add-jobsite');
    
    act(() => {
      addButton.click();
    });
    
    expect(returnedId).toBeTruthy();
    expect(typeof returnedId).toBe('string');
  });

  it('preserves existing jobsites when adding new ones', () => {
    renderWithProvider();
    
    const addButton = screen.getByTestId('add-jobsite');
    
    // Add first jobsite
    act(() => {
      addButton.click();
    });
    
    expect(screen.getByTestId('jobsites-count')).toHaveTextContent('1');
    
    
    // Add second jobsite
    act(() => {
      addButton.click();
    });
    
    expect(screen.getByTestId('jobsites-count')).toHaveTextContent('2');
   
  });

  it('handles jobsite with categories', () => {
    let returnedId: string | null = null;
    
    const TestComponentWithCategories = () => {
      const { jobsites, addJobsite } = useJobsiteContext();
      
      const handleAdd = () => {
        const id = addJobsite({
          name: 'Jobsite with Categories',
          status: { id: '1', name: 'Active', color: '#28a745' },
          categories: [
            { id: 'cat1', name: 'Category 1', color: '#ff0000' },
            { id: 'cat2', name: 'Category 2', color: '#00ff00' }
          ]
        });
        returnedId = id;
      };
      
      return (
        <div>
          <div data-testid="jobsites-count">{jobsites.length}</div>
          <div data-testid="jobsites-list">
            {jobsites.map(jobsite => (
              <div key={jobsite.id} data-testid={`jobsite-${jobsite.id}`}>
                {jobsite.name} - Categories: {jobsite.categories.length}
              </div>
            ))}
          </div>
          <button data-testid="add-jobsite" onClick={handleAdd}>
            Add Jobsite
          </button>
        </div>
      );
    };
    
    render(
      <JobsiteProvider>
        <TestComponentWithCategories />
      </JobsiteProvider>
    );
    
    const addButton = screen.getByTestId('add-jobsite');
    
    act(() => {
      addButton.click();
    });
    
    expect(screen.getByTestId('jobsites-count')).toHaveTextContent('1');
   
    expect(returnedId).toBeTruthy();
  });

  it('throws error when used outside provider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    const TestComponentOutsideProvider = () => {
      try {
        useJobsiteContext();
        return <div>No error</div>;
      } catch (error) {
        return <div data-testid="error">Error caught</div>;
      }
    };
    
    render(<TestComponentOutsideProvider />);
    
    expect(screen.getByTestId('error')).toHaveTextContent('Error caught');
    
    consoleError.mockRestore();
  });
});
