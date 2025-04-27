import React, { useState } from 'react';
import '../ComponentsCSS/TimeLine.css';

const TimeLine = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleCircleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const circles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 60) + 300, // גודל רנדומלי בין 80 ל-140
  }));

  return (
    <div className="timeline-container">
      {circles.map((circle, index) => (
        <div key={circle.id} className="timeline-item">
          <div
            className={`timeline-circle ${activeIndex === index ? 'active' : ''}`}
            style={{ width: circle.size, height: circle.size }}
            onClick={() => handleCircleClick(index)}
          >
            {index + 1}
          </div>
          {activeIndex === index && (
            <div className="timeline-text">
              טקסט {index + 1}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TimeLine;
