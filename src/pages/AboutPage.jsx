import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, XCircle, Award, Users, BookOpen, HeartHandshake } from 'lucide-react';

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <div>
      <div className="page-header">
        <div className="page-header__inner">
          <div className="page-header__eyebrow">
            <span className="mr">शिष्यवृत्ती</span>
            <span className="en">Scholarship</span>
          </div>
          <h1>
            <span className="mr">शिष्यवृत्ती बद्दल आणि संस्था परिचय</span>
            <span className="en">About the Scholarship & Trust</span>
          </h1>
          <p>
            <span className="mr">पात्रता, रक्कम, अटी — सर्व माहिती एका ठिकाणी</span>
            <span className="en">Eligibility, coverage, terms — everything in one place</span>
          </p>
        </div>
      </div>

      <section className="section section-alt">
        <div className="container" style={{ maxWidth: '860px' }}>
          {/* Who we are */}
          <div style={{ marginBottom: '48px' }}>
            <div className="section__eyebrow">
              <span className="mr">आमच्याबद्दल</span>
              <span className="en">About Us</span>
            </div>
            <h2 className="section__title" style={{ textAlign: 'left', marginBottom: '20px' }}>
              <span className="mr">आम्ही फक्त दोन हातांमधील अंतर कमी करतो</span>
              <span className="en">We simply reduce the distance between two hands</span>
            </h2>
            <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--ink-mid)', marginBottom: '16px' }}>
              <span className="mr">
                दिशा पारिवार चॅरिटेबल ट्रस्ट, पुणे — गेल्या २०+ वर्षांपासून महाराष्ट्रातील गुणवान व आर्थिकदृष्ट्या दुर्बल विद्यार्थ्यांना शैक्षणिक मदत देत आहे. ही संस्था पूर्णपणे दात्यांच्या देणगीवर चालते — कोणतेही सरकारी अनुदान नाही.
              </span>
              <span className="en">
                Disha Pariwar Charitable Trust, Pune — for 20+ years, supporting meritorious and financially weak students across Maharashtra. The trust runs entirely on donor contributions — no government grants.
              </span>
            </p>
            <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--ink-mid)' }}>
              <span className="mr">
                एक शैक्षणिक चळवळ म्हणून, आम्ही देणगीदार आणि विद्यार्थी — या दोन हातांमधील दुरावा कमी करतो. आमचे स्वयंसेवक महाराष्ट्रातील ३६ जिल्ह्यांमध्ये सक्रिय आहेत.
              </span>
              <span className="en">
                As an educational movement, we bridge the gap between donors and students — two hands reaching toward each other. Our volunteers are active across all 36 districts of Maharashtra.
              </span>
            </p>
          </div>

          {/* Key pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '20px', marginBottom: '40px' }}>
            <div className="section-card">
              <BookOpen size={32} color="#C0392B" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
                <span className="mr">केवळ गुणवत्ता व गरज</span>
                <span className="en">Merit & Need Based</span>
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-mid)' }}>
                <span className="mr">विद्यार्थ्यांची गुणपत्रिका आणि कौटुंबिक आर्थिक परिस्थिती हीच शिष्यवृत्तीची खरी पात्रता आहे.</span>
                <span className="en">Academic merit and genuine financial need are the sole criteria for scholarship selection.</span>
              </p>
            </div>

            <div className="section-card">
              <HeartHandshake size={32} color="#C8831A" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
                <span className="mr">१००% पारदर्शकता</span>
                <span className="en">100% Transparency</span>
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-mid)' }}>
                <span className="mr">देणगीदारांच्या पैशांचा थेट विद्यार्थ्यांच्या महाविद्यालयीन शुल्कासाठी वापर केला जातो.</span>
                <span className="en">Every rupee contributed by donors is directly used for students' institutional fees.</span>
              </p>
            </div>

            <div className="section-card">
              <Users size={32} color="#276749" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
                <span className="mr">मार्गदर्शन व समुपदेशन</span>
                <span className="en">Mentorship Support</span>
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-mid)' }}>
                <span className="mr">केवळ आर्थिक मदत नव्हे तर करिअर मार्गदर्शन, व्यक्तिमत्त्व विकास आणि दिशा दिली जाते.</span>
                <span className="en">Beyond financial aid, we offer career counseling, life mentorship, and ethical guidance.</span>
              </p>
            </div>
          </div>

          {/* What the scholarship covers */}
          <div className="section-card" style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', color: 'var(--red-deep)' }}>
              💰 <span className="mr">शिष्यवृत्ती काय आहे?</span><span className="en">What does the scholarship cover?</span>
            </div>
            <ul className="inline-list">
              <li>
                <span className="mr">पहिल्या वर्षाची शैक्षणिक फी — डिप्लोमा किंवा पदवी (UG) अभ्यासक्रम</span>
                <span className="en">First-year tuition fee — Diploma or UG Degree course</span>
              </li>
              <li>
                <span className="mr">सरकारी शिष्यवृत्ती असेल तर उर्वरित रक्कम (गॅप अमाउंट) — पूर्ण रक्कम नाही</span>
                <span className="en">If you receive government aid, only the remaining gap amount — not the full fee again</span>
              </li>
              <li>
                <span className="mr">शिष्यवृत्ती रोख दिली जात नाही — थेट महाविद्यालय किंवा संमतीपत्रानुसार प्रत्यक्ष तपासणीनंतर दिली जाते</span>
                <span className="en">Scholarship is not given in cash — paid to college or with in-person verification</span>
              </li>
              <li>
                <span className="mr">एका अभ्यासक्रमासाठी एकदाच — पुन्हा त्याच अभ्यासक्रमासाठी नाही</span>
                <span className="en">One-time per course — cannot apply again for the same course</span>
              </li>
            </ul>
          </div>

          {/* Course eligibility */}
          <div className="section-card" style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>
              🎓 <span className="mr">कोणते अभ्यासक्रम पात्र आहेत?</span><span className="en">Which courses are eligible?</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '16px' }}>
              <div style={{ background: 'var(--success-bg)', border: '1px solid #A8D5B5', borderRadius: 'var(--radius-sm)', padding: '18px' }}>
                <div style={{ fontWeight: 700, color: 'var(--success)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={18} />
                  <span className="mr">पात्र अभ्यासक्रम</span>
                  <span className="en">Eligible Courses</span>
                </div>
                <ul className="inline-list">
                  <li><span className="mr">डिप्लोमा (Diploma) — पहिले वर्ष</span><span className="en">Diploma — 1st Year</span></li>
                  <li><span className="mr">पदवी UG (Degree) — पहिले वर्ष (B.E./B.Tech, B.Sc, B.Com, MBBS, etc.)</span><span className="en">UG Degree — 1st Year</span></li>
                  <li><span className="mr">लॅटरल एंट्री / डायरेक्ट सेकंड इयर (DSE)</span><span className="en">Lateral Entry / Direct 2nd Year</span></li>
                </ul>
              </div>

              <div style={{ background: 'var(--error-bg)', border: '1px solid #F5B5B0', borderRadius: 'var(--radius-sm)', padding: '18px' }}>
                <div style={{ fontWeight: 700, color: 'var(--error)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <XCircle size={18} />
                  <span className="mr">अपात्र अभ्यासक्रम</span>
                  <span className="en">Not Eligible</span>
                </div>
                <ul className="inline-list">
                  <li><span className="mr">शालेय शिक्षण (१ली ते १०वी)</span><span className="en">School education (1st to 10th std)</span></li>
                  <li><span className="mr">उच्च पदव्युत्तर शिक्षण (PG) काही अपवाद वगळता</span><span className="en">Post-graduate (PG) with minor exceptions</span></li>
                  <li><span className="mr">खाजगी शिकवणी / कोचिंग क्लासेसची फी</span><span className="en">Private tuition or coaching class fees</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '36px' }}>
            <Link to="/how-to-apply" className="btn btn-outline">
              <span className="mr">अर्ज प्रक्रिया पहा →</span>
              <span className="en">See Application Process →</span>
            </Link>
            <Link to="/apply" className="btn btn-red">
              <span className="mr">ऑनलाइन अर्ज करा</span>
              <span className="en">Apply for Scholarship</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
