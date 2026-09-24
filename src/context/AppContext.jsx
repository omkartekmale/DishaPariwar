import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import { LanguageProvider, useLanguage } from './LanguageContext';

/**
 * Unified Global Application Context
 * Combines Language Settings, Authentication Status, and Application Alerts
 */
const AppContext = createContext({
  // Language slice
  lang: 'mr',
  setLang: () => {},
  toggleLang: () => {},
  t: (mr, en) => mr,

  // Auth slice
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  isStudent: false,
  authLoading: false,
  authError: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateUser: () => {},

  // Global UI notification slice
  notification: null,
  showNotification: () => {},
  clearNotification: () => {},
});

// Inner provider that combines Language & Auth into a unified API
const AppInnerProvider = ({ children }) => {
  const { lang, setLang, toggleLang, t } = useLanguage();
  const {
    user,
    isAuthenticated,
    isAdmin,
    isStudent,
    loading: authLoading,
    error: authError,
    login,
    register,
    logout,
    updateUser,
    clearError: clearAuthError,
  } = useAuth();

  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now();
    setNotification({ id, message, type });
    if (duration > 0) {
      setTimeout(() => {
        setNotification((prev) => (prev?.id === id ? null : prev));
      }, duration);
    }
  }, []);

  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const value = {
    // Language
    lang,
    setLang,
    toggleLang,
    t,

    // Auth
    user,
    isAuthenticated,
    isAdmin,
    isStudent,
    authLoading,
    authError,
    login,
    register,
    logout,
    updateUser,
    clearAuthError,

    // Global Notifications
    notification,
    showNotification,
    clearNotification,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * Global App Provider that wraps LanguageProvider, AuthProvider, and AppInnerProvider
 */
export const AppProvider = ({ children }) => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppInnerProvider>{children}</AppInnerProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

/**
 * Hook to access the complete global application state
 */
export const useApp = () => useContext(AppContext);

// Re-export individual hooks for flexibility
export { useLanguage, useAuth };

export default AppContext;
