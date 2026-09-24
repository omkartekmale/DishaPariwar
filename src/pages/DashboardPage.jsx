import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { Search, CheckCircle, Clock, AlertTriangle, XCircle, FileText, Download, User, ArrowRight, RotateCcw } from 'lucide-react';

const DashboardPage = () => {
  const { t, user, isAuthenticated } = useApp();
  const [searchParams] = useSearchParams();
  const [refNumber, setRefNumber] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [appData, setAppData] = useState(null);

  const executeTrack = async (targetRef, targetMobile = '') => {
    if (!targetRef || !targetRef.trim()) {
      setErrorMsg(t('कृपया संदर्भ क्रमांक टाका (उदा: DP-2026-8492)', 'Please enter Reference Number (e.g. DP-2026-8492)'));
      return;
    }

    setLoading(true);
    setErrorMsg('');
    try {
      const res = await api.trackApplication(targetRef.trim(), targetMobile ? targetMobile.trim() : '');
      if (res.success && res.data) {
        setAppData(res.data);
      } else {
        setErrorMsg(t('या तपशिलांसह कोणताही अर्ज आढळला नाही. कृपया क्रमांक तपासा.', 'No application found with these details. Please check your reference ID.'));
        setAppData(null);
      }
    } catch (err) {
      setErrorMsg(t('तांत्रिक त्रुटी आली. कृपया पुन्हा प्रयत्न करा.', 'Technical error. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const qRef = searchParams.get('ref');
    const qMob = searchParams.get('mobile');

    if (qRef) {
      setRefNumber(qRef);
      if (qMob) setMobile(qMob);
      executeTrack(qRef, qMob || '');
    } else if (user) {
      if (user.referenceNumber) {
        setRefNumber(user.referenceNumber);
        if (user.mobile) setMobile(user.mobile);
        executeTrack(user.referenceNumber, user.mobile || '');
      } else if (user.mobile) {
        setMobile(user.mobile);
      }
    } else {
      try {
        const storedRef = localStorage.getItem('disha_recent_ref');
        const storedMob = localStorage.getItem('disha_recent_mobile');
        if (storedRef) {
          setRefNumber(storedRef);
          if (storedMob) setMobile(storedMob);
        }
      } catch {
        // ignore
      }
    }
  }, [user, searchParams]);

  const handleTrack = async (e) => {
    if (e) e.preventDefault();
    executeTrack(refNumber, mobile);
  };

  const handleFillDemo = (demoId) => {
    setRefNumber(demoId);
    setErrorMsg('');
    executeTrack(demoId, '');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'APPROVED':
        return <span className="badge badge-success">✓ {t('मंजूर / Approved', 'Approved')}</span>;
      case 'REJECTED':
        return <span className="badge badge-danger">✕ {t('नामंजूर / Rejected', 'Rejected')}</span>;
      case 'DOCUMENTS_PENDING':
        return <span className="badge badge-warning">⚠️ {t('कागदपत्रे प्रलंबित', 'Documents Pending')}</span>;
      default:
        return <span className="badge badge-info">⏳ {t('छाननी चालू आहे / In Review', 'Under Review')}</span>;
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header__inner">
          <div className="page-header__eyebrow">
            <span className="mr">विद्यार्थी दालन</span>
            <span className="en">Student Portal</span>
          </div>
          <h1>
            <span className="mr">अर्जाची सद्यस्थिती तपासा</span>
            <span className="en">Track Application Status</span>
          </h1>
          <p>
            <span className="mr">तुमच्या संदर्भ क्रमांकाद्वारे (Reference ID) अर्जाची पडताळणी प्रगती पहा</span>
            <span className="en">Check your scholarship verification progress and review notes</span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '780px' }}>
          {/* Tracking Search Form */}
          <div className="section-card" style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', color: 'var(--ink)' }}>
              🔍 <span className="mr">अर्ज शोधा / Find Application</span><span className="en">Search Application</span>
            </h3>

            <form onSubmit={handleTrack}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">
                    <span className="mr">संदर्भ क्रमांक (Reference ID) *</span>
                    <span className="en">Reference ID *</span>
                  </label>
                  <input
                    type="text"
                    value={refNumber}
                    onChange={(e) => setRefNumber(e.target.value)}
                    placeholder="उदा: DP-2026-8492"
                    className="form-input"
                    required
                  />
                  <div className="form-help">
                    <span className="mr">ऑनलाइन फॉर्म भरल्यानंतर मिळालेला क्रमांक</span>
                    <span className="en">Issued upon online submission</span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="mr">नोंदणीकृत मोबाईल नंबर</span>
                    <span className="en">Registered Mobile Number</span>
                  </label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="98XXXXXXXX"
                    className="form-input"
                  />
                  <div className="form-help">
                    <span className="mr">अर्जात नमूद केलेला १० अंकी मोबाईल</span>
                    <span className="en">10-digit phone used during application</span>
                  </div>
                </div>
              </div>

              {errorMsg && (
                <div style={{ background: 'var(--error-bg)', color: 'var(--error)', padding: '10px 14px', borderRadius: '6px', fontSize: '13px', marginBottom: '14px' }}>
                  {errorMsg}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" disabled={loading} className="btn btn-red" style={{ flex: 1 }}>
                  <Search size={16} />
                  <span>{loading ? t('शोधत आहे...', 'Searching...') : t('स्थिती तपासा', 'Track Status')}</span>
                </button>
                {appData && (
                  <button
                    type="button"
                    onClick={() => { setAppData(null); setRefNumber(''); setMobile(''); setErrorMsg(''); }}
                    className="btn btn-outline"
                    title={t('नवीन शोध घ्या', 'Reset Search')}
                    style={{ padding: '0 14px' }}
                  >
                    <RotateCcw size={15} />
                    <span className="mr">रीसेट</span>
                    <span className="en">Reset</span>
                  </button>
                )}
              </div>
            </form>

            {/* Quick Demo Hint */}
            <div style={{ marginTop: '14px', fontSize: '12.5px', color: 'var(--ink-soft)', background: 'var(--cream)', padding: '10px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', border: '1px solid var(--border)' }}>
              <span>💡 <span className="mr">चाचणीसाठी थेट क्लिक करा:</span><span className="en">Quick test click:</span></span>
              <button
                type="button"
                onClick={() => handleFillDemo('DP-2026-8492')}
                className="btn btn-outline"
                style={{ padding: '3px 9px', fontSize: '12px', height: '28px', color: 'var(--red)', borderColor: 'var(--red-mid)', background: 'var(--white)' }}
              >
                DP-2026-8492
              </button>
              <button
                type="button"
                onClick={() => handleFillDemo('DP-2026-7215')}
                className="btn btn-outline"
                style={{ padding: '3px 9px', fontSize: '12px', height: '28px', color: 'var(--red)', borderColor: 'var(--red-mid)', background: 'var(--white)' }}
              >
                DP-2026-7215
              </button>
            </div>
          </div>

          {/* Application Details Display */}
          {appData && (
            <div className="section-card" style={{ borderTop: '4px solid var(--red)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '16px', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--ink-soft)', textTransform: 'uppercase' }}>
                    <span className="mr">अर्ज संदर्भ क्रमांक</span>
                    <span className="en">Reference ID</span>
                  </div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--red-deep)' }}>
                    {appData.referenceNumber}
                  </div>
                </div>
                <div>{getStatusBadge(appData.status)}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>
                    <span className="mr">विद्यार्थ्याचे नाव</span><span className="en">Student Name</span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{appData.studentName}</div>
                </div>

                <div>
                  <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>
                    <span className="mr">अभ्यासक्रम</span><span className="en">Course</span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{appData.course || 'Degree / Diploma'}</div>
                </div>

                <div>
                  <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>
                    <span className="mr">महाविद्यालय</span><span className="en">College</span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{appData.collegeName || 'Engineering / Polytechnic'}</div>
                </div>

                <div>
                  <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>
                    <span className="mr">जिल्हा</span><span className="en">District</span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{appData.district || 'Maharashtra'}</div>
                </div>
              </div>

              {/* Status Timeline */}
              <div style={{ background: 'var(--cream)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>
                  <span className="mr">प्रगती टप्पे (Application Progress)</span>
                  <span className="en">Application Review Stages</span>
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <CheckCircle size={18} color="var(--success)" />
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>
                      <span className="mr">१. ऑनलाइन नोंदणी पूर्ण झाली</span>
                      <span className="en">1. Online Registration Completed</span>
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <CheckCircle size={18} color="var(--success)" />
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>
                      <span className="mr">२. कागदपत्रे व ऑफलाइन फॉर्म छाननी</span>
                      <span className="en">2. Document & Offline Form Scrutiny</span>
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <Clock size={18} color={appData.status === 'APPROVED' ? 'var(--success)' : 'var(--warning)'} />
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>
                      <span className="mr">३. ट्रस्ट कमिटी निर्णय व शिष्यवृत्ती वाटप</span>
                      <span className="en">3. Trust Committee Decision & Disbursement</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Committee Remarks */}
              {appData.remarks && (
                <div style={{ background: 'var(--info-bg)', borderLeft: '4px solid var(--info)', padding: '14px 16px', borderRadius: '6px', fontSize: '13px' }}>
                  <strong><span className="mr">कमिटी शेरा / शेरे: </span><span className="en">Reviewer Remarks: </span></strong>
                  <span>{appData.remarks}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
