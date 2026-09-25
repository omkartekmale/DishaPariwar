// Disha Pariwar RESTful API Client
// Connects to Spring Boot backend at /api/v1, with local fallback for preview state

const BASE_URL = '/api/v1';

// Initial seed data for demo/preview if backend is not running yet
const DEFAULT_APPLICATIONS = [
  {
    referenceNumber: 'DP-2026-8492',
    studentName: 'अनिकेत ज्ञानेश्वर पाटील (Aniket Dnyaneshwar Patil)',
    mobile: '9876543210',
    email: 'aniket.patil@example.com',
    district: 'सातारा (Satara)',
    course: 'B.Tech Computer Engineering (1st Year)',
    collegeName: 'Government College of Engineering, Karad',
    familyIncome: 65000,
    marks10th: 88.40,
    marks12th: 82.60,
    status: 'UNDER_REVIEW', // UNDER_REVIEW, APPROVED, REJECTED, DOCUMENTS_PENDING
    statusMr: 'छाननी चालू आहे',
    statusEn: 'Under Committee Review',
    appliedAt: '2026-08-12',
    assignedReviewer: 'S. K. Joshi',
    remarks: 'सर्व कागदपत्रे प्राप्त झाली आहेत. समितीची बैठक लवकरच होईल.'
  },
  {
    referenceNumber: 'DP-2026-7215',
    studentName: 'प्रियांका राहुल साळुंखे (Priyanka Rahul Salunkhe)',
    mobile: '9123456780',
    email: 'priyanka.s@example.com',
    district: 'सोलापूर (Solapur)',
    course: 'Diploma in Electrical Engineering',
    collegeName: 'Government Polytechnic, Solapur',
    familyIncome: 48000,
    marks10th: 91.20,
    marks12th: null,
    status: 'APPROVED',
    statusMr: 'मंजूर करण्यात आला',
    statusEn: 'Scholarship Approved',
    appliedAt: '2026-07-28',
    sanctionAmount: 18000,
    remarks: 'पुणे कार्यालयास प्रत्यक्ष भेट देऊन संमती पत्र सादर करावे.'
  }
];

const getStoredApplications = () => {
  try {
    const saved = localStorage.getItem('dp_applications');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    localStorage.setItem('dp_applications', JSON.stringify(DEFAULT_APPLICATIONS));
    return DEFAULT_APPLICATIONS;
  } catch {
    return DEFAULT_APPLICATIONS;
  }
};

const saveStoredApplications = (apps) => {
  try {
    localStorage.setItem('dp_applications', JSON.stringify(apps));
  } catch (e) {
    console.warn('Storage error', e);
  }
};

export const api = {
  // Track application by Reference Number and Mobile
  async trackApplication(referenceNumber, mobile = '') {
    const safeRef = (referenceNumber || '').trim();
    const safeMobile = (mobile || '').trim();

    if (!safeRef) {
      return { success: false, message: 'Reference number is required.' };
    }

    try {
      const res = await fetch(`${BASE_URL}/applications/track?referenceNumber=${encodeURIComponent(safeRef)}&mobile=${encodeURIComponent(safeMobile)}`);
      if (res.ok) {
        const json = await res.json();
        if (json && json.success) return json;
      }
    } catch {
      // fallback to local storage
    }

    const apps = getStoredApplications();
    const cleanRef = safeRef.toUpperCase();

    const found = apps.find(a => 
      a.referenceNumber &&
      a.referenceNumber.toUpperCase() === cleanRef && 
      (!safeMobile || (a.mobile && (a.mobile.endsWith(safeMobile.slice(-4)) || a.mobile === safeMobile)))
    );

    if (found) return { success: true, data: found };
    return { success: false, message: 'Application not found with given details.' };
  },

  // Submit new scholarship application
  async submitApplication(data = {}) {
    const newRef = `DP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord = {
      referenceNumber: newRef,
      appliedAt: new Date().toISOString().split('T')[0],
      status: 'UNDER_REVIEW',
      statusMr: 'अर्ज प्राप्त झाला / छाननी प्रलंबित',
      statusEn: 'Received & Pending Verification',
      remarks: 'तुमचा अर्ज यशस्वीरीत्या जमा झाला आहे.',
      ...data
    };

    // Always update client-side cache immediately for instant tracking & admin visibility
    const apps = getStoredApplications();
    apps.unshift(newRecord);
    saveStoredApplications(apps);

    try {
      const res = await fetch(`${BASE_URL}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord)
      });
      if (res.ok) {
        const serverRes = await res.json();
        return serverRes;
      }
    } catch {
      // fallback to local
    }

    return { success: true, data: newRecord, referenceNumber: newRef };
  },

  // Fetch all applications (for Admin dashboard)
  async getApplications() {
    try {
      const res = await fetch(`${BASE_URL}/admin/applications`);
      if (res.ok) return await res.json();
    } catch {
      // fallback to local
    }
    return { success: true, data: getStoredApplications() };
  },

  // Update application status
  async updateStatus(referenceNumber, newStatus, remarks, sanctionAmount) {
    const cleanRef = (referenceNumber || '').trim().toUpperCase();
    const apps = getStoredApplications();
    const idx = apps.findIndex(a => a.referenceNumber && a.referenceNumber.toUpperCase() === cleanRef);

    if (idx !== -1) {
      apps[idx].status = newStatus;
      if (remarks !== undefined) apps[idx].remarks = remarks;
      if (sanctionAmount !== undefined) apps[idx].sanctionAmount = sanctionAmount;

      if (newStatus === 'APPROVED') {
        apps[idx].statusMr = 'मंजूर करण्यात आला';
        apps[idx].statusEn = 'Scholarship Approved';
      } else if (newStatus === 'REJECTED') {
        apps[idx].statusMr = 'नामंजूर';
        apps[idx].statusEn = 'Not Eligible';
      } else if (newStatus === 'DOCUMENTS_PENDING') {
        apps[idx].statusMr = 'कागदपत्रे प्रलंबित';
        apps[idx].statusEn = 'Documents Pending';
      } else {
        apps[idx].statusMr = 'छाननी चालू आहे';
        apps[idx].statusEn = 'Under Committee Review';
      }
      saveStoredApplications(apps);
    }

    try {
      const res = await fetch(`${BASE_URL}/admin/applications/${encodeURIComponent(cleanRef)}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, remarks, sanctionAmount })
      });
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }

    if (idx !== -1) {
      return { success: true, data: apps[idx] };
    }
    return { success: false, message: 'Not found' };
  },

  // Submit contact inquiry
  async submitInquiry(inquiry) {
    try {
      const res = await fetch(`${BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry)
      });
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return { success: true, message: 'Inquiry received. Team will contact you.' };
  }
};
