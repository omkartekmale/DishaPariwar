// Disha Pariwar RESTful API Client
// Supports a real backend when available and falls back to locally stored demo data.

const API_BASE_CANDIDATES = [
  typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_API_BASE_URL : '',
  '/api/v1',
  '/api',
].filter(Boolean);

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
    status: 'UNDER_REVIEW',
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
    if (saved) return JSON.parse(saved);
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

const fetchJson = async (path, options = {}) => {
  const urlPath = path.startsWith('/') ? path : `/${path}`;

  for (const base of API_BASE_CANDIDATES) {
    try {
      const response = await fetch(`${base.replace(/\/$/, '')}${urlPath}`, {
        headers: {
          Accept: 'application/json',
          ...(options.headers || {}),
        },
        ...options,
      });

      if (response.ok) {
        return await response.json();
      }

      if (response.status === 404) {
        continue;
      }

      const errorBody = await response.text();
      throw new Error(errorBody || 'Request failed');
    } catch (error) {
      if (base === API_BASE_CANDIDATES[API_BASE_CANDIDATES.length - 1]) {
        throw error;
      }
    }
  }

  return null;
};

export const api = {
  async trackApplication(referenceNumber, mobile) {
    try {
      const response = await fetchJson(`/applications/track?referenceNumber=${encodeURIComponent(referenceNumber)}&mobile=${encodeURIComponent(mobile)}`);
      if (response && response.success) return response;
    } catch {
      // fallback
    }

    const apps = getStoredApplications();
    const cleanRef = referenceNumber.trim().toUpperCase();
    const cleanMobile = mobile.trim();

    const found = apps.find((a) =>
      a.referenceNumber.toUpperCase() === cleanRef &&
      (!cleanMobile || a.mobile.endsWith(cleanMobile.slice(-4)) || a.mobile === cleanMobile)
    );

    if (found) return { success: true, data: found };
    return { success: false, message: 'Application not found with given details.' };
  },

  async submitApplication(data) {
    const newRef = `DP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord = {
      referenceNumber: newRef,
      appliedAt: new Date().toISOString().split('T')[0],
      status: 'UNDER_REVIEW',
      statusMr: 'अर्ज प्राप्त झाला / छाननी प्रलंबित',
      statusEn: 'Received & Pending Verification',
      remarks: 'तुमचा अर्ज यशस्वीरीत्या जमा झाला आहे.',
      ...data,
    };

    try {
      const response = await fetchJson('/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord),
      });
      if (response && response.success) return response;
    } catch {
      // fallback
    }

    const apps = getStoredApplications();
    apps.unshift(newRecord);
    saveStoredApplications(apps);

    return { success: true, data: newRecord, referenceNumber: newRef };
  },

  async getApplications() {
    try {
      const response = await fetchJson('/admin/applications');
      if (response && response.success) return response;
    } catch {
      // fallback
    }
    return { success: true, data: getStoredApplications() };
  },

  async updateStatus(referenceNumber, newStatus, remarks) {
    try {
      const response = await fetchJson(`/admin/applications/${referenceNumber}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, remarks }),
      });
      if (response && response.success) return response;
    } catch {
      // fallback
    }

    const apps = getStoredApplications();
    const idx = apps.findIndex((a) => a.referenceNumber === referenceNumber);
    if (idx !== -1) {
      apps[idx].status = newStatus;
      apps[idx].remarks = remarks;
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
        apps[idx].statusEn = 'Under Review';
      }
      saveStoredApplications(apps);
      return { success: true, data: apps[idx] };
    }
    return { success: false, message: 'Not found' };
  },

  async submitInquiry(inquiry) {
    try {
      const response = await fetchJson('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry),
      });
      if (response && response.success) return response;
    } catch {
      // fallback
    }
    return { success: true, message: 'Inquiry received. Team will contact you.' };
  }
};
