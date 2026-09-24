import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, AlertCircle, FileText, ArrowRight, Download } from 'lucide-react';

const ScholarshipPage = () => {
  const { t } = useLanguage();

  return (
    <div>
      <div className="page-header">
        <div className="page-header__inner">
          <div className="page-header__eyebrow">
            <span className="mr">शिष्यवृत्ती योजना</span>
            <span className="en">Scholarship Scheme</span>
          </div>
          <h1>
            <span className="mr">दिशा परिवार शिष्यवृत्ती तपशील</span>
            <span className="en">Disha Pariwar Scholarship Details</span>
          </h1>
          <p>
            <span className="mr">पात्रता, निकष, आवश्यक कागदपत्रे आणि शिष्यवृत्तीचे स्वरूप</span>
            <span className="en">Eligibility, criteria, required documents and award scope</span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '880px' }}>
          {/* Key Eligibility Rules */}
          <div className="section-card" style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: 'var(--red-deep)' }}>
              🎯 <span className="mr">पात्रता निकष (Eligibility Criteria)</span><span className="en">Eligibility Criteria</span>
            </h2>
            <ul className="inline-list">
              <li>
                <span className="mr"><strong>कौटुंबिक उत्पन्न:</strong> कुटुंबाचे एकूण वार्षिक उत्पन्न ₹८,००,००० पेक्षा कमी असावे (तहसीलदार अथवा ग्रामसेवकांचा अधिकृत दाखला आवश्यक).</span>
                <span className="en"><strong>Family Income:</strong> Total annual family income must be below ₹8,00,000 (official Tahsildar / Gram Sevak certificate mandatory).</span>
              </li>
              <li>
                <span className="mr"><strong>शैक्षणिक गुणवत्ता:</strong> १०वी / १२वी मध्ये किमान ६०% किंवा समकक्ष ग्रेड असावे.</span>
                <span className="en"><strong>Academic Merit:</strong> Minimum 60% or equivalent marks in 10th / 12th standard.</span>
              </li>
              <li>
                <span className="mr"><strong>अभ्यासक्रम:</strong> शासकीय / अनुदानित / मान्यताप्राप्त खाजगी महाविद्यालयात पदवी (UG) किंवा डिप्लोमाच्या प्रथम वर्षात प्रवेश घेतलेला असावा.</span>
                <span className="en"><strong>Admitted Course:</strong> Must have secured admission to 1st year of Diploma or Undergraduate degree in recognized college.</span>
              </li>
              <li>
                <span className="mr"><strong>महाराष्ट्र रहिवासी:</strong> विद्यार्थी महाराष्ट्रातील रहिवासी असावा.</span>
                <span className="en"><strong>Domicile:</strong> Student must be a permanent resident of Maharashtra.</span>
              </li>
            </ul>
          </div>

          {/* Scholarship Amount and Benefits */}
          <div className="section-card" style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: 'var(--gold)' }}>
              💎 <span className="mr">शिष्यवृत्तीचे स्वरूप (Scholarship Scope)</span><span className="en">Scholarship Scope</span>
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--ink-mid)', marginBottom: '14px' }}>
              <span className="mr">
                दिशा परिवार शैक्षणिक शुल्कातील तूट (Fee Gap) भरून काढण्यासाठी मदत करतो. जर विद्यार्थ्याला शासकीय शिष्यवृत्ती (उदा. महाडीबीटी/ईबीसी/ओबीसी सवलत) मिळत असेल, तर उरलेली महाविद्यालयीन फी ट्रस्टद्वारे दिली जाते.
              </span>
              <span className="en">
                Disha Pariwar bridges the institutional fee gap. If the student receives state subsidies (e.g. MahaDBT/EBC/OBC concession), the remaining tuition fee is evaluated for scholarship support.
              </span>
            </p>
            <div style={{ background: 'var(--cream)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>
                <span className="mr">महत्त्वाची नोंद:</span>
                <span className="en">Important Note:</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--ink-mid)' }}>
                <span className="mr">शिष्यवृत्ती थेट रोख स्वरूपात दिली जात नाही. निवड झालेल्या विद्यार्थ्यांच्या महाविद्यालयीन खात्यात थेट धनादेश/NEFT द्वारे अथवा कागदपत्र पडताळणीअंती दिली जाते.</span>
                <span className="en">Scholarship funds are not disbursed in cash. Approved grants are transferred directly to institutional fees or issued upon committee verification.</span>
              </p>
            </div>
          </div>

          {/* Action Bar */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '36px', flexWrap: 'wrap' }}>
            <Link to="/apply" className="btn btn-red">
              <span className="mr">ऑनलाइन अर्ज करा</span>
              <span className="en">Apply Now</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/documents" className="btn btn-outline">
              <FileText size={16} />
              <span className="mr">आवश्यक कागदपत्रे तपासा</span>
              <span className="en">View Document Checklist</span>
            </Link>
            <a href="/assets/scholarship_arj_form.pdf" download className="btn btn-gold">
              <Download size={16} />
              <span className="mr">ऑफलाइन अर्ज फॉर्म (PDF)</span>
              <span className="en">Offline Form (PDF)</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScholarshipPage;
