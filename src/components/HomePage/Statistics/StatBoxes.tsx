import { useJobsiteContext } from '../../../contexts/JobsiteContext';
import '../../../styles/StatBox.css';

export const StatBoxes = () => {
  const { jobsites } = useJobsiteContext();

  // Count jobsites by status
  const statusCounts = jobsites.reduce((counts, jobsite) => {
    const statusName = jobsite.status?.name || '';
    
    // Map status names to display names
    if (statusName === 'In Progress') {
      counts.onRoad++;
    } else if (statusName === 'Completed') {
      counts.completed++;
    } else if (statusName === 'On Hold') {
      counts.onHold++;
    }
    
    return counts;
  }, 
  {
    onRoad: 0,
    completed: 0,
    onHold: 0

  });


  return (
    <div className="stat-container bg-white">
      <div className="row g-2 text-center mx-0">
        <div className="col-12 col-md-4">
          <div
            className="d-flex align-items-center justify-content-center rounded text-white fw-semibold fs-5"
            style={{ height: "80px", backgroundColor: "#ECDE7C" }}
          >
            {statusCounts.onRoad} On Road
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div
            className="d-flex align-items-center justify-content-center rounded text-white fw-semibold fs-5"
            style={{ height: "80px", backgroundColor: "#7AC14D" }}
          >
            {statusCounts.completed} Completed
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div
            className="d-flex align-items-center justify-content-center rounded text-white fw-semibold fs-5"
            style={{ height: "80px", backgroundColor: "#FE4C4A" }}
          >
            {statusCounts.onHold} On Hold
          </div>
        </div>
      </div>
    </div>
  );
};
