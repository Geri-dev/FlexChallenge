import { createContext, useContext, useState, type ReactNode } from 'react';

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Status {
  id: string;
  name: string;
  color: string;
}

export interface Jobsite {
  id: string;
  status: any;
  name: string;
  categories: Category[];
  
}

interface JobsiteContextType {
  jobsites: Jobsite[];
  addJobsite: (jobsite: Omit<Jobsite, 'id'>) => string; 
}

const JobsiteContext = createContext<JobsiteContextType | undefined>(undefined);

export const useJobsiteContext = () => {
  const context = useContext(JobsiteContext);
  if (!context) {
    throw new Error('useJobsiteContext must be used within a JobsiteProvider');
  }
  return context;
};

interface JobsiteProviderProps {
  children: ReactNode;
}

export const JobsiteProvider = ({ children }: JobsiteProviderProps) => {
  const [jobsites, setJobsites] = useState<Jobsite[]>([]);

  const addJobsite = (jobsite: Omit<Jobsite, 'id'>) => {
    const newJobsite: Jobsite = {
      ...jobsite,
      id: Date.now().toString(),
    };
    setJobsites(prev => [...prev, newJobsite]);
    return newJobsite.id; 
  };

  return (
    <JobsiteContext.Provider value={{ jobsites, addJobsite }}>
      {children}
    </JobsiteContext.Provider>
  );
};
