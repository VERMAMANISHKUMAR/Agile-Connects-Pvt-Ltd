// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SiteVisitForm from './Components/SiteVisitForm';
import SiteVisitList from './Components/SiteVisitList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SiteVisitForm />} />
        <Route path="/visits" element={<SiteVisitList />} />
      </Routes>
    </Router>
  );
}

export default App;