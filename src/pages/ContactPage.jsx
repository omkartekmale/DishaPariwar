import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, ExternalLink } from 'lucide-react';

const ContactPage = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await api.submitInquiry(formData);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header__inner">
          <div className="page-header__eyebrow">
            <span className="mr">संपर्क</span>
            <span className="en">Contact</span>
          </div>
          <h1>
            <span className="mr">दिशा परिवार कार्यालय संपर्क</span>
            <span className="en">Contact Disha Pariwar Office</span>
          </h1>
          <p>
            <span className="mr">कागदपत्रे पाठवण्यासाठी व चौकशीसाठी पत्ता व संपर्क तपशील</span>
            <span className="en">Postal address for application dispatch, phone lines & office inquiries</span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '28px' }}>
            {/* Contact Details Column */}
            <div>
              <div className="section-card" style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--red-deep)', marginBottom: '18px' }}>
                  🏢 <span className="mr">कार्यालय व पोस्टल पत्ता</span><span className="en">Office & Postal Address</span>
                </h3>

                <div style={{ display: 'flex', gap: '14px', marginBottom: '16px' }}>
                  <MapPin size={22} color="var(--red)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>
                      <span className="mr">कार्यकारी कार्यालय (पोस्ट पाठवण्याचा पत्ता):</span>
                      <span className="en">Operational Office (Postal Address):</span>
                    </strong>
                    <p style={{ fontSize: '14px', color: 'var(--ink-mid)', marginTop: '4px', lineHeight: '1.6' }}>
                      <span className="mr">दिशा परिवार चॅरिटेबल ट्रस्ट, २रा मजला, कॅपिटल टॉवर, शगुन चौक, लक्ष्मी रोड, नारायण पेठ, पुणे – ४११०३०</span>
                      <span className="en">Disha Pariwar Charitable Trust, 2nd Floor, Capital Tower, Shagun Chowk, Laxmi Road, Narayan Peth, Pune – 411030</span>
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', marginBottom: '16px' }}>
                  <Phone size={20} color="var(--red)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>
                      <span className="mr">हेल्पलाईन फोन / WhatsApp:</span>
                      <span className="en">Helpline Phone / WhatsApp:</span>
                    </strong>
                    <div style={{ marginTop: '4px' }}>
                      <a href="tel:9284073984" style={{ fontSize: '15px', fontWeight: 600, color: 'var(--red)' }}>
                        +91 9284073984
                      </a>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', marginBottom: '16px' }}>
                  <Mail size={20} color="var(--red)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>
                      <span className="mr">अधिकृत ईमेल:</span>
                      <span className="en">Official Email:</span>
                    </strong>
                    <div style={{ marginTop: '4px' }}>
                      <a href="mailto:team.dishapariwar@gmail.com" style={{ fontSize: '14px', color: 'var(--ink-mid)' }}>
                        team.dishapariwar@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <Clock size={20} color="var(--red)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>
                      <span className="mr">कार्यालयीन वेळ:</span>
                      <span className="en">Working Hours:</span>
                    </strong>
                    <p style={{ fontSize: '14px', color: 'var(--ink-mid)', marginTop: '4px' }}>
                      <span className="mr">सकाळी १०:०० ते सायंकाळी ५:०० (सोमवार ते शनिवार)</span>
                      <span className="en">10:00 AM to 5:00 PM (Monday to Saturday)</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Direction */}
              <div className="section-card">
                <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '10px' }}>
                  📍 <span className="mr">गुगल मॅप्सवर दिशा पहा</span><span className="en">Find on Google Maps</span>
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--ink-mid)', marginBottom: '14px' }}>
                  <span className="mr">पुण्यातील नारायण पेठ लक्ष्मी रोडवरील कार्यालयास थेट भेट देण्यासाठी नकाशा वापरा.</span>
                  <span className="en">Navigate directly to our central Pune Narayan Peth office via Google Maps.</span>
                </p>
                <a
                  href="https://maps.google.com/?q=Disha+Pariwar+Charitable+Trust+Pune"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <ExternalLink size={16} />
                  <span className="mr">Google Maps उघडा</span>
                  <span className="en">Open in Google Maps</span>
                </a>
              </div>
            </div>

            {/* Inquiry Form Column */}
            <div>
              <div className="section-card">
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', color: 'var(--ink)' }}>
                  ✉️ <span className="mr">संदेश अथवा शंका विचारा</span><span className="en">Send Inquiry / Message</span>
                </h3>

                {submitted ? (
                  <div style={{ background: 'var(--success-bg)', padding: '24px', borderRadius: '8px', textAlign: 'center' }}>
                    <CheckCircle2 size={40} color="var(--success)" style={{ margin: '0 auto 12px' }} />
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--success)', marginBottom: '6px' }}>
                      <span className="mr">संदेश प्राप्त झाला!</span>
                      <span className="en">Message Sent Successfully!</span>
                    </h4>
                    <p style={{ fontSize: '13px', color: 'var(--ink-mid)' }}>
                      <span className="mr">दिशा परिवार प्रतिनिधी आपल्याशी लवकरच संपर्क साधतील.</span>
                      <span className="en">Our volunteer team will respond to you shortly.</span>
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">
                        <span className="mr">आपले नाव *</span>
                        <span className="en">Your Name *</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="उदा: सुशांत गायकवाड"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <span className="mr">मोबाईल नंबर *</span>
                        <span className="en">Phone Number *</span>
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={formData.mobile}
                        onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="98XXXXXXXX"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <span className="mr">ईमेल (पर्यायी)</span>
                        <span className="en">Email (Optional)</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@gmail.com"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <span className="mr">विषय *</span>
                        <span className="en">Subject *</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="उदा: फॉर्म पाठवला आहे / फी स्ट्रक्चरबाबत शंका"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <span className="mr">संदेश / प्रश्न *</span>
                        <span className="en">Message *</span>
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        placeholder="आपला संदेश येथे लिहा..."
                        className="form-textarea"
                      />
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-red" style={{ width: '100%' }}>
                      <Send size={16} />
                      <span>{loading ? t('पाठवत आहे...', 'Sending...') : t('संदेश पाठवा', 'Send Message')}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
