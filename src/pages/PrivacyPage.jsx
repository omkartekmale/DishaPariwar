import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Lock, EyeOff, FileCheck } from 'lucide-react';

const PrivacyPage = () => {
  const { t } = useLanguage();

  return (
    <div>
      <div className="page-header">
        <div className="page-header__inner">
          <div className="page-header__eyebrow">
            <span className="mr">गोपनीयता</span>
            <span className="en">Privacy</span>
          </div>
          <h1>
            <span className="mr">गोपनीयता धोरण आणि डेटा संरक्षण</span>
            <span className="en">Privacy Policy & Data Protection</span>
          </h1>
          <p>
            <span className="mr">डिजिटल वैयक्तिक डेटा संरक्षण कायदा (DPDP Act २०२३) अंतर्गत अनुपालन</span>
            <span className="en">Compliance with Digital Personal Data Protection (DPDP) Act 2023</span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '820px' }}>
          <div className="section-card" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '16px' }}>
              <ShieldCheck size={28} color="var(--red)" />
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ink)' }}>
                <span className="mr">विद्यार्थी डेटा सुरक्षा वचनबद्धता</span>
                <span className="en">Student Data Privacy Commitment</span>
              </h2>
            </div>
            <p style={{ fontSize: '15px', color: 'var(--ink-mid)', lineHeight: '1.8' }}>
              <span className="mr">
                दिशा परिवार चॅरिटेबल ट्रस्ट, पुणे हे विद्यार्थ्यांची ओळख, आधार कार्ड, बँक पासबुक, उत्पन्न दाखला आणि शैक्षणिक गुणपत्रिकांची अत्यंत गोपनीयता राखते. हा डेटा केवळ आणि केवळ शिष्यवृत्ती पात्रता मूल्यमापनासाठी वापरला जातो.
              </span>
              <span className="en">
                Disha Pariwar Charitable Trust, Pune strictly safeguards student identification, Aadhaar copies, bank accounts, income certificates, and academic scorecards. Collected records are processed exclusively for scholarship evaluation.
              </span>
            </p>
          </div>

          <div className="section-card" style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '14px', color: 'var(--red-deep)' }}>
              🔒 <span className="mr">आमची महत्त्वाची तत्त्वे</span><span className="en">Key Privacy Principles</span>
            </h3>
            <ul className="inline-list">
              <li>
                <span className="mr"><strong>कोणतीही व्यावसायिक विक्री नाही:</strong> विद्यार्थ्यांचा कोणताही डेटा कधीही कोणत्याही तृतीय पक्षाला विकला किंवा विपणनासाठी दिला जात नाही.</span>
                <span className="en"><strong>No Commercial Selling:</strong> Student personal records are never sold, rented, or shared with third-party marketing entities.</span>
              </li>
              <li>
                <span className="mr"><strong>मर्यादित प्रवेश:</strong> फक्त ट्रस्टच्या अधिकृत निवड समिती सदस्यांनाच पडताळणी कालावधीपुरता डेटा पाहण्याची परवानगी असते.</span>
                <span className="en"><strong>Restricted Access:</strong> Only vetted scholarship committee members are granted temporary access to verify authenticity.</span>
              </li>
              <li>
                <span className="mr"><strong>सुरक्षित साठवणूक:</strong> सर्व डिजिटल प्रती एनक्रिप्टेड सर्व्हरवर संग्रहित केल्या जातात.</span>
                <span className="en"><strong>Secure Storage:</strong> Digital submissions are kept in protected storage with strict access audits.</span>
              </li>
            </ul>
          </div>

          <div style={{ background: 'var(--cream-dark)', padding: '20px', borderRadius: '8px', fontSize: '13px', color: 'var(--ink-mid)' }}>
            <span className="mr">
              गोपनीयताविषयक अधिक माहिती किंवा डेटा काढण्याच्या विनंतीसाठी आपण थेट <strong>team.dishapariwar@gmail.com</strong> वर संपर्क साधू शकता.
            </span>
            <span className="en">
              For privacy inquiries or data removal requests, you may contact the trust at <strong>team.dishapariwar@gmail.com</strong>.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
