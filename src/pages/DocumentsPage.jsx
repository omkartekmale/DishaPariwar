import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Download, CheckCircle, FileText, AlertCircle, Info, ExternalLink } from 'lucide-react';

const DocumentsPage = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const docs = [
    {
      id: 'doc-photo',
      icon: '🧑‍🎓',
      mr: 'पासपोर्ट फोटो',
      en: 'Passport Photo',
      category: 'basic',
      required: true,
      hintMr: 'विद्यार्थ्याचा अलीकडील रंगीत पासपोर्ट आकाराचा फोटो (३ महिने जुना नसावा).',
      hintEn: 'Recent color passport-size photo of student (not older than 3 months).'
    },
    {
      id: 'doc-aadhar',
      icon: '🪪',
      mr: 'आधार कार्ड (विद्यार्थी)',
      en: 'Aadhaar Card (Student)',
      category: 'basic',
      required: true,
      hintMr: 'दोन्ही बाजूंचे स्पष्ट झेरॉक्स — जन्मतारीख व पत्ता स्पष्ट दिसणे आवश्यक.',
      hintEn: 'Both sides clear copy — Date of birth and address must be legible.'
    },
    {
      id: 'doc-marksheet-10',
      icon: '📋',
      mr: '१०वी मार्कशीट',
      en: '10th Marksheet',
      category: 'academic',
      required: true,
      hintMr: 'राज्य मंडळ अथवा सीबीएसईची अधिकृत बोर्ड मार्कशीट.',
      hintEn: 'Official state board or CBSE mark sheet.'
    },
    {
      id: 'doc-fee-structure',
      icon: '🧾',
      mr: 'महाविद्यालय फी स्ट्रक्चर',
      en: 'College Fee Structure',
      category: 'college',
      required: true,
      hintMr: 'महाविद्यालयाचे अधिकृत शुल्क पत्रक (चालू शैक्षणिक वर्षाचे) — प्राचार्य अथवा रजिस्ट्रार यांची स्वाक्षरी.',
      hintEn: 'Official institutional fee structure for current year signed by Principal/Registrar.'
    },
    {
      id: 'doc-income',
      icon: '📄',
      mr: 'उत्पन्नाचा दाखला',
      en: 'Income Certificate',
      category: 'income',
      required: true,
      hintMr: 'सक्षम महसूल प्राधिकारी (तहसीलदार / उपविभागीय अधिकारी) यांनी दिलेला चालू वर्षाचा दाखला (₹८ लाखांपेक्षा कमी).',
      hintEn: 'Income certificate issued by competent authority (Tahsildar / SDO) below ₹8 Lakh.'
    },
    {
      id: 'doc-bonafide',
      icon: '🏫',
      mr: 'प्रवेश पत्र / Bonafide',
      en: 'Admission Letter / Bonafide',
      category: 'college',
      required: true,
      hintMr: 'CAP अलॉटमेंट लेटर किंवा महाविद्यालयाचे चालू शैक्षणिक वर्षाचे बोनाफाईड प्रमाणपत्र.',
      hintEn: 'CAP allotment letter or College Bonafide certificate for the current year.'
    },
    {
      id: 'doc-ration',
      icon: '📑',
      mr: 'रेशन कार्ड / कुटुंब दाखला',
      en: 'Ration Card / Family Register',
      category: 'income',
      required: true,
      hintMr: 'कुटुंबातील सर्व सदस्यांची नावे स्पष्ट दिसणारे रेशन कार्ड किंवा ग्रामपंचायत दाखला.',
      hintEn: 'Ration card displaying names of all family members or Gram Panchayat certificate.'
    },
    {
      id: 'doc-lightbill',
      icon: '💡',
      mr: 'लाईट बिल',
      en: 'Electricity Bill',
      category: 'income',
      required: true,
      hintMr: 'चालू महिन्यातील घराचे वीज बिल (पत्त्याच्या पडताळणीसाठी).',
      hintEn: 'Recent residential electricity bill for address verification.'
    },
    {
      id: 'doc-bank',
      icon: '🏦',
      mr: 'बँक पासबुक / रद्द केलेला चेक',
      en: 'Bank Passbook / Cancelled Cheque',
      category: 'basic',
      required: true,
      hintMr: 'विद्यार्थ्याच्या नावावरील बँक खाते — खाते क्रमांक, नाव आणि IFSC कोड स्पष्ट असावा.',
      hintEn: 'Student account passbook first page or cancelled cheque with clear IFSC and Account number.'
    },
    {
      id: 'doc-student-letter',
      icon: '✍️',
      mr: 'विद्यार्थ्याचे स्वहस्तलिखित पत्र',
      en: "Student's Handwritten Letter",
      category: 'special',
      required: true,
      hintMr: 'विद्यार्थ्याने स्वतःच्या हस्ताक्षरात लिहिलेले पत्र — (१) परिस्थिती, (२) कुटुंबाची पार्श्वभूमी, (३) शिक्षणाचे ध्येय व वचन.',
      hintEn: 'Letter in student’s own handwriting covering: need, family background, academic goal, and commitment.'
    },
    {
      id: 'doc-caste',
      icon: '📃',
      mr: 'जात प्रमाणपत्र / जात पडताळणी',
      en: 'Caste Certificate / Validity',
      category: 'academic',
      required: false,
      hintMr: 'राखीव संवर्गातील (SC / ST / VJNT / OBC / SBC / EWS) विद्यार्थ्यांसाठी आवश्यक.',
      hintEn: 'Required for reserved categories (SC/ST/VJNT/OBC/SBC/EWS).'
    },
    {
      id: 'doc-marksheet-12',
      icon: '📋',
      mr: '१२वी / डिप्लोमा मार्कशीट',
      en: '12th / Diploma Marksheet',
      category: 'academic',
      required: false,
      hintMr: 'पदवी अभ्यासक्रमात प्रवेश घेतलेल्या विद्यार्थ्यांसाठी आवश्यक.',
      hintEn: 'Required for degree / lateral entry admissions.'
    },
    {
      id: 'doc-712',
      icon: '🌾',
      mr: '७/१२ उतारा (शेतजमीन असल्यास)',
      en: '7/12 Land Record Extract',
      category: 'income',
      required: false,
      hintMr: 'शेतकरी / शेतमजूर कुटुंबातील विद्यार्थ्यांसाठी जमीन धारणा दर्शवणारा उतारा.',
      hintEn: 'Required for agricultural families to show landholding details.'
    },
    {
      id: 'doc-deathcert',
      icon: '🕊️',
      mr: 'पालकांचा मृत्यू दाखला (लागू असल्यास)',
      en: "Parent's Death Certificate (If applicable)",
      category: 'special',
      required: false,
      hintMr: 'एकल पालक अथवा अनाथ विद्यार्थ्यांसाठी प्राधान्य मूल्यांकनासाठी आवश्यक.',
      hintEn: 'Required for single-parent or orphan students for priority evaluation.'
    }
  ];

  const filteredDocs = activeCategory === 'all' 
    ? docs 
    : docs.filter(d => d.category === activeCategory);

  return (
    <div>
      <div className="page-header">
        <div className="page-header__inner">
          <div className="page-header__eyebrow">
            <span className="mr">कागदपत्रे</span>
            <span className="en">Documentation</span>
          </div>
          <h1>
            <span className="mr">आवश्यक कागदपत्रांची यादी</span>
            <span className="en">Mandatory Document Checklist</span>
          </h1>
          <p>
            <span className="mr">अर्ज मंजूर होण्यासाठी कागदपत्रे वेळेत व अचूक सादर करणे अत्यावश्यक आहे</span>
            <span className="en">Accurate and timely submission of verified certificates is crucial for approval</span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          {/* Download Banner */}
          <div style={{ 
            background: 'linear-gradient(135deg, #FEF3E0 0%, #FFFDF6 100%)', 
            border: '1.5px solid #C8831A', 
            borderRadius: 'var(--radius)', 
            padding: '24px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: '16px',
            marginBottom: '32px'
          }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#7B1F16', marginBottom: '6px' }}>
                <span className="mr">ऑफलाइन अर्ज फॉर्म डाऊनलोड करा (PDF)</span>
                <span className="en">Download Physical Application Form (PDF)</span>
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--ink-mid)' }}>
                <span className="mr">हा फॉर्म डाऊनलोड करून A4 पानावर प्रिंट करा, भरा आणि कागदपत्रांसह कार्यालयात पाठवा.</span>
                <span className="en">Print this form on A4 sheets, fill by hand, and courier along with self-attested copies.</span>
              </p>
            </div>
            <a
              href="/assets/scholarship_arj_form.pdf"
              download
              className="btn btn-gold"
            >
              <Download size={16} />
              <span className="mr">अर्ज फॉर्म (PDF) डाऊनलोड</span>
              <span className="en">Download Form PDF</span>
            </a>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <button
              type="button"
              className={`btn ${activeCategory === 'all' ? 'btn-red' : 'btn-outline'}`}
              style={{ fontSize: '13px', padding: '6px 14px' }}
              onClick={() => setActiveCategory('all')}
            >
              <span className="mr">सर्व कागदपत्रे</span><span className="en">All Documents</span>
            </button>
            <button
              type="button"
              className={`btn ${activeCategory === 'basic' ? 'btn-red' : 'btn-outline'}`}
              style={{ fontSize: '13px', padding: '6px 14px' }}
              onClick={() => setActiveCategory('basic')}
            >
              <span className="mr">ओळख व बँक</span><span className="en">Identity & Bank</span>
            </button>
            <button
              type="button"
              className={`btn ${activeCategory === 'academic' ? 'btn-red' : 'btn-outline'}`}
              style={{ fontSize: '13px', padding: '6px 14px' }}
              onClick={() => setActiveCategory('academic')}
            >
              <span className="mr">शैक्षणिक निकाल</span><span className="en">Academic Records</span>
            </button>
            <button
              type="button"
              className={`btn ${activeCategory === 'college' ? 'btn-red' : 'btn-outline'}`}
              style={{ fontSize: '13px', padding: '6px 14px' }}
              onClick={() => setActiveCategory('college')}
            >
              <span className="mr">कॉलेज फी व प्रवेश</span><span className="en">College & Fees</span>
            </button>
            <button
              type="button"
              className={`btn ${activeCategory === 'income' ? 'btn-red' : 'btn-outline'}`}
              style={{ fontSize: '13px', padding: '6px 14px' }}
              onClick={() => setActiveCategory('income')}
            >
              <span className="mr">उत्पन्न व कुटुंब</span><span className="en">Income & Family</span>
            </button>
          </div>

          {/* Documents Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }}>
            {filteredDocs.map((doc) => (
              <div key={doc.id} className="section-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: '26px', flexShrink: 0, marginTop: '2px' }}>{doc.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '15.5px', fontWeight: 700, color: 'var(--ink)' }}>
                        <span className="mr">{doc.mr}</span>
                        <span className="en">{doc.en}</span>
                      </h4>
                      {doc.required ? (
                        <span className="badge badge-danger">
                          <span className="mr">अनिवार्य</span><span className="en">Mandatory</span>
                        </span>
                      ) : (
                        <span className="badge badge-info">
                          <span className="mr">लागू असल्यास</span><span className="en">Conditional</span>
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--ink-mid)', lineHeight: '1.6', wordBreak: 'break-word' }}>
                      <span className="mr">{doc.hintMr}</span>
                      <span className="en">{doc.hintEn}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Submission Guidelines Box */}
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px', marginTop: '36px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '12px', color: 'var(--red-deep)' }}>
              📌 <span className="mr">कागदपत्रे पाठवताना घ्यावयाची काळजी</span><span className="en">Submission Guidelines</span>
            </h3>
            <ul className="inline-list">
              <li>
                <span className="mr">कोणतीही <strong>मूळ (Original) कागदपत्रे</strong> पोस्टाने पाठवू नयेत. फक्त स्पष्ट झेरॉक्स प्रती पाठवाव्यात.</span>
                <span className="en">Do NOT send any <strong>original documents</strong> by post. Only clear photocopies are accepted.</span>
              </li>
              <li>
                <span className="mr">सर्व झेरॉक्स प्रतींवर विद्यार्थ्याने स्वतःची स्वाक्षरी (Self-Attestation) केलेली असावी.</span>
                <span className="en">All photocopies must be signed by the student (Self-Attested).</span>
              </li>
              <li>
                <span className="mr">पाकिटावर आपला ऑनलाइन अर्जाचा <strong>Reference Number</strong> आणि <strong>मोबाईल नंबर</strong> ठळक अक्षरात लिहावा.</span>
                <span className="en">Write your online <strong>Reference Number</strong> and <strong>Mobile Number</strong> clearly on the envelope.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DocumentsPage;
