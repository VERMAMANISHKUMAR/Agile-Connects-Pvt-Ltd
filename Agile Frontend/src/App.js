// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SiteVisitForm from './Components/SiteVisitForm';
import SiteVisitList from './Components/SiteVisitList';
import HomePage from './Components/Home Page';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/visits" element={<SiteVisitList />} />

      </Routes>
    </Router>
  );
}

export default App;