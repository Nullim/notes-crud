import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Nav from './components/layout/Nav';

import ActiveNotesPage from './components/pages/ActiveNotesPage';
import ArchivedNotesPage from './components/pages/ArchivedNotesPage';

function App() {
  return (
    <div className="App">
      <Header />
      
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Navigate to="/notes"/>} />
          <Route path="/notes" element={<ActiveNotesPage />} />
          <Route path="/archived" element={<ArchivedNotesPage />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
