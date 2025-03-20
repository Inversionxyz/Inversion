import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FutureDiary from './components/FutureDiary';
import FutureDialog from './components/FutureDialog';
import FutureExplorer from './components/FutureExplorer';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main>
          <Routes>
            <Route path="/diary" element={<FutureDiary />} />
            <Route path="/dialog" element={<FutureDialog />} />
            <Route path="/explorer" element={<FutureExplorer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 