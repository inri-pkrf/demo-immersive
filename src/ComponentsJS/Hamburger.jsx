import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../ComponentsCSS/Hamburger.css';

const Hamburger = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [visitedPages, setVisitedPages] = useState(() => {
    return JSON.parse(sessionStorage.getItem('visitedPages')) || [];
  });
  const [isOpen, setIsOpen] = useState(false);

  const subjects = [
    { name: ' גרירה', path: '/drag' },
    { name: 'ציר זמן', path: '/timeLine' },
    { name: 'מסך שמאלי בלבד', path: '/leftScreen', external: true },
  ];

  useEffect(() => {
    if (!visitedPages.includes(location.pathname)) {
      const updatedVisitedPages = [...visitedPages, location.pathname];
      setVisitedPages(updatedVisitedPages);
      sessionStorage.setItem('visitedPages', JSON.stringify(updatedVisitedPages));
    }
  }, [location.pathname]);

  const handleClick = () => setIsOpen(!isOpen);

  const handleMenuClick = (path, external) => {
    setIsOpen(false);
    if (external) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(path);
    }
  };

  return (
    <div>
      {/* כפתור המבורגר */}
      <div className="hamburger-icon" onClick={handleClick} style={{ cursor: 'pointer' }}>
        <div className={`hamburger-line ${isOpen ? 'open' : ''}`} />
        <div className={`hamburger-line ${isOpen ? 'open' : ''}`} />
        <div className={`hamburger-line ${isOpen ? 'open' : ''}`} />
      </div>

      {/* תפריט נפתח */}
      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <ul className="menu-list">
          {subjects.map((subject, index) => (
            <React.Fragment key={index}>
              <li
                onClick={() => handleMenuClick(subject.path, subject.external)}
                className={`menu-item ${visitedPages.includes(subject.path) ? 'active' : ''}`}
              >
                {subject.name}
              </li>
              {index < subjects.length - 1 && <div className="lineMenu"></div>}
            </React.Fragment>
          ))}
        </ul>
        
       
      </div>
    </div>
  );
};

export default Hamburger;
