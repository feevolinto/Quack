// src/components/home/SummaryCards.jsx
import "../../styles/Home.css";

function SummaryCards({ stats }) {
  // Debug logging
  console.log("📊 SummaryCards received stats:", stats);

  return (
    <div className="summary-container">
      {/* All Deliverables */}
      <div className="summary-card">
        <p className="summary-label">All Deliverables</p>
        <p className="summary-value">{stats?.allDeliverables || 0}</p>
        <p className="summary-subtitle">Tasks</p>
      </div>

      {/* To Do */}
      <div className="summary-card">
        <p className="summary-label">To do</p>
        <p className="summary-value">{stats?.toDo || 0}</p>
        <p className="summary-subtitle">Tasks</p>
      </div>

      {/* In Progress */}
      <div className="summary-card">
        <p className="summary-label">In progress</p>
        <p className="summary-value">{stats?.inProgress || 0}</p>
        <p className="summary-subtitle">Tasks</p>
      </div>

      {/* Finished */}
      <div className="summary-card">
        <p className="summary-label">Finished</p>
        <p className="summary-value">{stats?.finished || 0}</p>
        <p className="summary-subtitle">Tasks</p>
      </div>
    </div>
  );
}

export default SummaryCards;