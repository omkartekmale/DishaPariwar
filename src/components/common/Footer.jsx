import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Reusable Footer component using existing 'footer' CSS classes
 * @param {Object} props
 * @param {string} [props.logoSrc] - Path to trust logo image
 * @param {Object} [props.brandName] - Bilingual brand title { mr: string, en: string }
 * @param {Object} [props.tagline] - Bilingual tagline { mr: string, en: string }
 * @param {Object} [props.operationalAddress] - Bilingual operational address { mr: string, en: string }
 * @param {Object} [props.legalAddress] - Bilingual registered address { mr: string, en: string }
 * @param {Array} [props.quickLinks] - Custom array of quick links [{ path, mr, en }]
 * @param {Object} [props.contact] - Contact info { phone, whatsapp, email, hours, mapsLink }
 * @param {Array} [props.socialLinks] - Array of social links [{ label, url, icon }]
 * @param {boolean} [props.showPrivacy] - Show DPDP Act & Privacy Policy in footer bottom
 */
const Footer = ({
  logoSrc = '/assets/logo.png',
  brandName = {
    mr: 'दिशा पारिवार चॅरिटेबल ट्रस्ट',
    en: 'Disha Pariwar Charitable Trust',
  },
  tagline = {
    mr: 'आम्ही फक्त दोन हातांमधील अंतर कमी करतो — एक शैक्षणिक चळवळ',
    en: 'We simply reduce the distance between two hands — an educational movement',
  },
  operationalAddress = {
    mr: '२रा मजला, कॅपिटल टॉवर, शगुन चौक, लक्ष्मी रोड, नारायण पेठ, पुणे – ४११०३०',
    en: '2nd Floor, Capital Tower, Shagun Chowk, Laxmi Road, Narayan Peth, Pune – 411030',
  },
  legalAddress = {
    mr: 'सरोज भवन, बालाजी पार्क लेन नं. ३, केसनंद रोड, वाघोली, पुणे – ४१२२०७',
    en: 'Saroj Bhavan, Balaji Park Lane No. 3, Kesanand Road, Wagholi, Pune – 412207',
  },
  quickLinks: customQuickLinks,
  contact = {
    phone: '9284073984',
    whatsapp: '9284073984',
    email: 'team.dishapariwar@gmail.com',
    hours: { mr: 'सकाळी १०:०० ते सायंकाळी ५:००', en: '10:00 AM – 5:00 PM' },
    mapsLink: 'https://maps.google.com/?q=Disha+Pariwar+Charitable+Trust+Pune',
  },
  socialLinks = [
    { label: '📷 Instagram', url: 'https://www.instagram.com/disha_pariwar' },
    { label: '▶ YouTube', url: 'https://www.youtube.com/@disha_pariwar' }
  ],
  showPrivacy = true
}) => {
  const { t } = useLanguage();

  const defaultQuickLinks = [
    { path: '/about', mr: 'शिष्यवृत्ती बद्दल', en: 'About Scholarship' },
    { path: '/how-to-apply', mr: 'अर्ज कसा करावा', en: 'How to Apply' },
    { path: '/documents', mr: 'कागदपत्रांची यादी', en: 'Document Checklist' },
    { path: '/apply', mr: 'ऑनलाइन अर्ज', en: 'Online Application' },
    { path: '/dashboard', mr: 'स्थिती तपासा', en: 'Track Application' },
    { path: '/faq', mr: 'FAQ', en: 'FAQ' },
    { path: '/admin', mr: 'प्रशासक लॉगिन', en: 'Admin Portal' },
  ];

  const links = customQuickLinks || defaultQuickLinks;

  return (
    <footer className="footer" role="contentinfo" aria-label="Site footer">
      <div className="footer__inner">
        {/* Branding & Address Column */}
        <div className="footer__brand">
          <img
            src={logoSrc}
            alt={brandName.en}
            className="footer__logo-img"
            onError={(e) => { e.target.src = '/logo.png'; }}
          />
          <div className="footer__name">
            <span className="mr">{brandName.mr}</span>
            <span className="en">{brandName.en}</span>
          </div>
          <div className="footer__tagline">
            <span className="mr">{tagline.mr}</span>
            <span className="en">{tagline.en}</span>
          </div>
          <div className="footer__address">
            <strong style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>
              <span className="mr">कार्यालय: </span>
              <span className="en">Office: </span>
            </strong>
            <span className="mr">{operationalAddress.mr}</span>
            <span className="en">{operationalAddress.en}</span>
            <br />
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', display: 'inline-block', marginTop: '4px' }}>
              <span className="mr">नोंदणीकृत: {legalAddress.mr}</span>
              <span className="en">Registered: {legalAddress.en}</span>
            </span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <div className="footer__col-title">
            <span className="mr">उपयुक्त दुवे</span>
            <span className="en">Quick Links</span>
          </div>
          <ul className="footer__links">
            {links.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>
                  <span className="mr">{link.mr}</span>
                  <span className="en">{link.en}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social Column */}
        <div>
          <div className="footer__col-title">
            <span className="mr">संपर्क</span>
            <span className="en">Contact</span>
          </div>
          <ul className="footer__links">
            {contact.phone && (
              <li>
                <a href={`tel:${contact.phone}`}>📞 {contact.phone}</a>
              </li>
            )}
            {contact.whatsapp && (
              <li>
                <a
                  href={`https://wa.me/91${contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  💬 WhatsApp: {contact.whatsapp}
                </a>
              </li>
            )}
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`} style={{ wordBreak: 'break-all' }}>
                  ✉️ {contact.email}
                </a>
              </li>
            )}
            {contact.hours && (
              <li style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px' }}>
                ⏰ <span className="mr">{contact.hours.mr}</span>
                <span className="en">{contact.hours.en}</span>
              </li>
            )}
            {contact.mapsLink && (
              <li>
                <a href={contact.mapsLink} target="_blank" rel="noopener noreferrer">
                  📍 <span className="mr">Google Maps वर कार्यालय पहा</span>
                  <span className="en">View on Google Maps</span>
                </a>
              </li>
            )}
          </ul>

          {socialLinks && socialLinks.length > 0 && (
            <div style={{ marginTop: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Legal Notice */}
      <div className="footer__bottom">
        <span className="footer__legal">
          © {new Date().getFullYear()}{' '}
          <span className="mr">{brandName.mr} — सर्व हक्क राखीव</span>
          <span className="en">{brandName.en} — All Rights Reserved</span>
        </span>

        {showPrivacy && (
          <span className="footer__reg">
            <Link to="/privacy" style={{ color: 'inherit', textDecoration: 'underline' }}>
              <span className="mr">गोपनीयता धोरण</span>
              <span className="en">Privacy Policy</span>
            </Link>
            &nbsp;|&nbsp;
            <a
              href="/Disha_Pariwar_Project_Management_Documentation.doc"
              download="Disha_Pariwar_Project_Management_Documentation.doc"
              style={{ color: '#F5C842', textDecoration: 'underline' }}
              title="Download Project Management Documentation (.doc)"
            >
              📄 <span className="mr">प्रकल्प अहवाल (PM .DOC)</span>
              <span className="en">Project Dossier (.DOC)</span>
            </a>
            &nbsp;|&nbsp;
            <span className="mr">DPDP Act 2023 अनुपालित | विद्यार्थी सहाय्यता पोर्टल</span>
            <span className="en">DPDP Act 2023 Compliant | Student Support Portal</span>
          </span>
        )}
      </div>
    </footer>
  );
};

export default Footer;
