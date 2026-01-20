// src/components/home/SummaryCards.jsx
function SummaryCards({ stats }) {
  const cards = [
    { label: "Total Deliverables", value: stats.totalDeliverables, key: "total" },
    { label: "To do", value: stats.todo, key: "todo" },
    { label: "In progress", value: stats.inProgress, key: "progress" },
    { label: "Finished", value: stats.finished, key: "finished" }
  ];

  return (
    <div className="summary-container">
      {cards.map((card) => (
        <div key={card.key} className="summary-card">
          <p className="summary-label">{card.label}</p>
          <h2 className="summary-value">{card.value}</h2>
          <p className="summary-subtitle">across all projects</p>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;