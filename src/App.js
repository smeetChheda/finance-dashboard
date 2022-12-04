import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path = "/" element = {<LandingPage />} />
          {/* <Route path = "/login" element = {} />
          <Route path = "/dashboard" element = {} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
