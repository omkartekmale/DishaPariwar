import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { CheckCircle2, ChevronRight, ChevronLeft, Download, FileText, AlertCircle } from 'lucide-react';

const ApplyPage = () => {
  const { t, user, updateUser, showNotification } = useApp();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    // Step 1: Personal
    studentName: '',
    gender: 'MALE',
    dob: '',
    mobile: '',
    email: '',
    aadhaarNumber: '',
    category: 'OPEN',
    district: 'Pune (पुणे)',
    address: '',
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    annualIncome: '',

    // Step 2: Academic
    marks10th: '',
    board10th: 'SSC Maharashtra',
    marks12th: '',
    marksDiploma: '',
    courseName: 'B.Tech / B.E. (Engineering)',
    yearOfStudy: '1st Year',
    collegeName: '',
    collegeCity: '',
    entranceExam: '',
    entranceScore: '',

    // Step 3: Financials & Needs
    totalCollegeFee: '',
    govtScholarshipReceived: 'NO',
    govtScholarshipAmount: '',
    hostelFee: '',
    requestedAmount: '',
    bankAccountNo: '',
    bankIfsc: '',
    declarationAgreed: false
  });

  // Prefill from authenticated student account if available
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        studentName: prev.studentName || user.fullName || user.name || '',
        mobile: prev.mobile || user.mobile || '',
        email: prev.email || user.email || '',
        district: prev.district || user.district || 'Pune (पुणे)',
        courseName: user.course || prev.courseName
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrorMsg('');
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.studentName.trim()) return t('कृपया विद्यार्थ्याचे पूर्ण नाव प्रविष्ट करा', 'Please enter student full name');
      if (!formData.mobile.trim() || formData.mobile.length < 10) return t('कृपया १० अंकी वैध मोबाईल नंबर प्रविष्ट करा', 'Please enter a valid 10-digit mobile number');
      if (!formData.annualIncome) return t('कृपया वार्षिक कौटुंबिक उत्पन्न प्रविष्ट करा', 'Please specify annual family income');
      if (Number(formData.annualIncome) > 800000) return t('कौटुंबिक उत्पन्न ₹८ लाखांपेक्षा कमी असणे आवश्यक आहे', 'Family income must be below ₹8,00,000 for eligibility');
    } else if (step === 2) {
      if (!formData.marks10th) return t('कृपया १०वीचे गुण/टक्केवारी प्रविष्ट करा', 'Please enter 10th marks percentage');
      if (!formData.collegeName.trim()) return t('कृपया महाविद्यालयाचे नाव प्रविष्ट करा', 'Please enter college name');
    } else if (step === 3) {
      if (!formData.totalCollegeFee) return t('कृपया चालू वर्षाची एकूण फी प्रविष्ट करा', 'Please enter annual college fee');
      if (!formData.declarationAgreed) return t('कृपया नियम व अटी मान्य करा (चेकबॉक्स निवडा)', 'Please agree to the terms and declaration');
    }
    return '';
  };

  const handleNext = () => {
    const err = validateStep();
    if (err) {
      setErrorMsg(err);
      return;
    }
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setErrorMsg('');
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateStep();
    if (err) {
      setErrorMsg(err);
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await api.submitApplication(formData);
      if (res.success) {
        const refId = res.data?.referenceNumber || res.referenceNumber;
        const finalData = res.data || { ...formData, referenceNumber: refId };
        setSubmittedData(finalData);
        try {
          if (refId) localStorage.setItem('disha_recent_ref', refId);
          if (formData.mobile) localStorage.setItem('disha_recent_mobile', formData.mobile);
        } catch {
          // ignore
        }
        if (user) {
          updateUser({ referenceNumber: refId, mobile: formData.mobile, fullName: formData.studentName });
        }
        showNotification(
          t(`अर्ज यशस्वीरीत्या जमा झाला! संदर्भ क्र: ${refId}`, `Application submitted! Ref ID: ${refId}`),
          'success'
        );
      } else {
        setErrorMsg(res.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Error submitting application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Success Confirmation Screen
  if (submittedData) {
    return (
      <div className="section">
        <div className="container" style={{ maxWidth: '680px' }}>
          <div className="section-card" style={{ textAlign: 'center', padding: '40px 28px', borderTop: '5px solid var(--success)' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
              <CheckCircle2 size={40} color="var(--success)" />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--success)', marginBottom: '8px' }}>
              <span className="mr">ऑनलाइन अर्ज यशस्वीरीत्या जमा झाला!</span>
              <span className="en">Online Application Submitted Successfully!</span>
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--ink-mid)', marginBottom: '24px' }}>
              <span className="mr">तुमचा अर्ज दिशा परिवार चॅरिटेबल ट्रस्टकडे नोंदवला गेला आहे.</span>
              <span className="en">Your application is recorded with Disha Pariwar Charitable Trust.</span>
            </p>

            <div style={{ background: 'var(--cream)', padding: '20px', borderRadius: '8px', marginBottom: '24px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '13px', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <span className="mr">तुमचा अर्ज संदर्भ क्रमांक</span>
                <span className="en">Your Application Reference Number</span>
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--red-deep)', letterSpacing: '0.04em', margin: '8px 0' }}>
                {submittedData.referenceNumber}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>
                <span className="mr">कृपया हा क्रमांक जपून ठेवा. पुढील सर्व संदर्भांसाठी हा आवश्यक आहे.</span>
                <span className="en">Please save this reference ID for tracking and postal dispatch.</span>
              </div>
            </div>

            <div style={{ background: 'var(--warning-bg)', padding: '16px', borderRadius: '8px', textAlign: 'left', marginBottom: '24px', borderLeft: '4px solid var(--warning)' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#9A5A0A', marginBottom: '6px' }}>
                <span className="mr">पुढील पायरी (Next Step):</span>
                <span className="en">Next Mandatory Step:</span>
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--ink)', lineHeight: '1.6' }}>
                <span className="mr">
                  १. खालील बटणावरून <strong>ऑफलाइन अर्ज (PDF)</strong> डाऊनलोड करा.<br />
                  २. फॉर्म भरून त्यावर तुमचा Reference Number (<strong>{submittedData.referenceNumber}</strong>) लिहा.<br />
                  ३. सर्व कागदपत्रांच्या स्वाक्षरी केलेल्या प्रतींसह <strong>पुणे कार्यालयाच्या पत्त्यावर</strong> पाठवा.
                </span>
                <span className="en">
                  1. Download the <strong>Offline PDF Form</strong> below.<br />
                  2. Fill it and clearly write your Reference Number (<strong>{submittedData.referenceNumber}</strong>) on it.<br />
                  3. Post all self-attested documents to the <strong>Pune Office</strong>.
                </span>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/assets/scholarship_arj_form.pdf" download className="btn btn-gold">
                <Download size={16} />
                <span className="mr">ऑफलाइन अर्ज फॉर्म डाऊनलोड</span>
                <span className="en">Download PDF Form</span>
              </a>
              <Link to={`/dashboard?ref=${encodeURIComponent(submittedData.referenceNumber)}&mobile=${encodeURIComponent(formData.mobile || '')}`} className="btn btn-red">
                <span className="mr">अर्जाची स्थिती तपासा</span>
                <span className="en">Track Application</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-header__inner">
          <div className="page-header__eyebrow">
            <span className="mr">नोंदणी</span>
            <span className="en">Registration</span>
          </div>
          <h1>
            <span className="mr">शिष्यवृत्ती ऑनलाइन अर्ज फॉर्म</span>
            <span className="en">Online Scholarship Application Form</span>
          </h1>
          <p>
            <span className="mr">शैक्षणिक वर्ष २०२६-२७ · गुणवंत व गरजू विद्यार्थ्यांसाठी</span>
            <span className="en">Academic Year 2026-27 · For Meritorious & Deserving Students</span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '780px' }}>
          {/* Step Progress Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: '28px', gap: '8px' }}>
            {[
              { n: 1, mr: 'वैयक्तिक माहिती', en: 'Personal Info' },
              { n: 2, mr: 'शैक्षणिक तपशील', en: 'Academic Details' },
              { n: 3, mr: 'फी व घोषणापत्र', en: 'Fees & Declaration' }
            ].map(s => (
              <div key={s.n} style={{ textAlign: 'center', flex: 1, position: 'relative' }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: step >= s.n ? 'var(--red)' : 'var(--white)',
                  color: step >= s.n ? '#fff' : 'var(--ink-soft)',
                  border: `2px solid ${step >= s.n ? 'var(--red)' : 'var(--border)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 6px',
                  fontWeight: 700,
                  fontSize: '13px'
                }}>
                  {s.n}
                </div>
                <div style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', fontWeight: step === s.n ? 700 : 500, color: step === s.n ? 'var(--red)' : 'var(--ink-soft)', lineHeight: 1.3 }}>
                  <span className="mr">{s.mr}</span>
                  <span className="en">{s.en}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Form Error Banner */}
          {errorMsg && (
            <div style={{ background: 'var(--error-bg)', color: 'var(--error)', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', border: '1px solid #F5B5B0' }}>
              <AlertCircle size={18} />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="section-card">
            <form onSubmit={handleSubmit}>
              {/* STEP 1: Personal & Family Information */}
              {step === 1 && (
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: 'var(--red-deep)', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                    👤 <span className="mr">पायरी १: वैयक्तिक व कौटुंबिक माहिती</span><span className="en">Step 1: Personal & Family Information</span>
                  </h3>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="mr">विद्यार्थ्याचे पूर्ण नाव (मार्कशीटनुसार) *</span>
                      <span className="en">Student Full Name (As per Marksheet) *</span>
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="उदा: पाटील राहुल सुरेश / Rahul Suresh Patil"
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">
                        <span className="mr">लिंग / Gender *</span>
                        <span className="en">Gender *</span>
                      </label>
                      <select name="gender" value={formData.gender} onChange={handleChange} className="form-select">
                        <option value="MALE">पुरुष / Male</option>
                        <option value="FEMALE">स्त्री / Female</option>
                        <option value="OTHER">इतर / Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <span className="mr">जन्मतारीख / Date of Birth</span>
                        <span className="en">Date of Birth</span>
                      </label>
                      <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="form-input" />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">
                        <span className="mr">मोबाईल नंबर (WhatsApp) *</span>
                        <span className="en">Mobile Number (WhatsApp) *</span>
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        maxLength={10}
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="98XXXXXXXX"
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <span className="mr">ईमेल आयडी / Email Address</span>
                        <span className="en">Email Address</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="student@example.com"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">
                        <span className="mr">प्रवर्ग / Caste Category *</span>
                        <span className="en">Category *</span>
                      </label>
                      <select name="category" value={formData.category} onChange={handleChange} className="form-select">
                        <option value="OPEN">OPEN / General</option>
                        <option value="EWS">EWS</option>
                        <option value="OBC">OBC</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                        <option value="VJNT">VJNT / NT</option>
                        <option value="SBC">SBC</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <span className="mr">जिल्हा (महाराष्ट्र) *</span>
                        <span className="en">District (Maharashtra) *</span>
                      </label>
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        placeholder="उदा: सातारा, पुणे, सोलापूर..."
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">
                        <span className="mr">वडिलांचे नाव व व्यवसाय</span>
                        <span className="en">Father's Name & Occupation</span>
                      </label>
                      <input
                        type="text"
                        name="fatherOccupation"
                        value={formData.fatherOccupation}
                        onChange={handleChange}
                        placeholder="उदा: शेती / शेतमजूर / चालक"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <span className="mr">कौटुंबिक वार्षिक उत्पन्न (₹) *</span>
                        <span className="en">Annual Family Income (₹) *</span>
                      </label>
                      <input
                        type="number"
                        name="annualIncome"
                        value={formData.annualIncome}
                        onChange={handleChange}
                        placeholder="उदा: 65000"
                        className="form-input"
                        required
                      />
                      <div className="form-help">
                        <span className="mr">₹८ लाखांपेक्षा कमी असणे आवश्यक (तहसीलदार दाखल्यानुसार)</span>
                        <span className="en">Must be below ₹8,00,000 as per Tahsildar Certificate</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Academic Details */}
              {step === 2 && (
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: 'var(--red-deep)', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                    🎓 <span className="mr">पायरी २: शैक्षणिक माहिती</span><span className="en">Step 2: Academic Information</span>
                  </h3>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">
                        <span className="mr">१०वी गुण टक्केवारी (%) *</span>
                        <span className="en">10th Marks (%) *</span>
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        name="marks10th"
                        value={formData.marks10th}
                        onChange={handleChange}
                        placeholder="उदा: 85.40"
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <span className="mr">१२वी / डिप्लोमा टक्केवारी (लागू असल्यास)</span>
                        <span className="en">12th / Diploma Marks (If applicable)</span>
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        name="marks12th"
                        value={formData.marks12th}
                        onChange={handleChange}
                        placeholder="उदा: 78.50"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="mr">प्रवेश घेतलेला अभ्यासक्रम / Course Admitted *</span>
                      <span className="en">Admitted Course *</span>
                    </label>
                    <input
                      type="text"
                      name="courseName"
                      value={formData.courseName}
                      onChange={handleChange}
                      placeholder="उदा: B.Tech Computer Engineering / Diploma Mechanical"
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="mr">महाविद्यालयाचे नाव व ठिकाण *</span>
                      <span className="en">College Name & Location *</span>
                    </label>
                    <input
                      type="text"
                      name="collegeName"
                      value={formData.collegeName}
                      onChange={handleChange}
                      placeholder="उदा: Government College of Engineering, Karad"
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">
                        <span className="mr">प्रवेश परीक्षा (JEE/CET/NEET)</span>
                        <span className="en">Entrance Exam (If any)</span>
                      </label>
                      <input
                        type="text"
                        name="entranceExam"
                        value={formData.entranceExam}
                        onChange={handleChange}
                        placeholder="MHT-CET / JEE Main"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <span className="mr">परीक्षेचे गुण / पर्सेन्टाईल</span>
                        <span className="en">Percentile / Marks</span>
                      </label>
                      <input
                        type="text"
                        name="entranceScore"
                        value={formData.entranceScore}
                        onChange={handleChange}
                        placeholder="उदा: 92.50 %ile"
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Fees & Declaration */}
              {step === 3 && (
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: 'var(--red-deep)', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                    💰 <span className="mr">पायरी ३: कॉलेज फी व स्वयंघोषणा</span><span className="en">Step 3: College Fees & Declaration</span>
                  </h3>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">
                        <span className="mr">महाविद्यालयाची एकूण वार्षिक फी (₹) *</span>
                        <span className="en">Total Annual College Fee (₹) *</span>
                      </label>
                      <input
                        type="number"
                        name="totalCollegeFee"
                        value={formData.totalCollegeFee}
                        onChange={handleChange}
                        placeholder="उदा: 45000"
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <span className="mr">शासकीय सवलत / शिष्यवृत्ती मिळते का?</span>
                        <span className="en">Receiving Govt Scholarship / Concession?</span>
                      </label>
                      <select name="govtScholarshipReceived" value={formData.govtScholarshipReceived} onChange={handleChange} className="form-select">
                        <option value="NO">नाही / No</option>
                        <option value="YES">होय (EBC / OBC / महाडीबीटी) / Yes</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="mr">अपेक्षित शिष्यवृत्ती सहाय्य रक्कम (₹)</span>
                      <span className="en">Estimated Assistance Requested (₹)</span>
                    </label>
                    <input
                      type="number"
                      name="requestedAmount"
                      value={formData.requestedAmount}
                      onChange={handleChange}
                      placeholder="उदा: 25000"
                      className="form-input"
                    />
                  </div>

                  {/* Declaration Box */}
                  <div style={{ background: 'var(--cream)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)', marginTop: '20px', marginBottom: '20px' }}>
                    <label style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        name="declarationAgreed"
                        checked={formData.declarationAgreed}
                        onChange={handleChange}
                        style={{ marginTop: '4px', width: '18px', height: '18px', accentColor: 'var(--red)' }}
                        required
                      />
                      <span style={{ fontSize: '13px', color: 'var(--ink)', lineHeight: '1.6' }}>
                        <span className="mr">
                          मी याद्वारे जाहीर करतो/करते की वरील सर्व माहिती माझ्या माहितीनुसार खरी व बिनचूक आहे. कोणत्याही टप्प्यावर माहिती खोटी आढळल्यास अर्ज रद्द करण्यास माझी संमती आहे. ऑनलाइन नोंदणीनंतर मी ऑफलाइन फॉर्म व कागदपत्रे वेळेत जमा करण्याचे वचन देतो/देते.
                        </span>
                        <span className="en">
                          I hereby declare that all information provided above is true and accurate. I understand that falsification will lead to immediate disqualification. I commit to dispatching the offline physical form and self-attested documents to the trust office.
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '28px', borderTop: '1px solid var(--border)', paddingTop: '18px' }}>
                {step > 1 ? (
                  <button type="button" onClick={handlePrev} className="btn btn-outline">
                    <ChevronLeft size={16} />
                    <span className="mr">मागील पायरी</span>
                    <span className="en">Previous</span>
                  </button>
                ) : <div />}

                {step < 3 ? (
                  <button type="button" onClick={handleNext} className="btn btn-red">
                    <span className="mr">पुढील पायरी</span>
                    <span className="en">Next Step</span>
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button type="submit" disabled={submitting} className="btn btn-red" style={{ minWidth: '160px' }}>
                    {submitting ? (
                      <span>{t('अर्ज जमा होत आहे...', 'Submitting...')}</span>
                    ) : (
                      <>
                        <span className="mr">अर्ज सबमिट करा</span>
                        <span className="en">Submit Application</span>
                        <CheckCircle2 size={16} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplyPage;
