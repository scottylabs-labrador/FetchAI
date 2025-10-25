import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AboutPage from './pages/About';
import HowToCustomizePage from './pages/HowToCustomize';
import SubmitFeedbackPage from './pages/SubmitFeedback';
import AuthPage from './pages/Auth';
import SettingsPage from './pages/Settings';
import DashboardPage from './pages/Dashboard';
import BulletinPage from './pages/Bulletin';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-to-customize" element={<HowToCustomizePage />} />
            <Route path="/submit-feedback" element={<SubmitFeedbackPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/bulletin" element={<BulletinPage />} />
            <Route path="/" element={<DashboardPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
