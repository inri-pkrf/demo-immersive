import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';

import Hamburger from './ComponentsJS/Hamburger';
import Drag from './ComponentsJS/Drag';
import TimeLine from './ComponentsJS/TimeLine';
import Match from './ComponentsJS/Match';
import VoiceEffect from './ComponentsJS/VoiceEffect';

function SingleScreenLayout({ children }) {
    return (
        <div className="App single">
            <div className="screen screen1">
                {children}
            </div>
        </div>
    );
}

function FullScreenLayout({ children }) {
    return (
        <div className="App full">
            <div className="screen screen1">מסך 1</div>
            <div className="screen screen2">מסך 2</div>
            <div className="screen screen3">מסך 3</div>
            {children}
        </div>
    );
}

function App() {
    return (
        <>
            <Hamburger />
            <Routes>
                {/* עמודים בפריסה מלאה */}
                <Route path="/drag" element={
                    <FullScreenLayout>
                        <Drag />
                    </FullScreenLayout>
                } />

                <Route path="/timeLine" element={
                    <FullScreenLayout>
                        <TimeLine />
                    </FullScreenLayout>
                } />

                {/* עמודים עם מסך 1 בלבד */}
                <Route path="/match" element={
                    <SingleScreenLayout>
                        <Match />
                    </SingleScreenLayout>
                } />

                {/* עמוד חדש לאפקטים קוליים */}
                <Route path="/voiceEffect" element={
                    <SingleScreenLayout>
                        <VoiceEffect /> {/* דף אפקטים קוליים */}
                    </SingleScreenLayout>
                } />

                {/* ברירת מחדל - אפשרי אם תרצי עמוד בית */}
                <Route path="*" element={
                    <SingleScreenLayout>
                        <div>מסך ברירת מחדל</div>
                    </SingleScreenLayout>
                } />
            </Routes>
        </>
    );
}

function AppWrapper() {
    return (
        <DndProvider backend={TouchBackend}>
            <Router>
                <App />
            </Router>
        </DndProvider>
    );
}

export default AppWrapper;
