import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { InventoryPage } from './pages/InventoryPage';
import { JobsiteProvider } from './contexts/JobsiteContext';

export default function App() {
  return (

    <JobsiteProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inventory" element={<InventoryPage />} />
        </Routes>
      </Router>
    </JobsiteProvider>

  );
}



