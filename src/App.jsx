import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Hamburger from './ComponentsJS/Hamburger';
import Drag from './ComponentsJS/Drag';


function App() {
    return (
        <div className="App">
          <Hamburger/>
          <div className="screen screen1">מסך 1</div>
          <div className="screen screen2">מסך 2</div>
          <div className="screen screen3">מסך 3</div>
            
            <Routes>
                <Route path="/drag" element={<Drag />} />
              
                
            </Routes> 
        </div>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;
