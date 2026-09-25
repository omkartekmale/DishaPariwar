import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
<<<<<<< Updated upstream
app.use(express.json());

const PORT = 3000;
const HOST = '0.0.0.0';

// In-memory data store for API testing and preview
let applications = [
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

// API Health Check
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    service: 'Disha Pariwar Portal API',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});

// Endpoint 1: Track Application
app.get('/api/v1/applications/track', (req, res) => {
  const { referenceNumber, mobile } = req.query;
  if (!referenceNumber) {
    return res.status(400).json({ success: false, message: 'Reference number is required.' });
  }

  const cleanRef = referenceNumber.trim().toUpperCase();
  const cleanMob = (mobile || '').trim();

  const found = applications.find(a =>
    a.referenceNumber.toUpperCase() === cleanRef &&
    (!cleanMob || a.mobile.endsWith(cleanMob.slice(-4)) || a.mobile === cleanMob)
  );

  if (found) {
    return res.json({ success: true, data: found });
  }
  return res.status(404).json({ success: false, message: 'Application not found with given details.' });
});

// Endpoint 2: Submit New Application
app.post('/api/v1/applications', (req, res) => {
  const data = req.body || {};
  if (!data.studentName || !data.mobile) {
    return res.status(400).json({ success: false, message: 'Student name and mobile number are required.' });
  }

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

  applications.unshift(newRecord);
  return res.status(201).json({
    success: true,
    referenceNumber: newRef,
    message: 'Application submitted successfully',
    data: newRecord
  });
});

// Endpoint 3: Admin List All Applications
app.get('/api/v1/admin/applications', (req, res) => {
  const { status, district, search } = req.query;
  let results = [...applications];

  if (status) {
    results = results.filter(a => a.status === status);
  }
  if (district) {
    results = results.filter(a => a.district && a.district.includes(district));
  }
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(a =>
      (a.studentName && a.studentName.toLowerCase().includes(q)) ||
      (a.referenceNumber && a.referenceNumber.toLowerCase().includes(q))
    );
  }

  return res.json({ success: true, total: results.length, data: results });
});

// Endpoint 4: Admin Update Status
app.put('/api/v1/admin/applications/:ref/status', (req, res) => {
  const ref = req.params.ref.toUpperCase();
  const { status, remarks, sanctionAmount } = req.body;

  const idx = applications.findIndex(a => a.referenceNumber.toUpperCase() === ref);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }

  applications[idx].status = status;
  if (remarks) applications[idx].remarks = remarks;
  if (sanctionAmount) applications[idx].sanctionAmount = sanctionAmount;

  if (status === 'APPROVED') {
    applications[idx].statusMr = 'मंजूर करण्यात आला';
    applications[idx].statusEn = 'Scholarship Approved';
  } else if (status === 'REJECTED') {
    applications[idx].statusMr = 'नामंजूर';
    applications[idx].statusEn = 'Not Eligible';
  } else if (status === 'DOCUMENTS_PENDING') {
    applications[idx].statusMr = 'कागदपत्रे प्रलंबित';
    applications[idx].statusEn = 'Documents Pending';
  } else {
    applications[idx].statusMr = 'छाननी चालू आहे';
    applications[idx].statusEn = 'Under Committee Review';
  }

  return res.json({ success: true, data: applications[idx] });
});

// Endpoint 5: Contact Inquiry
app.post('/api/v1/contact', (req, res) => {
  return res.json({ success: true, message: 'Inquiry received. Team will contact you.' });
});

// Serve static assets from dist directory (built React SPA)
=======
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
>>>>>>> Stashed changes
const distPath = path.join(__dirname, 'dist');

app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.status(200).json({
    ok: true,
    service: 'disha-pariwar',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
  });
});

app.use(
  express.static(distPath, {
    maxAge: '1h',
    etag: true,
    index: false,
    setHeaders(res, filePath) {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    },
  })
);

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }

  if (req.path === '/health') {
    return next();
  }

  res.sendFile(path.join(distPath, 'index.html'));
});

app.use((err, _req, res, _next) => {
  console.error('Unhandled application error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
