import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  Shield,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  Eye,
  LogOut,
  Lock,
  UserCheck,
  Building,
  GraduationCap
} from 'lucide-react';

const AdminPage = () => {
  const { t, user, isAdmin, login, logout, showNotification } = useApp();
  const [adminAuthInput, setAdminAuthInput] = useState({
    username: '',
    password: '',
  });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [applications, setApplications] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedApp, setSelectedApp] = useState(null);
  const [statusRemark, setStatusRemark] = useState('');
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const res = await api.getApplications();
    if (res.success && res.data) {
      setApplications(res.data);
      setFiltered(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  useEffect(() => {
    let result = [...applications];
    if (statusFilter !== 'ALL') {
      result = result.filter(a => a.status === statusFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a => 
        (a.referenceNumber && a.referenceNumber.toLowerCase().includes(q)) ||
        (a.studentName && a.studentName.toLowerCase().includes(q)) ||
        (a.district && a.district.toLowerCase().includes(q)) ||
        (a.collegeName && a.collegeName.toLowerCase().includes(q))
      );
    }
    setFiltered(result);
  }, [searchQuery, statusFilter, applications]);

  const handleAdminLogin = async (e) => {
    if (e) e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    const res = await login({
      identifier: adminAuthInput.username || 'admin',
      password: adminAuthInput.password || 'disha2026',
      role: 'ADMIN',
    });
    setAuthLoading(false);

    if (res.success) {
      showNotification(t('प्रशासक लॉगिन यशस्वी!', 'Admin logged in successfully!'), 'success');
    } else {
      setAuthError(res.error || t('अवैध क्रेडेन्शियल्स. कृपया तपासा.', 'Invalid credentials. Please verify.'));
    }
  };

  const handleQuickDemoLogin = async () => {
    setAuthLoading(true);
    const res = await login({
      identifier: 'admin',
      password: 'disha2026',
      role: 'ADMIN',
    });
    setAuthLoading(false);
    if (res.success) {
      showNotification(t('प्रशासक डेमो मोड सुरू झाला.', 'Admin demo access granted.'), 'success');
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!selectedApp) return;
    setUpdating(true);
    const res = await api.updateStatus(selectedApp.referenceNumber, newStatus, statusRemark || `Status set to ${newStatus}`);
    if (res.success) {
      setSelectedApp(res.data);
      showNotification(t(`स्थिती अद्यतनित केली: ${newStatus}`, `Status updated to ${newStatus}`), 'success');
      await loadData();
    }
    setUpdating(false);
  };

  const getBadge = (status) => {
    switch (status) {
      case 'APPROVED':
        return <span className="badge badge-success">✓ Approved</span>;
      case 'REJECTED':
        return <span className="badge badge-danger">✕ Rejected</span>;
      case 'DOCUMENTS_PENDING':
        return <span className="badge badge-warning">⚠️ Docs Pending</span>;
      default:
        return <span className="badge badge-info">⏳ In Review</span>;
    }
  };

  // If NOT logged in as Admin, show the secure Admin Login gate
  if (!isAdmin) {
    return (
      <div>
        <div className="page-header">
          <div className="page-header__inner">
            <div className="page-header__eyebrow">
              <span className="mr">प्रशासक सुरक्षा</span>
              <span className="en">Trust Admin Security</span>
            </div>
            <h1>
              <span className="mr">दिशा परिवार समिती लॉगिन</span>
              <span className="en">Committee Member Login</span>
            </h1>
            <p>
              <span className="mr">अर्ज तपासणी व शिष्यवृत्ती वाटपासाठी सुरक्षित प्रवेश</span>
              <span className="en">Authorized access for scholarship application evaluation</span>
            </p>
          </div>
        </div>

        <section className="section">
          <div className="container" style={{ maxWidth: '480px' }}>
            <div className="section-card" style={{ padding: '32px 24px' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(185, 28, 28, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px',
                  }}
                >
                  <Lock size={28} color="var(--red)" />
                </div>
                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>
                  <span className="mr">प्रशासक ओळख पडताळणी</span>
                  <span className="en">Admin Identity Verification</span>
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--ink-soft)', marginTop: '4px' }}>
                  <span className="mr">कृपया तुमचे अधिकृत विश्वस्त खाते तपशील टाका</span>
                  <span className="en">Enter your trust credentials to access the review board</span>
                </p>
              </div>

              {authError && (
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
                  {authError}
                </div>
              )}

              <form onSubmit={handleAdminLogin}>
                <div className="form-group">
                  <label className="form-label">
                    <span className="mr">वापरकर्ता नाव किंवा ईमेल / Username</span>
                    <span className="en">Username or Admin Email</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={adminAuthInput.username}
                    onChange={(e) => setAdminAuthInput({ ...adminAuthInput, username: e.target.value })}
                    placeholder="admin"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="mr">गुप्त पासवर्ड / Password</span>
                    <span className="en">Password</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={adminAuthInput.password}
                    onChange={(e) => setAdminAuthInput({ ...adminAuthInput, password: e.target.value })}
                    placeholder="disha2026"
                    className="form-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="btn btn-red"
                  style={{ width: '100%', marginTop: '6px' }}
                >
                  <Shield size={16} />
                  <span className="mr">{authLoading ? 'पडताळणी चालू आहे...' : 'सुरक्षित लॉगिन करा'}</span>
                  <span className="en">{authLoading ? 'Verifying...' : 'Secure Admin Login'}</span>
                </button>
              </form>

              <div style={{ marginTop: '20px', paddingTop: '18px', borderTop: '1px dashed var(--border)', textAlign: 'center' }}>
                <p style={{ fontSize: '12px', color: 'var(--ink-soft)', marginBottom: '10px' }}>
                  <span className="mr">चाचणीसाठी त्वरित प्रवेश:</span>
                  <span className="en">Quick evaluator access:</span>
                </p>
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="btn btn-outline"
                  style={{ width: '100%', fontSize: '13px' }}
                >
                  <UserCheck size={16} />
                  <span className="mr">1-Click डेमो प्रशासक म्हणून लॉगिन करा</span>
                  <span className="en">1-Click Demo Admin Login</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // If authenticated as Admin, show the Full Review Panel
  return (
    <div>
      <div className="page-header">
        <div className="page-header__inner">
          <div className="page-header__eyebrow">
            <span className="mr">प्रशासक दालन</span>
            <span className="en">Trust Admin Portal</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1>
                <span className="mr">शिष्यवृत्ती अर्ज छाननी व व्यवस्थापन</span>
                <span className="en">Scholarship Applications Review</span>
              </h1>
              <p>
                <span className="mr">समिती सदस्यांसाठी अर्ज तपासणी, कागदपत्र पडताळणी आणि मंजुरी पॅनेल</span>
                <span className="en">Review panel for verification, scoring, and grant sanctioning</span>
              </p>
            </div>

            {/* Admin Session Strip */}
            <div
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                padding: '10px 16px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <div style={{ color: '#ffffff', fontSize: '13px' }}>
                <strong>{user?.name || 'Administrator'}</strong>
                <div style={{ opacity: 0.8, fontSize: '11px' }}>{user?.email || 'Admin Board'}</div>
              </div>
              <button
                type="button"
                onClick={logout}
                className="btn btn-outline"
                style={{
                  background: '#ffffff',
                  color: 'var(--red)',
                  borderColor: '#ffffff',
                  padding: '4px 10px',
                  fontSize: '12px',
                  height: '32px'
                }}
              >
                <LogOut size={13} />
                <span className="mr">लॉगआउट</span>
                <span className="en">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Statistics summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: '14px', marginBottom: '24px' }}>
            <div className="section-card" style={{ padding: '16px' }}>
              <div style={{ color: 'var(--ink-soft)', fontSize: '12px', fontWeight: 600 }}>
                {t('एकूण अर्ज', 'Total Applications')}
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)', marginTop: '4px' }}>
                {applications.length}
              </div>
            </div>
            <div className="section-card" style={{ padding: '16px' }}>
              <div style={{ color: 'var(--ink-soft)', fontSize: '12px', fontWeight: 600 }}>
                {t('छाननी चालू', 'Under Review')}
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)', marginTop: '4px' }}>
                {applications.filter(a => a.status === 'UNDER_REVIEW').length}
              </div>
            </div>
            <div className="section-card" style={{ padding: '16px' }}>
              <div style={{ color: 'var(--ink-soft)', fontSize: '12px', fontWeight: 600 }}>
                {t('मंजूर शिष्यवृत्ती', 'Approved')}
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--success)', marginTop: '4px' }}>
                {applications.filter(a => a.status === 'APPROVED').length}
              </div>
            </div>
            <div className="section-card" style={{ padding: '16px' }}>
              <div style={{ color: 'var(--ink-soft)', fontSize: '12px', fontWeight: 600 }}>
                {t('कागदपत्रे बाकी', 'Docs Pending')}
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#d97706', marginTop: '4px' }}>
                {applications.filter(a => a.status === 'DOCUMENTS_PENDING').length}
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="section-card" style={{ marginBottom: '24px', display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '12px', flex: 1, minWidth: '260px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                <Search size={18} color="var(--ink-soft)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t('नाव, क्रमांक, कॉलेज किंवा जिल्ह्याने शोधा...', 'Search by name, ID, college, district...')}
                  className="form-input"
                  style={{ paddingLeft: '38px', height: '40px' }}
                />
              </div>

              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="form-select"
                style={{ width: 'auto', minWidth: '150px', height: '40px', flexGrow: 1 }}
              >
                <option value="ALL">सर्व अर्ज / All ({applications.length})</option>
                <option value="UNDER_REVIEW">छाननी चालू / Review</option>
                <option value="APPROVED">मंजूर / Approved</option>
                <option value="DOCUMENTS_PENDING">कागदपत्रे बाकी / Pending Docs</option>
                <option value="REJECTED">नामंजूर / Rejected</option>
              </select>
            </div>

            <button type="button" onClick={loadData} className="btn btn-outline" style={{ height: '40px' }}>
              <RefreshCw size={15} />
              <span className="mr">रिफ्रेश</span><span className="en">Refresh</span>
            </button>
          </div>

          {/* Applications Table */}
          <div className="section-card table-responsive" style={{ padding: 0 }}>
            <table style={{ width: '100%', minWidth: '680px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
              <thead>
                <tr style={{ background: 'var(--cream-dark)', borderBottom: '2px solid var(--border)' }}>
                  <th style={{ padding: '14px 16px', fontWeight: 700 }}>संदर्भ क्र. / ID</th>
                  <th style={{ padding: '14px 16px', fontWeight: 700 }}>विद्यार्थी / Student</th>
                  <th style={{ padding: '14px 16px', fontWeight: 700 }}>अभ्यासक्रम व कॉलेज / Course</th>
                  <th style={{ padding: '14px 16px', fontWeight: 700 }}>१०वी % / उत्पन्न</th>
                  <th style={{ padding: '14px 16px', fontWeight: 700 }}>स्थिती / Status</th>
                  <th style={{ padding: '14px 16px', fontWeight: 700, textAlign: 'right' }}>कृती / Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--ink-soft)' }}>
                      लोड होत आहे / Loading applications...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--ink-soft)' }}>
                      कोणतेही अर्ज आढळले नाहीत / No matching applications found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((app) => (
                    <tr key={app.referenceNumber} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 700, color: 'var(--red)', whiteSpace: 'nowrap' }}>
                        {app.referenceNumber}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 600 }}>{app.studentName}</div>
                        <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>{app.district} • {app.mobile}</div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div>{app.course}</div>
                        <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>{app.collegeName}</div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div><strong>{app.marks10th}%</strong></div>
                        <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>₹{Number(app.familyIncome || 0).toLocaleString('en-IN')}/वर्ष</div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        {getBadge(app.status)}
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedApp(app);
                            setStatusRemark(app.remarks || '');
                          }}
                          className="btn btn-outline"
                          style={{ padding: '6px 12px', fontSize: '12.5px', height: '32px' }}
                        >
                          <Eye size={14} />
                          <span>पहा / Review</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Application Detail & Decision Modal */}
          {selectedApp && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '16px'
              }}
              role="dialog"
              aria-modal="true"
            >
              <div
                className="section-card"
                style={{
                  maxWidth: '650px',
                  width: '100%',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      अर्जाचा तपशील / Review Application
                    </span>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '4px 0 0' }}>
                      {selectedApp.studentName} ({selectedApp.referenceNumber})
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedApp(null)}
                    style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '20px', color: 'var(--ink-soft)' }}
                  >
                    ✕
                  </button>
                </div>

                <div className="form-grid-2" style={{ fontSize: '13.5px', marginBottom: '16px' }}>
                  <div><strong>जिल्हा / District:</strong> {selectedApp.district}</div>
                  <div><strong>मोबाईल / Mobile:</strong> {selectedApp.mobile}</div>
                  <div><strong>अभ्यासक्रम / Course:</strong> {selectedApp.course}</div>
                  <div><strong>महाविद्यालय / College:</strong> {selectedApp.collegeName}</div>
                  <div><strong>१०वी गुण / 10th Marks:</strong> {selectedApp.marks10th}%</div>
                  <div><strong>कुटुंबाचे उत्पन्न:</strong> ₹{Number(selectedApp.familyIncome || 0).toLocaleString('en-IN')}/वर्ष</div>
                  <div><strong>सध्याची स्थिती:</strong> {getBadge(selectedApp.status)}</div>
                  <div><strong>अर्ज दिनांक:</strong> {selectedApp.appliedAt}</div>
                </div>

                {/* Status Update Actions */}
                <div style={{ background: 'var(--cream-dark)', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                  <label className="form-label" style={{ fontWeight: 700 }}>
                    समितीचा निर्णय व शेरा (Committee Decision & Remark):
                  </label>
                  <textarea
                    rows={2}
                    value={statusRemark}
                    onChange={e => setStatusRemark(e.target.value)}
                    className="form-textarea"
                    placeholder="उदा: उत्पन्नाचा दाखला बरोबर आहे / संमती पत्र जारी केले"
                  />

                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      disabled={updating}
                      onClick={() => handleUpdateStatus('APPROVED')}
                      className="btn btn-red"
                      style={{ background: 'var(--success)', fontSize: '13px', padding: '6px 14px' }}
                    >
                      <CheckCircle2 size={15} />
                      <span>मंजूर करा (Approve)</span>
                    </button>

                    <button
                      type="button"
                      disabled={updating}
                      onClick={() => handleUpdateStatus('DOCUMENTS_PENDING')}
                      className="btn btn-gold"
                      style={{ fontSize: '13px', padding: '6px 14px' }}
                    >
                      <Clock size={15} />
                      <span>कागदपत्रे प्रलंबित</span>
                    </button>

                    <button
                      type="button"
                      disabled={updating}
                      onClick={() => handleUpdateStatus('REJECTED')}
                      className="btn btn-outline"
                      style={{ color: 'var(--error)', borderColor: 'var(--error)', fontSize: '13px', padding: '6px 14px' }}
                    >
                      <XCircle size={15} />
                      <span>नामंजूर (Reject)</span>
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <button type="button" onClick={() => setSelectedApp(null)} className="btn btn-outline">
                    बंद करा / Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminPage;
