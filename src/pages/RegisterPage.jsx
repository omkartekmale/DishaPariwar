import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UserPlus, LogIn, CheckCircle2, User, ArrowRight } from 'lucide-react';

const RegisterPage = () => {
  const { t, user, isAuthenticated, register, login, showNotification } = useApp();
  const navigate = useNavigate();

  const [mode, setMode] = useState('register'); // 'register' | 'login'
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    district: '',
    course: 'Degree (Engineering / Medical / Other)',
    password: '',
  });

  const [loginData, setLoginData] = useState({
    identifier: '',
    password: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await register(formData);
    setLoading(false);

    if (res.success) {
      setSubmitted(true);
      showNotification(
        t('नोंदणी यशस्वी झाली! / Registration successful!', 'Registration successful! Welcome to Disha Pariwar.'),
        'success'
      );
      setTimeout(() => {
        navigate('/apply');
      }, 1200);
    } else {
      setError(res.error || 'नोंदणी अयशस्वी. कृपया पुन्हा प्रयत्न करा.');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login({
      identifier: loginData.identifier,
      password: loginData.password,
      role: 'STUDENT',
    });
    setLoading(false);

    if (res.success) {
      setSubmitted(true);
      showNotification(
        t('लॉगिन यशस्वी झाले! / Login successful!', 'Login successful! Welcome back.'),
        'success'
      );
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      setError(res.error || t('लॉगिन अयशस्वी झाले. तपशील तपासा.', 'Login failed. Please check details.'));
    }
  };

  // If already logged in, provide quick options
  if (isAuthenticated && !submitted) {
    return (
      <div>
        <div className="page-header">
          <div className="page-header__inner">
            <div className="page-header__eyebrow">
              <span className="mr">विद्यार्थी खाते</span>
              <span className="en">Student Account</span>
            </div>
            <h1>
              <span className="mr">तुम्ही आधीच लॉगिन आहात</span>
              <span className="en">You are Logged In</span>
            </h1>
            <p>
              <span className="mr">{user?.name || user?.fullName} म्हणून सक्रिय</span>
              <span className="en">Active as {user?.name || user?.fullName}</span>
            </p>
          </div>
        </div>

        <section className="section">
          <div className="container" style={{ maxWidth: '520px' }}>
            <div className="section-card" style={{ textAlign: 'center', padding: '36px 24px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--cream-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <User size={32} color="var(--red)" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
                {user?.fullName || user?.name}
              </h3>
              <p style={{ color: 'var(--ink-soft)', fontSize: '14px', marginBottom: '24px' }}>
                {user?.mobile} {user?.email ? `• ${user?.email}` : ''}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link to="/apply" className="btn btn-red" style={{ width: '100%' }}>
                  <span className="mr">नवीन अर्ज सादर करा</span>
                  <span className="en">Submit New Application</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/dashboard" className="btn btn-outline" style={{ width: '100%' }}>
                  <span className="mr">माझा अर्ज ट्रॅक करा</span>
                  <span className="en">Track My Application</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-header__inner">
          <div className="page-header__eyebrow">
            <span className="mr">विद्यार्थी पोर्टल</span>
            <span className="en">Student Portal</span>
          </div>
          <h1>
            <span className="mr">
              {mode === 'register' ? 'नवीन विद्यार्थी नोंदणी' : 'विद्यार्थी लॉगिन'}
            </span>
            <span className="en">
              {mode === 'register' ? 'Student Registration' : 'Student Login'}
            </span>
          </h1>
          <p>
            <span className="mr">
              {mode === 'register'
                ? 'दिशा परिवार शिष्यवृत्ती अर्जासाठी नोंदणी करा'
                : 'तुमच्या खात्यात लॉगिन करा व अर्जाची स्थिती पहा'}
            </span>
            <span className="en">
              {mode === 'register'
                ? 'Register for Disha Pariwar Scholarship Application'
                : 'Log in to track and manage your scholarship applications'}
            </span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '520px' }}>
          {/* Mode Switcher Tabs */}
          <div
            style={{
              display: 'flex',
              background: 'var(--cream-dark)',
              borderRadius: '8px',
              padding: '4px',
              marginBottom: '20px',
              border: '1px solid var(--border)',
            }}
          >
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setError('');
              }}
              style={{
                flex: 1,
                padding: '10px 14px',
                border: 'none',
                borderRadius: '6px',
                background: mode === 'register' ? '#ffffff' : 'transparent',
                fontWeight: mode === 'register' ? 700 : 500,
                color: mode === 'register' ? 'var(--red)' : 'var(--ink-soft)',
                boxShadow: mode === 'register' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <UserPlus size={16} />
              <span className="mr">नवीन नोंदणी</span>
              <span className="en">Register</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError('');
              }}
              style={{
                flex: 1,
                padding: '10px 14px',
                border: 'none',
                borderRadius: '6px',
                background: mode === 'login' ? '#ffffff' : 'transparent',
                fontWeight: mode === 'login' ? 700 : 500,
                color: mode === 'login' ? 'var(--red)' : 'var(--ink-soft)',
                boxShadow: mode === 'login' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <LogIn size={16} />
              <span className="mr">विद्यार्थी लॉगिन</span>
              <span className="en">Login</span>
            </button>
          </div>

          <div className="section-card">
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <CheckCircle2 size={48} color="var(--success)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--success)', marginBottom: '8px' }}>
                  <span className="mr">{mode === 'register' ? 'नोंदणी यशस्वी!' : 'लॉगिन यशस्वी!'}</span>
                  <span className="en">{mode === 'register' ? 'Registration Successful!' : 'Login Successful!'}</span>
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-mid)' }}>
                  <span className="mr">तुम्हाला पुनर्निर्देशित केले जात आहे...</span>
                  <span className="en">Redirecting...</span>
                </p>
              </div>
            ) : mode === 'register' ? (
              <form onSubmit={handleRegisterSubmit}>
                {error && (
                  <div
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid var(--red)',
                      padding: '10px 14px',
                      borderRadius: '6px',
                      color: 'var(--red)',
                      fontSize: '13px',
                      marginBottom: '16px',
                    }}
                  >
                    {error}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">
                    <span className="mr">विद्यार्थ्याचे पूर्ण नाव *</span>
                    <span className="en">Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="उदा: सुशांत प्रकाश गायकवाड"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="mr">मोबाईल नंबर (WhatsApp) *</span>
                    <span className="en">Mobile Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="98XXXXXXXX"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="mr">ईमेल पत्ता / Email</span>
                    <span className="en">Email Address</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@gmail.com"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="mr">जिल्हा (महाराष्ट्र) *</span>
                    <span className="en">District (Maharashtra) *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    placeholder="उदा: कोल्हापूर / नाशिक / पुणे"
                    className="form-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-red"
                  style={{ width: '100%', marginTop: '10px' }}
                >
                  <UserPlus size={16} />
                  <span className="mr">{loading ? 'नोंदणी होत आहे...' : 'नोंदणी करा व अर्ज भरा'}</span>
                  <span className="en">{loading ? 'Registering...' : 'Register & Proceed to Apply'}</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleLoginSubmit}>
                {error && (
                  <div
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid var(--red)',
                      padding: '10px 14px',
                      borderRadius: '6px',
                      color: 'var(--red)',
                      fontSize: '13px',
                      marginBottom: '16px',
                    }}
                  >
                    {error}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">
                    <span className="mr">नोंदणीकृत मोबाईल किंवा संदर्भ क्रमांक *</span>
                    <span className="en">Registered Mobile or Reference ID *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={loginData.identifier}
                    onChange={(e) => setLoginData({ ...loginData, identifier: e.target.value })}
                    placeholder="98XXXXXXXX किंवा DP-2026-XXXX"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="mr">पासवर्ड / Password (ऐच्छिक / Demo)</span>
                    <span className="en">Password (Optional in Demo Mode)</span>
                  </label>
                  <input
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="••••••••"
                    className="form-input"
                  />
                  <div style={{ fontSize: '11.5px', color: 'var(--ink-soft)', marginTop: '4px' }}>
                    <span className="mr">डेमो: 9876543210 किंवा 9123456780 वापरू शकता</span>
                    <span className="en">Demo: Try 9876543210 or 9123456780</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-red"
                  style={{ width: '100%', marginTop: '10px' }}
                >
                  <LogIn size={16} />
                  <span className="mr">{loading ? 'लॉगिन होत आहे...' : 'लॉगिन करा'}</span>
                  <span className="en">{loading ? 'Logging in...' : 'Log In'}</span>
                </button>
              </form>
            )}

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--ink-soft)' }}>
              <span className="mr">प्रशासक आहात का? </span>
              <span className="en">Are you a trust admin? </span>
              <Link to="/admin" style={{ color: 'var(--red)', fontWeight: 600 }}>
                <span className="mr">प्रशासक पोर्टलवर जा</span>
                <span className="en">Go to Admin Portal</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
