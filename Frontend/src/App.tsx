import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Landing from './pages/Landing';
import Solution from './pages/Solution';
import Alerts from './pages/Alerts';
import Dashboard from './pages/Dashboard';
import TeamMembers from './pages/TeamMembers';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/solution" element={<Solution />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/team" element={<TeamMembers />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;