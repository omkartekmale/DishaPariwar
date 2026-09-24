import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, User, LogOut, ShieldCheck, UserCheck, Search } from 'lucide-react';

/**
 * Reusable Header component using existing 'nav' CSS classes with Auth & Language state
 * @param {Object} props
 * @param {string} [props.logoSrc] - Path to logo image
 * @param {Object} [props.title] - Bilingual title { mr: string, en: string }
 * @param {Object} [props.tagline] - Bilingual tagline { mr: string, en: string }
 * @param {Array} [props.links] - Custom navigation links [{ path, mr, en }]
 * @param {boolean} [props.showCta] - Whether to show the Apply CTA button
 * @param {boolean} [props.showLangToggle] - Whether to show language switcher
 */
const Header = ({
  logoSrc = '/assets/logo.png',
  title = {
    mr: 'दिशा पारिवार चॅरिटेबल ट्रस्ट',
    en: 'Disha Pariwar Charitable Trust'
  },
  tagline = {
    mr: 'एक शैक्षणिक चळवळ · पुणे',
    en: 'An Educational Movement · Pune'
  },
  links: customLinks,
  showCta = true,
  showLangToggle = true
}) => {
  const { lang, setLang, t } = useLanguage();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const defaultLinks = [
    { path: '/', mr: 'मुख्यपान', en: 'Home' },
    { path: '/about', mr: 'शिष्यवृत्ती बद्दल', en: 'About' },
    { path: '/how-to-apply', mr: 'अर्ज कसा करावा', en: 'How to Apply' },
    { path: '/documents', mr: 'कागदपत्रे', en: 'Documents' },
    { path: '/faq', mr: 'FAQ', en: 'FAQ' },
    { path: '/contact', mr: 'संपर्क', en: 'Contact' },
    { path: '/admin', mr: 'प्रशासक', en: 'Admin' }
  ];

  const links = customLinks || defaultLinks;

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body touch scroll when mobile drawer is open to prevent background jumps
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('nav-open');
    } else {
      document.body.classList.remove('nav-open');
    }
    return () => {
      document.body.classList.remove('nav-open');
    };
  }, [mobileOpen]);

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  return (
    <header className="header-container" style={{ width: '100%' }}>
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <div className="nav__inner">
          {/* Logo & Site Title */}
          <Link to="/" className="nav__brand" onClick={() => setMobileOpen(false)}>
            <img
              src={logoSrc}
              alt="Logo"
              className="nav__logo-img"
              onError={(e) => { e.target.src = '/logo.png'; }}
            />
            <div>
              <div className="nav__name">
                <span className="mr">{title.mr}</span>
                <span className="en">{title.en}</span>
              </div>
              <div className="nav__tagline">
                <span className="mr">{tagline.mr}</span>
                <span className="en">{tagline.en}</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="nav__links" role="list">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={isActive(link.path) ? 'active' : ''}
                >
                  <span className="mr">{link.mr}</span>
                  <span className="en">{link.en}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Controls: Language Switcher, User Status/Auth, CTA, Burger Menu */}
          <div className="nav__right">
            {showLangToggle && (
              <div className="lang-toggle" role="group" aria-label="Language selection">
                <button
                  type="button"
                  className={`lang-toggle__btn ${lang === 'mr' ? 'active' : ''}`}
                  onClick={() => setLang('mr')}
                  aria-pressed={lang === 'mr'}
                >
                  मराठी
                </button>
                <button
                  type="button"
                  className={`lang-toggle__btn ${lang === 'en' ? 'active' : ''}`}
                  onClick={() => setLang('en')}
                  aria-pressed={lang === 'en'}
                >
                  English
                </button>
              </div>
            )}

            {/* Authentication status pill / Actions */}
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Link
                  to={isAdmin ? '/admin' : '/dashboard'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 10px',
                    borderRadius: '20px',
                    backgroundColor: isAdmin ? 'rgba(185, 28, 28, 0.1)' : 'rgba(29, 78, 216, 0.08)',
                    color: isAdmin ? 'var(--red)' : 'var(--ink)',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    border: '1px solid var(--border)',
                    maxWidth: '120px'
                  }}
                  title={user?.name || user?.email}
                >
                  {isAdmin ? <ShieldCheck size={15} color="var(--red)" /> : <UserCheck size={15} color="var(--blue-mid, #2563eb)" />}
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user?.name?.split(' ')[0] || (isAdmin ? 'Admin' : 'Student')}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn btn-outline"
                  style={{ padding: '6px 8px', height: '32px', fontSize: '11.5px' }}
                  title="लॉगआउट / Logout"
                >
                  <LogOut size={13} />
                  <span className="mr">बाहेर पडा</span>
                  <span className="en">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/dashboard"
                className="btn btn-outline nav__track-btn"
                style={{
                  fontSize: '12.5px',
                  fontWeight: 600,
                  padding: '6px 12px',
                  height: '36px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Search size={14} />
                <span className="mr">अर्ज ट्रॅक करा</span>
                <span className="en">Track Application</span>
              </Link>
            )}

            {showCta && (
              <Link to="/apply" className="btn btn-red nav__cta" style={{ height: '36px', display: 'inline-flex', alignItems: 'center' }}>
                <span className="mr">अर्ज करा</span>
                <span className="en">Apply Now</span>
              </Link>
            )}

            <button
              type="button"
              className="nav__burger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Backdrop */}
        <div
          className={`mobile-nav-backdrop ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Responsive Mobile Drawer with Smooth Slide-in Transition */}
        <div
          className={`mobile-nav ${mobileOpen ? 'open' : ''}`}
          role="dialog"
          aria-label="Mobile navigation menu"
          aria-hidden={!mobileOpen}
        >
            {showLangToggle && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ink-soft)' }}>
                  {t('भाषा निवडा / Select Language', 'Select Language')}
                </span>
                <div className="lang-toggle">
                  <button
                    type="button"
                    className={`lang-toggle__btn ${lang === 'mr' ? 'active' : ''}`}
                    onClick={() => setLang('mr')}
                  >
                    मराठी
                  </button>
                  <button
                    type="button"
                    className={`lang-toggle__btn ${lang === 'en' ? 'active' : ''}`}
                    onClick={() => setLang('en')}
                  >
                    English
                  </button>
                </div>
              </div>
            )}

            {/* User session in mobile drawer */}
            {isAuthenticated ? (
              <div style={{
                padding: '12px',
                borderRadius: '8px',
                background: 'var(--cream)',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {isAdmin ? <ShieldCheck size={18} color="var(--red)" /> : <User size={18} />}
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }}>
                      {user?.name || user?.fullName}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--ink-soft)' }}>
                      {isAdmin ? 'प्रशासक (Admin)' : 'नोंदणीकृत विद्यार्थी (Student)'}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--red)',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link
                    to="/dashboard"
                    className="btn btn-outline"
                    style={{ flex: 1, textAlign: 'center', fontSize: '13px', padding: '9px 8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Search size={14} />
                    <span className="mr">अर्ज ट्रॅक करा</span>
                    <span className="en">Track Status</span>
                  </Link>
                  <Link
                    to="/apply"
                    className="btn btn-red"
                    style={{ flex: 1, textAlign: 'center', fontSize: '13px', padding: '9px 8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="mr">अर्ज करा</span>
                    <span className="en">Apply Now</span>
                  </Link>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 6px', fontSize: '12px' }}>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    style={{ color: 'var(--ink-soft)', textDecoration: 'none', borderBottom: '1px dotted var(--border)' }}
                  >
                    <span className="mr">विद्यार्थी लॉगिन</span>
                    <span className="en">Student Login</span>
                  </Link>
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    style={{ color: 'var(--ink-soft)', textDecoration: 'none', borderBottom: '1px dotted var(--border)' }}
                  >
                    <span className="mr">प्रशासक लॉगिन</span>
                    <span className="en">Admin Login</span>
                  </Link>
                </div>
              </div>
            )}

            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                style={{
                  color: isActive(link.path) ? 'var(--red)' : 'var(--ink)',
                  fontWeight: isActive(link.path) ? 700 : 500
                }}
              >
                <span className="mr">{link.mr}</span>
                <span className="en">{link.en}</span>
              </Link>
            ))}

            {showCta && (
              <Link
                to="/apply"
                className="btn btn-red"
                style={{ marginTop: '16px' }}
                onClick={() => setMobileOpen(false)}
              >
                <span className="mr">अर्ज करा →</span>
                <span className="en">Apply Now →</span>
              </Link>
            )}
          </div>
      </nav>
    </header>
  );
};

export default Header;
