import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
// import Home from './componentsJS/Home';
// import Header from './componentsJS/Header';
// import Credits from './componentsJS/Credits';
// import EmergencyRolls from './componentsJS/EmergencyRolls';
// import PdfFiles from './componentsJS/PdfFiles';

function App() {
    return (
        <div className="App">
            {/* <Header className="header-fixed" />
            <Routes>
                  <Route path="/home" element={<Home className="home" />} />
                <Route path="/tzahi/EmergencyRolls" element={<EmergencyRolls />} />
                <Route path="/tzahi/Credits" element={<Credits />} />
                <Route path="/tzahi/PdfFiles" element={<PdfFiles />} />
                <Route path="/tzahi/EmergencyRolls/:scenarioId" element={<EmergencyRolls />} />
            </Routes> */}
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
