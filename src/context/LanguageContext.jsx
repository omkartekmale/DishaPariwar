import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext({
  lang: 'mr',
  setLang: () => {},
  toggleLang: () => {},
  t: (mr, en) => mr,
});

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem('dp_lang') || localStorage.getItem('dp-lang') || 'mr';
    } catch {
      return 'mr';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dp_lang', lang);
      localStorage.setItem('dp-lang', lang);
    } catch (e) {
      console.warn('Storage unavailable', e);
    }

    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang === 'en' ? 'en' : 'mr';
      document.body.classList.toggle('lang-en', lang === 'en');
      document.body.classList.add('dp-ready');
    }
  }, [lang]);

  const setLang = (newLang) => {
    if (newLang === 'mr' || newLang === 'en') {
      setLangState(newLang);
    }
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === 'mr' ? 'en' : 'mr'));
  };

  const t = (mr, en) => {
    return lang === 'en' ? en : mr;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
export default LanguageContext;
