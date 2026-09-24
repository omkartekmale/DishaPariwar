import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  GraduationCap, 
  FileText, 
  Search, 
  Download, 
  Award, 
  CheckCircle, 
  Clock, 
  MapPin, 
  ArrowRight,
  HeartHandshake,
  Users
} from 'lucide-react';

const HomePage = () => {
  const { t } = useLanguage();

  const stats = [
    { num: '२०+', enNum: '20+', labelMr: 'वर्षांची अखंड सेवा', labelEn: 'Years of Service' },
    { num: '३६', enNum: '36', labelMr: 'जिल्ह्यांत विस्तार', labelEn: 'Districts of Maharashtra' },
    { num: '१५,०००+', enNum: '15,000+', labelMr: 'विद्यार्थ्यांना शैक्षणिक दिशा', labelEn: 'Students Empowered' },
    { num: '१००%', enNum: '100%', labelMr: 'पारदर्शक देणगी विनियोग', labelEn: 'Transparent Utilization' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="page-header" style={{ padding: 'clamp(36px, 6vw, 64px) 20px clamp(32px, 5vw, 56px)' }}>
        <div className="page-header__inner">
          <div className="page-header__eyebrow">
            <span className="mr">शैक्षणिक वर्ष २०२६-२७ अर्ज सुरू</span>
            <span className="en">Academic Year 2026-27 Applications Open</span>
          </div>
          <h1 style={{ fontSize: 'clamp(24px, 4.5vw, 38px)', marginBottom: '16px' }}>
            <span className="mr">गुणवंत आणि गरजू विद्यार्थ्यांसाठी शैक्षणिक शिष्यवृत्ती</span>
            <span className="en">Educational Scholarship for Meritorious & Needy Students</span>
          </h1>
          <p style={{ fontSize: 'clamp(15px, 2.2vw, 18px)', maxWidth: '680px', marginBottom: '28px' }}>
            <span className="mr">
              "आम्ही फक्त दोन हातांमधील अंतर कमी करतो" — महाराष्ट्रातील गुणवंत, होतकरू विद्यार्थ्यांना उच्च शिक्षणासाठी दिशा देणारा विश्वास.
            </span>
            <span className="en">
              "We simply bridge the distance between two hands" — Empowering talented rural students across Maharashtra to achieve higher education.
            </span>
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/apply" className="btn btn-gold" style={{ fontSize: '15px', padding: '12px 24px' }}>
              <span className="mr">ऑनलाइन अर्ज करा</span>
              <span className="en">Apply Online</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/dashboard" className="btn btn-outline" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderColor: 'rgba(255,255,255,0.4)', fontSize: '15px', padding: '12px 24px' }}>
              <Search size={18} />
              <span className="mr">अर्जाची स्थिती तपासा</span>
              <span className="en">Track Application</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section style={{ background: '#1C1410', color: '#FFFDF6', padding: '28px 16px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: '20px', textAlign: 'center' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ padding: '8px' }}>
              <div style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, color: '#F5C842', fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>
                <span className="mr">{stat.num}</span>
                <span className="en">{stat.enNum}</span>
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', marginTop: '6px', lineHeight: 1.4 }}>
                <span className="mr">{stat.labelMr}</span>
                <span className="en">{stat.labelEn}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Action Tiles */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div className="section__eyebrow">
              <span className="mr">महत्त्वाच्या सुविधा</span>
              <span className="en">Quick Services</span>
            </div>
            <h2 className="section__title">
              <span className="mr">विद्यार्थ्यांसाठी मार्गदर्शक दालन</span>
              <span className="en">Student Guidance & Application Portal</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '20px' }}>
            <Link to="/how-to-apply" className="section-card" style={{ transition: 'transform 0.2s', borderTop: '4px solid var(--red)' }}>
              <Clock size={32} color="#C0392B" style={{ marginBottom: '14px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
                <span className="mr">अर्ज कसा करावा?</span>
                <span className="en">How to Apply?</span>
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-mid)' }}>
                <span className="mr">पात्रता निकष, अर्जाचे टप्पे, आणि महत्त्वाच्या तारखांची संपूर्ण माहिती.</span>
                <span className="en">Step-by-step guidance, timelines, and instructions for scholarship submission.</span>
              </p>
            </Link>

            <Link to="/documents" className="section-card" style={{ transition: 'transform 0.2s', borderTop: '4px solid var(--gold)' }}>
              <FileText size={32} color="#C8831A" style={{ marginBottom: '14px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
                <span className="mr">कागदपत्रांची यादी</span>
                <span className="en">Document Checklist</span>
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-mid)' }}>
                <span className="mr">कोणती कागदपत्रे आवश्यक आहेत, तहसील दाखला आणि ऑफलाईन फॉर्म डाऊनलोड करा.</span>
                <span className="en">Mandatory certificate checklist, guidelines and offline application PDF form.</span>
              </p>
            </Link>

            <Link to="/dashboard" className="section-card" style={{ transition: 'transform 0.2s', borderTop: '4px solid var(--success)' }}>
              <Search size={32} color="#276749" style={{ marginBottom: '14px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
                <span className="mr">अर्जाची स्थिती तपासा</span>
                <span className="en">Track Application</span>
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-mid)' }}>
                <span className="mr">तुमच्या संदर्भ क्रमांक (Reference ID) द्वारे अर्जाची सद्यस्थिती त्वरित पहा.</span>
                <span className="en">Check current review stage, approval status, and remarks using Reference ID.</span>
              </p>
            </Link>

            <Link to="/faq" className="section-card" style={{ transition: 'transform 0.2s', borderTop: '4px solid var(--info)' }}>
              <GraduationCap size={32} color="#2B6CB0" style={{ marginBottom: '14px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
                <span className="mr">वारंवार विचारले जाणारे प्रश्न</span>
                <span className="en">Frequently Asked Questions</span>
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-mid)' }}>
                <span className="mr">विद्यार्थी आणि पालकांच्या शंकांचे सविस्तर निरसन (FAQ).</span>
                <span className="en">Answers to common student questions about scholarship terms and criteria.</span>
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Founder & Vision */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))', gap: '32px', alignItems: 'center' }}>
            <div>
              <div className="section__eyebrow">
                <span className="mr">संस्थापकांचे मनोगत</span>
                <span className="en">Founder's Message</span>
              </div>
              <h2 className="section__title">
                <span className="mr">शिक्षणाच्या प्रकाशाने प्रत्येक घर उजळू द्या</span>
                <span className="en">Let Education Light Up Every Household</span>
              </h2>
              <blockquote style={{ borderLeft: '4px solid var(--red)', paddingLeft: '18px', fontStyle: 'italic', color: 'var(--ink-mid)', fontSize: '15px', lineHeight: '1.8', marginBottom: '20px' }}>
                <span className="mr">
                  "पैशांअभावी कोणत्याही गुणवंत विद्यार्थ्याचे शिक्षण थांबू नये, हाच दिशा परिवाराचा एकमेव संकल्प आहे. दात्यांचा प्रत्येक पैसा विश्वास आणि आदराने गरजू विद्यार्थ्यांपर्यंत पोहोचवणे हे आमचे कर्तव्य आहे."
                </span>
                <span className="en">
                  "No deserving student should ever be deprived of higher education solely due to lack of financial resources. This has been the core conviction of Disha Pariwar since day one."
                </span>
              </blockquote>
              <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--ink)' }}>
                <span className="mr">दिशा परिवार चॅरिटेबल ट्रस्ट, पुणे</span>
                <span className="en">Disha Pariwar Charitable Trust, Pune</span>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>
                <span className="mr">ट्रस्टी आणि स्वयंसेवक मंडळ</span>
                <span className="en">Trustees and Volunteer Collective</span>
              </div>
            </div>

            <div className="section-card" style={{ background: '#fff', border: '1px solid var(--border)', textAlign: 'center', padding: '32px 24px' }}>
              <img
                src="/founder.jpg"
                alt="Disha Pariwar Trust"
                style={{ width: '160px', height: '160px', objectFit: 'cover', borderRadius: '50%', margin: '0 auto 20px', border: '4px solid var(--cream-dark)' }}
                onError={(e) => { e.target.src = '/assets/logo.png'; }}
              />
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--red-deep)' }}>
                <span className="mr">दिशा परिवार — एक सामाजिक चळवळ</span>
                <span className="en">Disha Pariwar — A Social Movement</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--ink-mid)', marginTop: '8px' }}>
                <span className="mr">कार्यालय: २रा मजला, कॅपिटल टॉवर, शगुन चौक, लक्ष्मी रोड, नारायण पेठ, पुणे</span>
                <span className="en">Office: 2nd Floor, Capital Tower, Shagun Chowk, Laxmi Road, Narayan Peth, Pune</span>
              </p>
              <div style={{ marginTop: '18px' }}>
                <Link to="/contact" className="btn btn-outline" style={{ fontSize: '13px' }}>
                  <span className="mr">कार्यालयाचा पत्ता व संपर्क</span>
                  <span className="en">Office Details & Contact</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offline Form Notice */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ background: 'var(--gold-light)', border: '1.5px dashed var(--gold)', borderRadius: 'var(--radius)', padding: '28px', textAlign: 'center' }}>
            <Download size={36} color="#C8831A" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#804D00', marginBottom: '8px' }}>
              <span className="mr">ऑफलाइन अर्ज फॉर्म डाऊनलोड करा (PDF)</span>
              <span className="en">Download Physical Application Form (PDF)</span>
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--ink-mid)', marginBottom: '18px' }}>
              <span className="mr">जर तुम्हाला प्रत्यक्ष फॉर्म भरून पोस्टाने पाठवायचा असेल, तर अधिकृत अर्जाची प्रिंट काढून आवश्यक कागदपत्रांसह पुणे कार्यालयात पाठवा.</span>
              <span className="en">If you prefer paper submission, download the official PDF form, print it, attach required certificates, and submit to the Pune office.</span>
            </p>
            <a
              href="/assets/scholarship_arj_form.pdf"
              download
              className="btn btn-gold"
            >
              <Download size={16} />
              <span className="mr">शिष्यवृत्ती अर्ज फॉर्म (PDF) डाऊनलोड</span>
              <span className="en">Download Scholarship Form (PDF)</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
