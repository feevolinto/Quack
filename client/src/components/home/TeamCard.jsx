// src/components/home/TeamCard.jsx
function TeamCard({ name, role }) {
  return (
    <div className="team-card">
      <div className="team-content">
        <h3 className="team-name">{name}</h3>
        <p className="team-role">{role}</p>
      </div>
    </div>
  );
}

export default TeamCard;