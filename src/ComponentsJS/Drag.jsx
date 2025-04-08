import React, { useState } from 'react';
import '../ComponentsCSS/Drag.css';

const initialButtons = [
  { id: 1, label: 'מסך 1 גרירה', x: 400, y: 600, screen: 1, color: '#ff9bb2', targetZoneId: 1 },
  { id: 2, label: 'ממסך 1 ל3 גרירה', x: 2000, y: 1500, screen: 1, color: '#b3e6b3', targetZoneId: 2 },
  { id: 3, label: 'גרירה מבין מסך לאחר', x: 3600, y: 600, screen: 2, color: '#ffb3a7', targetZoneId: 3 },
  { id: 4, label: 'גרירה מ2 ל3', x: 5000, y: 1400, screen: 2, color: '#c1a8e2', targetZoneId: 4 },
  { id: 5, label: 'גרירה מ3 ל2', x: 8000, y: 1000, screen: 3, color: '#a0c9e3', targetZoneId: 5 },
  { id: 6, label: 'גרירה מ3 ל1', x: 10400, y: 300, screen: 3, color: '#ffc382', targetZoneId: 6 },
];

const dropZones = [
  { id: 1, screen: 1, x: 2000, y: 700, color: '#ff9bb2', width: 730, height: 290 },
  { id: 2, screen: 3, x: 8000, y: 1600, color: '#b3e6b3', width: 730, height: 290 },
  { id: 3, screen: 2, x: 7300, y: 300, color: '#ffb3a7', width: 730, height: 290 },
  { id: 4, screen: 2, x: 9500, y: 1400, color: '#c1a8e2', width: 730, height: 290 },
  { id: 5, screen: 3, x: 6000, y: 1000, color: '#a0c9e3', width: 730, height: 290 },
  { id: 6, screen: 3, x: 3000, y: 1700, color: '#ffc382', width: 730, height: 290 }
];

const DropZone = ({ x, y, color, width, height }) => (
  <div
    className="drop-div"
    style={{
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      backgroundColor: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.5)`,
      border: `20px dashed ${color}`,
      width: `${width}px`,
      height: `${height}px`,
      zIndex: 5,
    }}
  />
);

const Drag = () => {
  const [buttons, setButtons] = useState(initialButtons);
  const [draggingId, setDraggingId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const buttonWidth = 750;
  const buttonHeight = 290;

  // תמיכה בגרירה עם עכבר ו-touch
  const handleStart = (e, id) => {
    const btn = buttons.find(b => b.id === id);

    if (!btn) {
      console.error('Button not found');
      return;
    }

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    // אם המגע הוא בתוך גבולות הכפתור
    if (
      clientX >= btn.x && clientX <= btn.x + buttonWidth &&
      clientY >= btn.y && clientY <= btn.y + buttonHeight
    ) {
      setDraggingId(id);
      setOffset({
        x: clientX - btn.x,
        y: clientY - btn.y,
      });
    }
  };

  const handleMove = (e) => {
    if (draggingId !== null) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const newButtons = buttons.map(btn => {
        if (btn.id === draggingId) {
          return {
            ...btn,
            x: clientX - offset.x,
            y: clientY - offset.y,
          };
        }
        return btn;
      });
      setButtons(newButtons);
    }
  };

  const handleEnd = () => {
    if (draggingId !== null) {
      const button = buttons.find(btn => btn.id === draggingId);

      const targetDropZone = dropZones.find(zone => {
        const isTarget = zone.id === button.targetZoneId;
        const isOverlap = (
          button.x < zone.x + zone.width &&
          button.x + buttonWidth > zone.x &&
          button.y < zone.y + zone.height &&
          button.y + buttonHeight > zone.y
        );
        return isTarget && isOverlap;
      });

      if (targetDropZone) {
        // הדבקה מדויקת למיקום של הדרופ זון
        const newButtons = buttons.map(btn => {
          if (btn.id === draggingId) {
            return {
              ...btn,
              x: targetDropZone.x,
              y: targetDropZone.y,
            };
          }
          return btn;
        });
        setButtons(newButtons);
      } else {
        // החזרת הכפתור למיקומו ההתחלתי
        const initialButton = initialButtons.find(btn => btn.id === draggingId);
        const newButtons = buttons.map(btn => {
          if (btn.id === draggingId) {
            return { ...initialButton };
          }
          return btn;
        });
        setButtons(newButtons);
      }

      setDraggingId(null);
    }
  };

  const handleTouchStart = (e) => {
    const target = e.target;
    if (target.classList.contains('drag-div')) { // בודק אם היעד של המגע הוא כפתור
      const btnId = target.id; // מקבל את ה-ID של הכפתור
      handleStart(e, parseInt(btnId)); // מעביר את ה-ID לפונקציה handleStart
    }
  };
  return (
    <div
      className="drag-container"
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      onTouchStart={handleTouchStart} // הוספת touchstart
    >
      {buttons.map(btn => (
        <div
          key={btn.id}
          id={btn.id}
          className="drag-div"
          onMouseDown={(e) => handleStart(e, btn.id)}
          onTouchStart={handleTouchStart} // הוספת touchstart
          style={{
            position: 'absolute',
            left: `${btn.x}px`,
            top: `${btn.y}px`,
            backgroundColor: btn.color,
            width: `${buttonWidth}px`,
            height: `${buttonHeight}px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10px',
            cursor: 'grab',
            zIndex: 10,
          }}
        >
          {btn.label}
        </div>
      ))}
      {dropZones.map(zone => (
        <DropZone
          key={zone.id}
          x={zone.x}
          y={zone.y}
          color={zone.color}
          width={zone.width}
          height={zone.height}
        />
      ))}
    </div>
  );
};

export default Drag;
