import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  AlertTriangle, 
  CheckSquare, 
  FileSpreadsheet, 
  Upload, 
  Printer, 
  Mail, 
  ClipboardCheck, 
  Download,
  ArrowRight
} from 'lucide-react';

const HowToApplyPage = () => {
  const { t } = useLanguage();

  const steps = [
    {
      num: 1,
      icon: CheckSquare,
      titleMr: 'पात्रता तपासा',
      titleEn: 'Check Eligibility',
      descMr: 'डिप्लोमा / पदवी (UG) पहिले वर्ष किंवा लॅटरल एंट्री. कुटुंबाचे वार्षिक उत्पन्न ₹८ लाखांपेक्षा कमी. १०वी गुण: कला ६०% / वाणिज्य ६५% / विज्ञान ७०% / अभियांत्रिकी-वैद्यकीय ८५%.',
      descEn: 'Diploma / UG Degree 1st Year or Lateral Entry. Annual family income below ₹8 Lakh. 10th marks: Arts 60% / Commerce 65% / Science 70% / Engg-Medical 85%.'
    },
    {
      num: 2,
      icon: FileSpreadsheet,
      titleMr: 'सर्व कागदपत्रे तयार ठेवा',
      titleEn: 'Prepare All Documents',
      descMr: 'झेरॉक्स / स्कॅन प्रती तयार ठेवा: आधार कार्ड, १०वी/१२वी मार्कशीट, तहसील उत्पन्नाचा दाखला, प्रवेश पावती, कॉलेज फी स्ट्रक्चर, रेशन कार्ड, लाईट बिल, बँक पासबुक व स्वहस्तलिखित पत्र.',
      descEn: 'Keep photocopies/scans ready: Aadhaar card, 10th/12th marksheet, Tahsildar income certificate, admission receipt, college fee structure, ration card, light bill, bank passbook, and handwritten letter.'
    },
    {
      num: 3,
      icon: Upload,
      titleMr: 'ऑनलाइन फॉर्म भरा',
      titleEn: 'Fill Online Application',
      descMr: 'पोर्टलवर जाऊन वैयक्तिक माहिती, शैक्षणिक माहिती आणि महाविद्यालयाचे तपशील अचूक भरा व फॉर्म सबमिट करून Reference ID मिळवा.',
      descEn: 'Fill personal details, academic score, and college fee breakdown on the online portal and submit to receive your Reference ID.'
    },
    {
      num: 4,
      icon: Printer,
      titleMr: 'ऑफलाइन अर्ज फॉर्म प्रिंट करा',
      titleEn: 'Download & Print Offline Form',
      descMr: 'अधिकृत पीडीएफ फॉर्म डाऊनलोड करून A4 आकाराच्या कागदावर प्रिंट काढून स्वतःच्या अक्षरात फॉर्म भरा.',
      descEn: 'Download the official PDF scholarship application form, print it on A4 sheets, and fill in student details by hand.'
    },
    {
      num: 5,
      icon: CheckSquare,
      titleMr: 'कागदपत्रे जोडून साक्षांकित (Self-Attest) करा',
      titleEn: 'Attach & Self-Attest Copies',
      descMr: 'सर्व कागदपत्रांच्या झेरॉक्स प्रतींवर स्वतःची स्वाक्षरी (Self-Attestation) करा. मूळ कागदपत्रे (Originals) पाठवू नयेत.',
      descEn: 'Sign all photocopy attachments (self-attest). Do NOT send original certificates by post.'
    },
    {
      num: 6,
      icon: Mail,
      titleMr: 'पुणे कार्यालयास पोस्ट / कुरिअर करा',
      titleEn: 'Post to Pune Trust Office',
      descMr: 'फॉर्म आणि कागदपत्रे बंद पाकिटात ठेवून खालील पत्त्यावर स्पीड पोस्ट अथवा कुरिअरने पाठवा:\nदिशा परिवार चॅरिटेबल ट्रस्ट, २रा मजला, कॅपिटल टॉवर, शगुन चौक, लक्ष्मी रोड, नारायण पेठ, पुणे – ४११०३०',
      descEn: 'Send the filled form and document photocopies via Speed Post or Courier to:\nDisha Pariwar Charitable Trust, 2nd Floor, Capital Tower, Shagun Chowk, Laxmi Road, Narayan Peth, Pune – 411030'
    },
    {
      num: 7,
      icon: ClipboardCheck,
      titleMr: 'छाननी आणि पडताळणी',
      titleEn: 'Verification & Selection',
      descMr: 'ट्रस्ट कमिटीद्वारे अर्जांची छाननी केली जाईल. आवश्यक असल्यास व्हिडिओ कॉल किंवा प्रतिनिधीद्वारे पडताळणी होऊन शिष्यवृत्ती मंजूर केली जाईल.',
      descEn: 'Committee evaluates applications. Phone/video call or local volunteer visit confirms eligibility before final disbursement approval.'
    }
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-header__inner">
          <div className="page-header__eyebrow">
            <span className="mr">मार्गदर्शन</span>
            <span className="en">Step-by-Step Guide</span>
          </div>
          <h1>
            <span className="mr">अर्ज कसा करावा?</span>
            <span className="en">How to Apply for Scholarship</span>
          </h1>
          <p>
            <span className="mr">ऑनलाइन नोंदणी आणि ऑफलाइन कागदपत्रे जमा करण्याची संपूर्ण मार्गदर्शिका</span>
            <span className="en">Comprehensive instructions for online submission & document verification</span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '820px' }}>
          {/* Important alert */}
          <div style={{ background: 'var(--warning-bg)', borderLeft: '4px solid var(--warning)', padding: '16px 20px', borderRadius: '8px', display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '36px' }}>
            <AlertTriangle size={24} color="#9A5A0A" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: '#9A5A0A', fontSize: '15px' }}>
                <span className="mr">महत्त्वाची सूचना: </span>
                <span className="en">Important Notice: </span>
              </strong>
              <span style={{ fontSize: '14px', color: 'var(--ink)' }}>
                <span className="mr">ऑनलाइन फॉर्म भरल्यानंतर ऑफलाइन फॉर्म आणि कागदपत्रांचा संच पोस्टाने अथवा प्रत्यक्ष कार्यालयात जमा करणे अनिवार्य आहे. केवळ ऑनलाइन नोंदणी ग्राह्य धरली जाणार नाही.</span>
                <span className="en">Submitting physical self-attested documents by post or in-person is mandatory after online registration. Online application alone cannot be finalized.</span>
              </span>
            </div>
          </div>

          {/* 7 Steps List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {steps.map((step) => {
              const IconComp = step.icon;
              return (
                <div key={step.num} className="section-card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ 
                    width: '42px', 
                    height: '42px', 
                    borderRadius: '50%', 
                    background: 'var(--red)', 
                    color: '#fff', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '17px',
                    flexShrink: 0
                  }}>
                    {step.num}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                      <IconComp size={18} color="#C0392B" style={{ flexShrink: 0 }} />
                      <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--ink)' }}>
                        <span className="mr">{step.titleMr}</span>
                        <span className="en">{step.titleEn}</span>
                      </h3>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--ink-mid)', whiteSpace: 'pre-line', lineHeight: '1.7' }}>
                      <span className="mr">{step.descMr}</span>
                      <span className="en">{step.descEn}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Box */}
          <div style={{ background: 'var(--cream-dark)', borderRadius: 'var(--radius)', padding: '28px', textAlign: 'center', marginTop: '40px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '14px' }}>
              <span className="mr">आताच तुमचा अर्ज सुरू करा</span>
              <span className="en">Start Your Application Today</span>
            </h3>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/apply" className="btn btn-red">
                <span className="mr">ऑनलाइन अर्ज फॉर्म भरा</span>
                <span className="en">Fill Online Form</span>
                <ArrowRight size={16} />
              </Link>
              <a href="/assets/scholarship_arj_form.pdf" download className="btn btn-gold">
                <Download size={16} />
                <span className="mr">ऑफलाइन अर्ज डाऊनलोड (PDF)</span>
                <span className="en">Download Offline PDF Form</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowToApplyPage;
