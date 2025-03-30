import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Projects from './pages/Projects';
import Assignment from './pages/Assignment';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Albums from './pages/admin/Albums';
import AlbumImages from './pages/admin/AlbumImages';

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoginRoute = location.pathname === '/login';
  const shouldShowHeader = !isAdminRoute && !isLoginRoute;

  return (
    <div className="min-h-screen bg-gray-100">
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/assignment" element={<Assignment />} />
        <Route path="/assignment/:id" element={<Assignment />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/albums" element={<Albums />} />
        <Route path="/admin/albums/:id/images" element={<AlbumImages />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;