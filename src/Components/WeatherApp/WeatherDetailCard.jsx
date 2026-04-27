// Reusable component for displaying individual weather detail cards
import React from "react";
import "./WeatherDetailCard.css";

// Props: icon (emoji), value (data), label (title), subLabel (optional unit/description)
const WeatherDetailCard = ({ icon, value, label, subLabel }) => {
  return (
    // Card container with hover effects and glassmorphism styling
    <div className="detail-card">
      {/* Weather icon (emoji) */}
      <div className="detail-icon">{icon}</div>
      {/* Value and label content */}
      <div className="detail-content">
        <div className="detail-value">{value}</div>
        <div className="detail-label">{label}</div>
        {/* Optional sub-label for units or additional info */}
        {subLabel && <div className="detail-sub">{subLabel}</div>}
      </div>
    </div>
  );
};

export default WeatherDetailCard;
