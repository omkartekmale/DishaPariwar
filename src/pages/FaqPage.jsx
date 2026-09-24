import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, HelpCircle, CheckCircle } from 'lucide-react';

const FaqPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqData = [
    {
      categoryMr: '१. पात्रता व निकष',
      categoryEn: '1. Eligibility & Criteria',
      items: [
        {
          id: 'q1',
          qMr: 'ही शिष्यवृत्ती कोणासाठी आहे? कोण अर्ज करू शकतो?',
          qEn: 'Who is this scholarship for? Who can apply?',
          aMr: 'महाराष्ट्रातील आर्थिकदृष्ट्या दुर्बल व गुणवंत विद्यार्थी — ज्यांनी पदवी (UG) किंवा डिप्लोमाच्या पहिल्या वर्षात प्रवेश घेतला आहे किंवा लॅटरल एंट्री घेतली आहे. कुटुंबाचे वार्षिक उत्पन्न ₹८ लाखांपेक्षा कमी असणे आवश्यक आहे.',
          aEn: 'Meritorious and financially weak students from Maharashtra who have taken admission to the 1st year of an Undergraduate (UG) degree, Diploma, or Lateral Entry. Annual family income must be below ₹8 Lakh.'
        },
        {
          id: 'q2',
          qMr: '१०वी / १२वी मध्ये किमान किती टक्के आवश्यक आहेत?',
          qEn: 'What is the minimum percentage required in 10th / 12th?',
          aMr: '१०वी गुण निकष: कला शाखा ६०%, वाणिज्य शाखा ६५%, विज्ञान शाखा ७०%, अभियांत्रिकी व वैद्यकीय शाखा ८५%. १२वी किंवा डिप्लोमा निकालातही चांगले गुण असावेत.',
          aEn: '10th minimum score: Arts 60%, Commerce 65%, Science 70%, Engineering & Medical 85%. Good passing performance in 12th / Diploma is also evaluated.'
        },
        {
          id: 'q3',
          qMr: 'मला शासकीय (महाडीबीटी / ईबीसी) शिष्यवृत्ती मिळते, तरी मी अर्ज करू शकतो का?',
          qEn: 'I receive a Government (MahaDBT/EBC) scholarship; can I still apply?',
          aMr: 'होय, नक्कीच! शासकीय शिष्यवृत्ती मिळाल्यानंतर कॉलेजच्या फीमध्ये जी तूट (Gap Amount) उरते, त्यासाठी दिशा परिवार मदत करतो. शासनाने फी भरली असल्यास दुबार फी दिली जात नाही.',
          aEn: 'Yes! Disha Pariwar assists with the fee deficit (Gap Amount) remaining after government scholarship deductions. Double payment for fees already funded by the government is not provided.'
        }
      ]
    },
    {
      categoryMr: '२. कागदपत्रे व पडताळणी',
      categoryEn: '2. Documents & Verification',
      items: [
        {
          id: 'q4',
          qMr: 'उत्पन्नाचा दाखला कोणाचा चालेल?',
          qEn: 'Whose income certificate is valid?',
          aMr: 'तहसीलदार किंवा उपविभागीय अधिकारी (SDO) यांनी दिलेला अधिकृत उत्पन्नाचा दाखलाच ग्राह्य धरला जातो. ग्रामीण भागासाठी ग्रामसेवक दाखला पडताळणीसाठी ग्राह्य धरला जाऊ शकतो.',
          aEn: 'Official income certificates issued by Tahsildar or SDO are mandatory. Gram Sevak certificates in rural sectors may be considered subject to verification.'
        },
        {
          id: 'q5',
          qMr: 'मूळ कागदपत्रे (Originals) पाठवायची आहेत का?',
          qEn: 'Do I need to send original documents by post?',
          aMr: 'नाही! कोणतीही मूळ कागदपत्रे पोस्टाने पाठवू नका. केवळ स्पष्ट झेरॉक्स प्रती काढून त्यावर स्वतःची स्वाक्षरी (Self-Attest) करून पाठवावी.',
          aEn: 'No! Never send original documents. Only send clear, self-attested photocopies signed by the applicant.'
        },
        {
          id: 'q6',
          qMr: 'स्वहस्तलिखित पत्रात काय लिहावे?',
          qEn: 'What should be written in the handwritten letter?',
          aMr: 'विद्यार्थ्याने स्वतःच्या हस्ताक्षरात: (१) आपली कौटुंबिक आर्थिक परिस्थिती, (२) शिक्षणाचे ध्येय व करिअरचे स्वप्न, (३) या शिष्यवृत्तीची का गरज आहे, व (४) पैशांचा सदुपयोग करण्याचे वचन मराठी/हिंदी/इंग्रजीत लिहावे.',
          aEn: 'In your own handwriting: describe your family background, educational aspiration, reason for requiring financial aid, and a sincere pledge to utilize funds with utmost discipline.'
        }
      ]
    },
    {
      categoryMr: '३. अर्ज प्रक्रिया व निवड',
      categoryEn: '3. Application Process & Selection',
      items: [
        {
          id: 'q7',
          qMr: 'फक्त ऑनलाइन अर्ज भरला तर चालेल का?',
          qEn: 'Is online application alone sufficient?',
          aMr: 'नाही. ऑनलाइन अर्ज भरल्यानंतर ऑफलाइन अर्ज फॉर्म डाऊनलोड करून, त्यावर Reference Number लिहून सर्व साक्षांकित कागदपत्रांसह पुणे कार्यालयात पाठवणे अनिवार्य आहे.',
          aEn: 'No. After submitting the online application, downloading the physical PDF form and posting it with all self-attested documents to the Pune office is mandatory.'
        },
        {
          id: 'q8',
          qMr: 'अर्जाची निवड प्रक्रिया कशी होते?',
          qEn: 'How does the selection process work?',
          aMr: '१. कागदपत्र छाननी, २. आवश्यकतेनुसार टेलिफोनिक किंवा प्रत्यक्ष मुलाखत / गृहभेट, ३. ट्रस्ट कमिटीकडून मंजुरी व अधिकृत संमतीपत्र वाटप.',
          aEn: '1. Initial document scrutiny, 2. Telephonic interview or volunteer home verification if needed, 3. Review by Trust Board and final grant sanction letter.'
        }
      ]
    }
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-header__inner">
          <div className="page-header__eyebrow">
            <span className="mr">प्रश्नोत्तरे</span>
            <span className="en">Help Center</span>
          </div>
          <h1>
            <span className="mr">वारंवार विचारले जाणारे प्रश्न (FAQ)</span>
            <span className="en">Frequently Asked Questions</span>
          </h1>
          <p>
            <span className="mr">विद्यार्थी आणि पालकांच्या मनातील सर्व प्रश्नांची उत्तरे</span>
            <span className="en">Clear answers to common questions about eligibility, documents, and selection</span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '820px' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', marginBottom: '36px' }}>
            <Search size={20} color="var(--ink-soft)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('प्रश्नांमध्ये शोधा... (उदा: उत्पन्न, दाखला, पात्रता, फी)', 'Search questions (e.g., income, marks, documents, fees)...')}
              className="form-input"
              style={{ paddingLeft: '46px', fontSize: '15px', height: '50px', borderRadius: '10px' }}
            />
          </div>

          {/* Categorized FAQs */}
          {(() => {
            let totalMatches = 0;
            const content = faqData.map((cat, catIdx) => {
              const filteredItems = cat.items.filter(item => {
                if (!searchQuery.trim()) return true;
                const q = searchQuery.toLowerCase();
                return item.qMr.toLowerCase().includes(q) ||
                       item.qEn.toLowerCase().includes(q) ||
                       item.aMr.toLowerCase().includes(q) ||
                       item.aEn.toLowerCase().includes(q);
              });

              totalMatches += filteredItems.length;
              if (filteredItems.length === 0) return null;

              return (
                <div key={catIdx} style={{ marginBottom: '36px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--red)', borderBottom: '2px solid var(--red-mid)', paddingBottom: '8px', marginBottom: '16px' }}>
                    <span className="mr">{cat.categoryMr}</span>
                    <span className="en">{cat.categoryEn}</span>
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {filteredItems.map(item => {
                      const isOpen = searchQuery.trim() ? (openItems[item.id] !== false) : !!openItems[item.id];
                      return (
                        <div
                          key={item.id}
                          className={`section-card faq-item ${isOpen ? 'is-open' : ''}`}
                        >
                          <button
                            id={`faq-header-${item.id}`}
                            type="button"
                            className="faq-item__header"
                            onClick={() => toggleItem(item.id)}
                            aria-expanded={isOpen}
                            aria-controls={`faq-answer-${item.id}`}
                          >
                            <span style={{ fontSize: '15px', fontWeight: 600, color: isOpen ? 'var(--red-deep)' : 'var(--ink)' }}>
                              <span className="mr">{item.qMr}</span>
                              <span className="en">{item.qEn}</span>
                            </span>
                          </button>

                          <div
                            id={`faq-answer-${item.id}`}
                            className={`faq-item__collapse ${isOpen ? 'is-open' : ''}`}
                            role="region"
                            aria-labelledby={`faq-header-${item.id}`}
                            aria-hidden={!isOpen}
                          >
                            <div className="faq-item__inner">
                              <div className="faq-item__answer">
                                <span className="mr">{item.aMr}</span>
                                <span className="en">{item.aEn}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            });

            if (searchQuery.trim() && totalMatches === 0) {
              return (
                <div className="section-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <HelpCircle size={40} color="var(--ink-soft)" style={{ margin: '0 auto 12px' }} />
                  <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>
                    <span className="mr">'{searchQuery}' साठी कोणताही प्रश्न आढळला नाही</span>
                    <span className="en">No questions found matching '{searchQuery}'</span>
                  </h4>
                  <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', marginBottom: '16px' }}>
                    <span className="mr">कृपया दुसरा शब्द टाईप करा किंवा खालील बटण दाबून शोध रीसेट करा.</span>
                    <span className="en">Try searching with a different keyword or reset the search.</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="btn btn-outline"
                    style={{ fontSize: '13px', padding: '6px 16px' }}
                  >
                    <span className="mr">शोध साफ करा</span>
                    <span className="en">Clear Search</span>
                  </button>
                </div>
              );
            }

            return content;
          })()}
        </div>
      </section>
    </div>
  );
};

export default FaqPage;
