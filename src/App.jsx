import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ScholarshipPage from './pages/ScholarshipPage';
import HowToApplyPage from './pages/HowToApplyPage';
import DocumentsPage from './pages/DocumentsPage';
import ApplyPage from './pages/ApplyPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import AdminPage from './pages/AdminPage';

// Global notification banner for feedback across components
const GlobalNotification = () => {
  const { notification, clearNotification } = useApp();
  if (!notification) return null;

  const bgColors = {
    error: '#991b1b',
    success: '#166534',
    warning: '#b45309',
    info: '#1e3a8a',
  };

  return (
    <aside
      aria-live="polite"
      className="dp-global-notification"
      style={{
        background: bgColors[notification.type] || bgColors.info,
      }}
    >
      <span style={{ flex: 1, lineHeight: 1.4 }}>{notification.message}</span>
      <button
        type="button"
        onClick={clearNotification}
        style={{
          background: 'none',
          border: 'none',
          color: '#ffffff',
          cursor: 'pointer',
          padding: '2px 6px',
          fontWeight: 'bold',
          fontSize: '16px',
          opacity: 0.85,
        }}
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </aside>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <GlobalNotification />
          <Header />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/index.html" element={<HomePage />} />
              
              <Route path="/about" element={<AboutPage />} />
              <Route path="/about.html" element={<AboutPage />} />
              
              <Route path="/scholarship" element={<ScholarshipPage />} />
              <Route path="/scholarship.html" element={<ScholarshipPage />} />
              
              <Route path="/how-to-apply" element={<HowToApplyPage />} />
              <Route path="/how-to-apply.html" element={<HowToApplyPage />} />
              
              <Route path="/documents" element={<DocumentsPage />} />
              <Route path="/documents.html" element={<DocumentsPage />} />
              
              <Route path="/apply" element={<ApplyPage />} />
              <Route path="/apply.html" element={<ApplyPage />} />
              
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/register.html" element={<RegisterPage />} />
              
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard.html" element={<DashboardPage />} />
              
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/faq.html" element={<FaqPage />} />
              
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/contact.html" element={<ContactPage />} />
              
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/privacy.html" element={<PrivacyPage />} />
              
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin.html" element={<AdminPage />} />

              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
