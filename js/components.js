// ── Disha Pariwar Portal — Shared Components v3 ──

// ── Safe in-page notification for alerts in iframe/sandboxed environments ──
if (typeof window !== 'undefined') {
  window.alert = function (msg) {
    try {
      let toast = document.getElementById('dp-global-alert');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'dp-global-alert';
        toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);max-width:92vw;width:440px;background:#1C1208;color:#FFFDF6;padding:14px 18px;border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,0.35);z-index:999999;font-family:sans-serif;font-size:14px;line-height:1.5;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;border-left:5px solid #BE1A1C;';
        if (document.body) {
          document.body.appendChild(toast);
        } else {
          document.addEventListener('DOMContentLoaded', () => document.body.appendChild(toast), { once: true });
        }
      }
      const safeText = String(msg || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      toast.innerHTML = `<div style="flex:1;white-space:pre-line;">${safeText}</div><button type="button" style="background:none;border:none;color:#F4EDD8;cursor:pointer;font-size:20px;line-height:1;padding:0 4px;" onclick="this.parentElement.style.display='none'">&times;</button>`;
      toast.style.display = 'flex';
      setTimeout(() => {
        if (toast && toast.style) toast.style.display = 'none';
      }, 7000);
    } catch (e) {
      console.warn('Alert:', msg);
    }
  };
}

// ── Backend URLs ──
// ⚠️ PRODUCTION: Replace GAS_URL with your deployed Google Apps Script Web App URL
// Go to Apps Script → Deploy → Manage Deployments → copy the Web App URL
const GAS_URL = (()=>{ const u = 'https://script.google.com/macros/s/AKfycbzZcM_BwEU5xczvWlU1EwUeNO7JUaVs2u2v591dog1llxErZpPNuL6d5rIRir6b-z3gtA/exec'; if(u.startsWith('PASTE_')) { console.error('DISHA: GAS_URL not set — open js/components.js line 6'); } return u; })();
const GOOGLE_FORM_URL = ''; // Optional: replace with actual Google Form URL if needed

const DP = {
  phone: '9284073984',
  whatsapp: '9284073984',
  email: 'team.dishapariwar@gmail.com',
  hours: { mr: 'सकाळी १०:०० ते सायंकाळी ५:००', en: '10:00 AM – 5:00 PM' },
  netlify: 'https://dishapariwar.org.in',
  mapsLink: 'https://share.google/j19MisJZ0eCpyJcAC',
  operationalAddress: {
    mr: '२रा मजला, कॅपिटल टॉवर, शगुन चौक, लक्ष्मी रोड, नारायण पेठ, पुणे – ४११०३०',
    en: '2nd Floor, Capital Tower, Shagun Chowk, Laxmi Road, Narayan Peth, Pune – 411030',
  },
  legalAddress: {
    mr: 'सरोज भवन, बालाजी पार्क लेन नं. ३, केसनंद रोड, वाघोली, पुणे – ४१२२०७',
    en: 'Saroj Bhavan, Balaji Park Lane No. 3, Kesanand Road, Wagholi, Pune – 412207',
  },
};

// ── Language management ──
// IMPORTANT: Lang.init() is called immediately at script load (not inside DOMContentLoaded)
// so the body class is set BEFORE first paint → prevents FOUC.
const Lang = {
  current: (() => {
    try { return localStorage.getItem('dp_lang') || 'mr'; } catch(e) { return 'mr'; }
  })(),

  set(lang) {
    this.current = lang;
    try { localStorage.setItem('dp_lang', lang); } catch(e) {}
    document.documentElement.lang = lang === 'en' ? 'en' : 'mr';
    document.body.classList.toggle('lang-en', lang === 'en');
    document.querySelectorAll('.lang-toggle__btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    // Dispatch custom event so dynamic content (dashboard stage tracker, etc.) can re-apply visibility
    document.dispatchEvent(new CustomEvent('lang-changed', { detail: { lang } }));
  },

  init() {
    // Apply immediately — body class must be set before paint
    document.documentElement.lang = this.current === 'en' ? 'en' : 'mr';
    document.body.classList.toggle('lang-en', this.current === 'en');
    // Mark body as ready (reveals content — prevents FOUC)
    document.body.classList.add('dp-ready');
  }
};

// ── Run Lang.init() immediately when this script executes ──
// This works because components.js is loaded in <head defer> on all pages.
// On pages that still load it in <body>, it runs before DOMContentLoaded but
// after body element exists, so classList.add is safe.
if (document.body) {
  Lang.init();
} else {
  // Fallback for head-loaded scripts before body exists
  document.addEventListener('DOMContentLoaded', () => Lang.init(), { once: true });
}

// ── Bilingual text helper ──
// Returns the correct string based on current language.
function t(mr, en) {
  return Lang.current === 'en' ? en : mr;
}

function langToggleHTML() {
  return `<div class="lang-toggle" role="group" aria-label="Language / भाषा">
    <button class="lang-toggle__btn${Lang.current === 'mr' ? ' active' : ''}" data-lang="mr" onclick="Lang.set('mr')">मराठी</button>
    <button class="lang-toggle__btn${Lang.current === 'en' ? ' active' : ''}" data-lang="en" onclick="Lang.set('en')">English</button>
  </div>`;
}

// ── Shared Document Logic ──
function getRequiredDocuments(data = {}) {
  const req = [
    // ── Always required ──────────────────────────────────────────────────────
    { id: 'doc-photo',        icon: '🧑‍🎓', mr: 'पासपोर्ट फोटो',              en: 'Passport Photo',                 hint_mr: 'विद्यार्थ्याचा अलीकडील फोटो',             hint_en: 'Recent passport-size photo of student' },
    { id: 'doc-aadhar',       icon: '🪪',   mr: 'आधार कार्ड (विद्यार्थी)',     en: 'Aadhaar Card (Student)',         hint_mr: 'दोन्ही बाजू',                              hint_en: 'Both sides' },
    { id: 'doc-marksheet-10', icon: '📋',   mr: '१०वी मार्कशीट',              en: '10th Marksheet',                 hint_mr: 'बोर्डाची मार्कशीट',                        hint_en: 'Board marksheet' },
    { id: 'doc-fee-structure',icon: '🧾',   mr: 'फी स्ट्रक्चर',               en: 'Fee Structure',                  hint_mr: 'महाविद्यालयाचे अधिकृत शुल्क पत्रक',       hint_en: 'Official college fee structure for current year — mandatory' },
    { id: 'doc-income',       icon: '📄',   mr: 'उत्पन्नाचा दाखला',            en: 'Income Certificate',             hint_mr: 'तहसीलदार / ग्रामसेवक — ₹८ लाखांपेक्षा कमी', hint_en: 'Tahsildar / Gram Sevak — must be below ₹8 lakh' },
    { id: 'doc-bonafide',     icon: '🏫',   mr: 'प्रवेश पत्र / Bonafide',      en: 'Admission Letter / Bonafide',    hint_mr: 'CAP / Direct — कोणतेही चालेल',              hint_en: 'CAP or Direct admission letter accepted' },
    { id: 'doc-ration',       icon: '📑',   mr: 'रेशन कार्ड / कुटुंब दाखला',   en: 'Ration Card / Family Certificate', hint_mr: 'कुटुंबातील सदस्यांच्या नावासाठी',        hint_en: 'To verify family composition' },
    { id: 'doc-lightbill',    icon: '💡',   mr: 'लाईट बिल',                   en: 'Electricity Bill',               hint_mr: 'घराचे चालू लाईट बिल',                     hint_en: 'Recent house electricity bill' },
    { id: 'doc-bank',         icon: '🏦',   mr: 'बँक पासबुक / रद्द केलेला चेक', en: 'Bank Passbook / Cancelled Cheque', hint_mr: 'विद्यार्थ्याच्या नावावरील खाते — पहिले पान', hint_en: "Student's account — first page with name, IFSC, account no." },
    {
      id: 'doc-student-letter',
      icon: '✍️',
      mr: 'विद्यार्थ्याचे स्वहस्तलिखित पत्र',
      en: 'Student\'s Handwritten Letter',
      hint_mr: 'स्वतःच्या हस्ताक्षरात लिहिलेले पत्र — मराठी/हिंदी/इंग्रजी — स्कॅन करून अपलोड करा आणि मूळ पत्र पोस्टाने पाठवा',
      hint_en: 'Letter in your own handwriting — any language, Marathi preferred — upload scan AND post the original',
      hint_extra_mr: 'पत्रात नमूद करा: (१) शिष्यवृत्तीची गरज — आपली परिस्थिती, (२) कौटुंबिक पार्श्वभूमी, (३) शैक्षणिक ध्येय व भविष्याचे स्वप्न, (४) निधीचा जबाबदारीने वापर करण्याचे वचन. यापलीकडे जे सांगायचे ते मनमोकळेपणाने लिहा.',
      hint_extra_en: 'Cover: (1) Why you need this scholarship — your situation, (2) Family background in your words, (3) Educational goals & future plans, (4) A pledge to use funds responsibly. Beyond these, write freely — anything you feel the committee should know.',
    },
  ];

  // ── Caste certificate — for reserved category students ───────────────────
  const category = String(data.category || data['Category'] || '').toUpperCase();
  const openCategories = ['OPEN', 'GENERAL', 'GEN', ''];
  if (!openCategories.includes(category)) {
    req.push({ id: 'doc-caste', icon: '📃', mr: 'जात प्रमाणपत्र / Caste Certificate', en: 'Caste Certificate', hint_mr: 'सक्षम प्राधिकाऱ्याने दिलेले', hint_en: 'Issued by competent authority' });
  }

  const course = String(data.course || data['Course'] || '').toLowerCase();
  const marks12th = String(data.marks_12th || data.marks_diploma || data['12th/Diploma Marks'] || '');
  if (marks12th || ['ug', 'lateral', 'pg'].includes(course) || course.includes('ug') || course.includes('pg') || course.includes('2nd') || course.includes('degree')) {
    req.push({ id: 'doc-marksheet-12', icon: '📋', mr: '१२वी / Diploma मार्कशीट', en: '12th / Diploma Marksheet', hint_mr: '', hint_en: '' });
  }

  if (course === '2nd_onward' || course === 'pg' || course.includes('2nd') || course.includes('pg') || (course.includes('year') && !course.includes('1st'))) {
    req.push({ id: 'doc-marksheet-prev', icon: '🎓', mr: 'मागील सेमिस्टर / वर्षाची मार्कशीट', en: 'Previous Semester/Year Marksheets', hint_mr: 'सर्व पास झालेले निकाल', hint_en: 'All passing results from 10th to now' });
  }

  const entrance = String(data.entrance_score || data['JEE/CET/NEET Score'] || '');
  if (entrance && entrance.toUpperCase() !== 'NA') {
    req.push({ id: 'doc-entrance', icon: '💯', mr: 'JEE / CET / NEET Scorecard', en: 'Entrance Exam Scorecard', hint_mr: '', hint_en: '' });
  }

  const parentStatus = String(data.parent_status || data['Parent Status'] || '').toLowerCase();
  if (parentStatus.includes('mother') || parentStatus.includes('father') || parentStatus.includes('orphan') || parentStatus.includes('अनाथ')) {
    req.push({ id: 'doc-deathcert', icon: '🕊️', mr: 'पालकांचा मृत्यू दाखला', en: "Parent's Death Certificate", hint_mr: '', hint_en: '' });
  }

  const famFather = data['Father Occupation'] || '';
  const famMother = data['Mother Occupation'] || '';
  const famOther = data['Other Earning Members'] || '';
  const familyDesc = String(data.family_occupations || (famFather + ' ' + famMother + ' ' + famOther) || '').toLowerCase();
  if (familyDesc.includes('farm') || familyDesc.includes('agri') || familyDesc.includes('शेतकरी') || familyDesc.includes('शेती') || familyDesc.includes('मजूर')) {
    req.push({ id: 'doc-712', icon: '🌾', mr: '७/१२ उतारा', en: '7/12 Extract', hint_mr: '', hint_en: '' });
  }

  const disabled = String(data.disabled_member || data['Disabled Family Member'] || '').toLowerCase();
  if (disabled === 'yes' || disabled === 'होय') {
    req.push({ id: 'doc-medical', icon: '🏥', mr: 'अपंगत्व / वैद्यकीय प्रमाणपत्र', en: 'Medical / Disability Certificate', hint_mr: '', hint_en: '' });
  }

  const hostel = parseFloat(data.fee_hostel || data['Hostel Fee (Annual)'] || 0);
  if (hostel > 0) req.push({ id: 'doc-hostel', icon: '🏠', mr: 'वसतिगृह फी पावती', en: 'Hostel Fee Receipt', hint_mr: '', hint_en: '' });

  const college = parseFloat(data.fee_college || data['College Fee (Annual)'] || 0);
  if (college > 0) req.push({ id: 'doc-college-fee', icon: '🧾', mr: 'महाविद्यालय फी पावती', en: 'College Fee Receipt', hint_mr: '', hint_en: '' });

  const otherFees = parseFloat(data.fee_mess || data['Mess Fee (Annual)'] || 0) + parseFloat(data.fee_transport || data['Transport Fee (Annual)'] || 0) + parseFloat(data.fee_other || data['Other Expenses (Annual)'] || 0);
  if (otherFees > 0) req.push({ id: 'doc-declaration', icon: '📁', mr: 'इतर खर्चाचे स्वयंघोषणापत्र', en: 'Other Expenses Declaration', hint_mr: 'पावती नसलेल्या खर्चासाठी', hint_en: 'For expenses without formal receipts' });

  // ── Govt scholarship sanction letter — if student receives any govt aid ──
  const govtScholarship = String(data.govt_scholarship_received || data['Govt Scholarship Received'] || '').toLowerCase();
  if (govtScholarship === 'yes' || govtScholarship === 'होय') {
    req.push({ id: 'doc-govt-scholarship', icon: '🏛️', mr: 'शासकीय शिष्यवृत्ती मंजूर पत्र', en: 'Govt Scholarship Sanction Letter', hint_mr: 'OBC/EBC/SC/ST/TFWS — मंजूर रक्कम नमूद असलेले पत्र', hint_en: 'OBC/EBC/SC/ST/TFWS — letter showing sanctioned amount' });
  }

  return req;
}

// ── Doc explanation helpers ──────────────────────────────────────────────────
// Returns the explanation textarea HTML for a given doc id
function docExplanationHTML(docId, existingText) {
  const val = existingText ? existingText.replace(/"/g, '&quot;') : '';
  return `<div class="doc-explain-wrap" id="explain-wrap-${docId}" style="display:${existingText ? 'block' : 'none'};margin-top:8px;">
    <label style="font-size:12px;font-weight:600;color:var(--maroon,#7B1F16);">
      <span class="mr">हे कागदपत्र सध्या उपलब्ध नाही — कारण / नंतर कधी मिळेल ते सांगा:</span>
      <span class="en">Document not available now — briefly explain why / when you can submit it:</span>
    </label>
    <textarea id="explain-${docId}" rows="2" maxlength="400"
      placeholder="उदा: उत्पन्नाचा दाखला तहसीलदाराकडे अर्जात आहे, १५ दिवसात मिळेल | e.g. Income cert applied at Tahsildar, will receive in 15 days"
      style="width:100%;margin-top:4px;padding:8px;font-size:13px;border:1px solid #c9a96e;border-radius:5px;resize:vertical;font-family:inherit;"
    >${val}</textarea>
    <div style="font-size:11px;color:var(--ink-soft,#888);text-align:right;margin-top:2px;"><span class="mr">जास्तीत जास्त ४०० अक्षरे</span><span class="en">Max 400 characters</span></div>
  </div>`;
}

// Toggle explanation box: show when no file chosen, hide when file is uploaded
function toggleExplainBox(docId, hasFile) {
  const wrap = document.getElementById('explain-wrap-' + docId);
  if (!wrap) return;
  if (hasFile) {
    wrap.style.display = 'none';
    const ta = document.getElementById('explain-' + docId);
    if (ta) ta.value = ''; // clear explanation if file chosen — not needed anymore
  } else {
    wrap.style.display = 'block';
  }
}

// Collect all explanations from DOM → {doc_id: text} (only non-empty)
function collectDocExplanations(requiredDocs) {
  const out = {};
  (requiredDocs || []).forEach(doc => {
    const ta = document.getElementById('explain-' + doc.id);
    if (ta && ta.value.trim()) out[doc.id] = ta.value.trim();
  });
  return out;
}

// ── Nav ──
function renderNav(activePage = '') {
  const links = [
    { href: 'index.html',        mr: 'मुख्यपान',          en: 'Home' },
    { href: 'about.html',        mr: 'शिष्यवृत्ती बद्दल',  en: 'About' },
    { href: 'how-to-apply.html', mr: 'अर्ज कसा करावा',    en: 'How to Apply' },
    { href: 'documents.html',    mr: 'कागदपत्रे',          en: 'Documents' },
    { href: 'faq.html',          mr: 'FAQ',                en: 'FAQ' },
    { href: 'contact.html',      mr: 'संपर्क',             en: 'Contact' },
    { href: 'dashboard.html',    mr: 'अर्ज ट्रॅक करा',    en: 'Track Status' },
    { href: 'https://dishapariwar.org.in/scholarship.html', mr: '← मुख्य संकेतस्थळ', en: '← Main Website', external: true },
  ];

  const navLinksHTML = links.map(l => `
    <li>
      <a href="${l.href}" class="${activePage === l.href ? 'active' : ''}${l.external ? ' nav__website-link' : ''}" ${l.external ? 'style="opacity:0.75;font-size:0.85em;"' : ''}>
        <span class="mr">${l.mr}</span><span class="en">${l.en}</span>
      </a>
    </li>`
  ).join('');

  const mobileLinksHTML = links.map(l =>
    `<a href="${l.href}"><span class="mr">${l.mr}</span><span class="en">${l.en}</span></a>`
  ).join('');

  const navEl = document.getElementById('nav-placeholder');
  if (!navEl) return;
  navEl.innerHTML = `
    <nav class="nav" role="navigation" aria-label="Main navigation">
      <div class="nav__inner">
        <a href="index.html" class="nav__brand" aria-label="Disha Pariwar Home">
          <img src="assets/logo.png" alt="Disha Pariwar Charitable Trust" class="nav__logo-img" />
          <div>
            <div class="nav__name">
              <span class="mr">दिशा पारिवार चॅरिटेबल ट्रस्ट</span>
              <span class="en">Disha Pariwar Charitable Trust</span>
            </div>
            <div class="nav__tagline">
              <span class="mr">एक शैक्षणिक चळवळ</span>
              <span class="en">An Educational Movement · Pune</span>
            </div>
          </div>
        </a>
        <ul class="nav__links" role="list">
          ${navLinksHTML}
        </ul>
        <div class="nav__right">
          ${langToggleHTML()}
          <a href="register.html" class="btn btn-red nav__cta">
            <span class="mr">अर्ज करा</span><span class="en">Apply Now</span>
          </a>
          <button class="nav__burger" id="burger-btn" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
    <div class="mobile-nav" id="mobile-nav" role="dialog" aria-label="Mobile menu">
      <div class="mobile-nav__lang">${langToggleHTML()}</div>
      ${mobileLinksHTML}
      <a href="register.html" class="cta-mobile">
        <span class="mr">अर्ज करा →</span><span class="en">Apply Now →</span>
      </a>
      <a href="dashboard.html">
        <span class="mr">स्थिती तपासा</span><span class="en">Check Status</span>
      </a>
    </div>
  `;

  const burger    = document.getElementById('burger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Re-apply language state to the freshly-rendered nav buttons
  Lang.set(Lang.current);
}

// ── Footer ──
function renderFooter() {
  const footerEl = document.getElementById('footer-placeholder');
  if (!footerEl) return;
  footerEl.innerHTML = `
    <footer class="footer">
      <div class="footer__inner">
        <div class="footer__brand">
          <img src="assets/logo.png" alt="Disha Pariwar Charitable Trust" class="footer__logo-img" />
          <div class="footer__name">
            <span class="mr">दिशा पारिवार चॅरिटेबल ट्रस्ट</span>
            <span class="en">Disha Pariwar Charitable Trust</span>
          </div>
          <div class="footer__tagline">
            <span class="mr">आम्ही फक्त दोन हातांमधील अंतर कमी करतो — एक शैक्षणिक चळवळ</span>
            <span class="en">We simply reduce the distance between two hands — an educational movement</span>
          </div>
          <div class="footer__address">
            <strong style="color:rgba(255,255,255,0.45);font-size:11px;">
              <span class="mr">कार्यालय</span><span class="en">Office</span>:
            </strong><br>
            <span class="mr">${DP.operationalAddress.mr}</span>
            <span class="en">${DP.operationalAddress.en}</span><br>
            <span style="color:rgba(255,255,255,0.32);font-size:11px;">
              <span class="mr">नोंदणीकृत: ${DP.legalAddress.mr}</span>
              <span class="en">Registered: ${DP.legalAddress.en}</span>
            </span>
          </div>
        </div>
        <div>
          <div class="footer__col-title">
            <span class="mr">उपयुक्त दुवे</span><span class="en">Quick Links</span>
          </div>
          <ul class="footer__links">
            <li><a href="about.html"><span class="mr">शिष्यवृत्ती बद्दल</span><span class="en">About Scholarship</span></a></li>
            <li><a href="how-to-apply.html"><span class="mr">अर्ज कसा करावा</span><span class="en">How to Apply</span></a></li>
            <li><a href="documents.html"><span class="mr">कागदपत्रांची यादी</span><span class="en">Document Checklist</span></a></li>
            <li><a href="register.html"><span class="mr">ऑनलाइन अर्ज</span><span class="en">Online Application</span></a></li>
            <li><a href="dashboard.html"><span class="mr">स्थिती तपासा</span><span class="en">Track Application</span></a></li>
            <li><a href="faq.html">FAQ</a></li>
          </ul>
        </div>
        <div>
          <div class="footer__col-title">
            <span class="mr">संपर्क</span><span class="en">Contact</span>
          </div>
          <ul class="footer__links">
            <li><a href="tel:${DP.phone}">📞 ${DP.phone}</a></li>
            <li><a href="https://wa.me/91${DP.whatsapp}" target="_blank" rel="noopener">💬 WhatsApp</a></li>
            <li><a href="mailto:${DP.email}" style="word-break:break-all;">✉️ ${DP.email}</a></li>
            <li style="color:rgba(255,255,255,0.45);font-size:12px;">
              ⏰ <span class="mr">${DP.hours.mr}</span><span class="en">${DP.hours.en}</span>
            </li>
            <li><a href="${DP.mapsLink}" target="_blank" rel="noopener">
              📍 <span class="mr">Google Maps</span><span class="en">Google Maps</span>
            </a></li>
          </ul>
          <div style="margin-top:18px;display:flex;gap:10px;">
            <a href="https://www.instagram.com/disha_pariwar" target="_blank" rel="noopener"
               style="color:rgba(255,255,255,0.55);font-size:12px;transition:color 0.15s;"
               onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.55)'">
              📷 Instagram
            </a>
            <a href="https://www.youtube.com/@disha_pariwar" target="_blank" rel="noopener"
               style="color:rgba(255,255,255,0.55);font-size:12px;transition:color 0.15s;"
               onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.55)'">
              ▶ YouTube
            </a>
          </div>
        </div>
      </div>
      <div class="footer__bottom">
        <span class="footer__legal">
          © ${new Date().getFullYear()} 
          <span class="mr">दिशा पारिवार चॅरिटेबल ट्रस्ट — सर्व हक्क राखीव</span>
          <span class="en">Disha Pariwar Charitable Trust — All Rights Reserved</span>
        </span>
        <span class="footer__reg">
          <a href="privacy.html" style="color:inherit;">
            <span class="mr">गोपनीयता धोरण</span><span class="en">Privacy Policy</span>
          </a>
          &nbsp;|&nbsp;
          <span class="mr">DPDP Act 2023 अनुपालित | स्वयंसेवकांनी बनवलेले पोर्टल</span>
          <span class="en">DPDP Act 2023 compliant | Built by volunteers</span>
        </span>
      </div>
    </footer>
  `;
}
