import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContext } from './components/UserContext';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ token, setToken, user, setUser, balance, setBalance }}>
          <Routes>
            <Route path = "/" element = { <LandingPage /> } />
            <Route path = "/dashboard" element = { <Dashboard /> } />
          </Routes>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
