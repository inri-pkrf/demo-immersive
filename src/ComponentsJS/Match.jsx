import React, { useState, useRef, useEffect } from 'react';
import '../ComponentsCSS/Match.css';

const Match = () => {
  // צבעים פסטליים למלבנים
  const pastelColors = ["#FFB3BA", "#FFDFBA", "#BAE1FF"];

  // מיקומים של המלבנים
  const rectangles = [
    { name: "תיבת טקסט 1", x: 50, y: 200, index: 1, color: pastelColors[0] },
    { name: "תיבת טקסט 2", x: 50, y: 700, index: 2, color: pastelColors[1] },
    { name: "תיבת טקסט 3", x: 50, y: 1200, index: 3, color: pastelColors[2] },
  ];

  // נקודות מימין למלבנים
  const dots = [
    { x: 1100, y: 200, targetIndex: 2 },
    { x: 1100, y: 700, targetIndex: 3 },
    { x: 1100, y: 1200, targetIndex: 1 },
  ];

  const canvasRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [currentLine, setCurrentLine] = useState(null);

  // פונקציה לציור קווים על הקנבס
  const drawLine = (ctx, startX, startY, endX, endY, color) => {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]); // קווים מקווקווים
    ctx.stroke();
  };

  // התחלת גרירת העכבר/מגע
  const handleStart = (e, dot) => {
    setDragging(true);

    const startX = e.clientX || e.touches[0].clientX;
    const startY = e.clientY || e.touches[0].clientY;

    const targetRectangle = rectangles.find((rect) => rect.index === dot.targetIndex);

    // הגדרת הקו הנוכחי
    setCurrentLine({
      startX,
      startY,
      endX: targetRectangle.x + 300,
      endY: targetRectangle.y + 100,
      color: targetRectangle.color,
    });
  };

  // גרירת העכבר/מגע
  const handleMove = (e) => {
    if (!dragging) return;

    const endX = e.clientX || e.touches[0].clientX;
    const endY = e.clientY || e.touches[0].clientY;

    // עדכון הקו הנוכחי בזמן גרירת העכבר
    setCurrentLine((prevLine) => ({
      ...prevLine,
      endX,
      endY,
    }));

    // שמירת הקווים למצב הנוכחי
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    lines.forEach((line) => {
      drawLine(ctx, line.startX, line.startY, line.endX, line.endY, line.color);
    });
    
    // ציור הקו הנוכחי
    if (currentLine) {
      drawLine(ctx, currentLine.startX, currentLine.startY, endX, endY, currentLine.color);
    }
  };

  // סיום גרירת העכבר/מגע
  const handleEnd = () => {
    if (currentLine) {
      setLines([...lines, currentLine]);
      setCurrentLine(null);  // אפס את הקו הנוכחי
    }
    setDragging(false);
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    // אפשר לצייר את הקווים מראש אם יש צורך בכך
  }, []);

  return (
    <div className="match-container">
      <div className="rectangle-container">
        {/* המלבנים */}
        {rectangles.map((rectangle, index) => (
          <div
            key={index}
            className="rectangle"
            style={{
              left: rectangle.x,
              top: rectangle.y,
              backgroundColor: rectangle.color, // צבע המלבן
            }}
          >
            <span className="text">{rectangle.name}</span>
          </div>
        ))}

        {/* הנקודות */}
        {dots.map((dot, index) => {
          const targetRectangle = rectangles.find(
            (rect) => rect.index === dot.targetIndex
          );
          return (
            <div
              key={index}
              className="dot"
              style={{
                left: dot.x,
                top: dot.y,
                backgroundColor: targetRectangle.color, // צבע הנקודה
              }}
              onMouseDown={(e) => handleStart(e, dot)}
              onTouchStart={(e) => handleStart(e, dot)} // תמיכה במגע
            >
              <span className="dot-number">{dot.targetIndex}</span>
            </div>
          );
        })}
      </div>

      {/* קנבס לציור הקווים */}
      <canvas
        ref={canvasRef}
        width={window.innerWidth} // רוחב מלא של המסך
        height={window.innerHeight} // גובה מלא של המסך
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseOut={handleEnd} // אם המשתמש יצא מהקנבס תוך כדי גרירה
        onTouchMove={handleMove} // תמיכה במגע
        onTouchEnd={handleEnd}
        onTouchCancel={handleEnd}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none', // שיאפשר אינטראקציה עם רכיבי ה-HTML האחרים
        }}
      />
    </div>
  );
};

export default Match;
