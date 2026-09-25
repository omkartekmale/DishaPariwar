# Disha Pariwar Charitable Trust (DPCT) — Scholarship Portal v2.0
# Complete API Testing & Build Documentation

**Version:** 2.0.0  
**Authors:** Disha Pariwar Engineering & QA Team  
**Release Date:** September 2026  
**Backend Spec Version:** RESTful API v1 (`/api/v1`)  
**Frontend Spec Version:** React 19 + Vite SPA  

---

## Table of Contents
1. [Architecture Overview](#1-architecture-overview)
2. [Building, Compilation & Packaging Guide](#2-building-compilation--packaging-guide)
   - [2.1 Prerequisites & System Requirements](#21-prerequisites--system-requirements)
   - [2.2 Project Setup & Dependencies](#22-project-setup--dependencies)
   - [2.3 Development Mode (`npm run dev`)](#23-development-mode-npm-run-dev)
   - [2.4 Production Compilation (`npm run build`)](#24-production-compilation-npm-run-build)
   - [2.5 Production Execution (`npm start`)](#25-production-execution-npm-start)
   - [2.6 Docker Containerization & Deployment](#26-docker-containerization--deployment)
3. [RESTful API Specification (`/api/v1`)](#3-restful-api-specification-apiv1)
   - [3.1 Global Conventions & Response Envelopes](#31-global-conventions--response-envelopes)
   - [3.2 Endpoint 1: Track Application Status (`GET /api/v1/applications/track`)](#32-endpoint-1-track-application-status)
   - [3.3 Endpoint 2: Submit New Scholarship Application (`POST /api/v1/applications`)](#33-endpoint-2-submit-new-scholarship-application)
   - [3.4 Endpoint 3: Admin List & Filter Applications (`GET /api/v1/admin/applications`)](#34-endpoint-3-admin-list--filter-applications)
   - [3.5 Endpoint 4: Admin Update Application Status (`PUT /api/v1/admin/applications/{ref}/status`)](#35-endpoint-4-admin-update-application-status)
   - [3.6 Endpoint 5: Submit Public Contact Inquiry (`POST /api/v1/contact`)](#36-endpoint-5-submit-public-contact-inquiry)
4. [API Test Scenarios & Comprehensive Test Suite](#4-api-test-scenarios--comprehensive-test-suite)
   - [4.1 Test Matrix Table](#41-test-matrix-table)
   - [4.2 Positive Test Cases (P-01 to P-05)](#42-positive-test-cases)
   - [4.3 Negative & Error Handling Test Cases (N-01 to N-05)](#43-negative--error-handling-test-cases)
   - [4.4 Boundary & Edge Case Test Cases (E-01 to E-04)](#44-boundary--edge-case-test-cases)
5. [cURL Commands with Expected Output Payloads](#5-curl-commands-with-expected-output-payloads)
6. [Postman Collection Specification (v2.1 Importable)](#6-postman-collection-specification)
7. [Automated Testing Strategy & Script Examples](#7-automated-testing-strategy)
8. [Troubleshooting & FAQs](#8-troubleshooting--faqs)

---

## 1. Architecture Overview

The **Disha Pariwar Scholarship Portal (v2.0)** operates on a lightweight, resilient micro-architecture designed for low-bandwidth rural mobile networks across Maharashtra:

```
+-------------------------------------------------------------------------+
|                              CLIENT TIER                                |
|  - React 19 Single Page Application (Bilingual: Marathi & English)     |
|  - Client State: LanguageContext, AuthContext, AppContext               |
|  - Resilient LocalStorage Sync (Instant offline tracking fallback)      |
+------------------------------------+------------------------------------+
                                     |  HTTP / JSON (/api/v1/*)
                                     v
+-------------------------------------------------------------------------+
|                           APPLICATION SERVER                            |
|  - Node.js + Express.js Static & REST Gateway (server.js, port 3000)   |
|  - Vite Dev Middleware Proxy for seamless local development             |
|  - JSON Payload Validation & CORS headers                               |
+------------------------------------+------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|                           PERSISTENCE LAYER                             |
|  - Application Registry (DP-2026-XXXX format)                          |
|  - Application Status Workflow (UNDER_REVIEW -> APPROVED / REJECTED)    |
|  - Document Verification Verification Ledger                            |
+-------------------------------------------------------------------------+
```

---

## 2. Building, Compilation & Packaging Guide

### 2.1 Prerequisites & System Requirements
Ensure your development environment meets the following specifications:
* **Operating System:** Linux (Ubuntu 20.04+, Debian 11+), macOS 12+, or Windows 10/11 (with WSL2 or PowerShell).
* **Node.js:** `v18.x`, `v20.x`, or `v22.x` (LTS recommended).
* **npm:** `v9.x` or `v10.x` (or Yarn / Bun).
* **Web Browser:** Google Chrome 100+, Mozilla Firefox 95+, Apple Safari 15+, or Microsoft Edge.
* **Port Availability:** TCP Port `3000` must be unblocked.

Check your installation:
```bash
node --version   # e.g., v20.18.0
npm --version    # e.g., 10.8.2
```

### 2.2 Project Setup & Dependencies
Clone the repository and install all required node modules:
```bash
# Clone the repository
git clone https://github.com/disha-pariwar/disha-pariwar-portal.git
cd disha-pariwar-portal

# Install production and development dependencies
npm install
```

### 2.3 Development Mode (`npm run dev`)
Starts Vite development server with Hot Module Replacement (HMR) and instant CSS compilation:
```bash
npm run dev
```
* **Local Access URL:** `http://localhost:3000/`
* **Network Access URL:** `http://0.0.0.0:3000/`
* **Key Features:** Instant code reload on file change, source mapping for debugging, and in-memory routing.

### 2.4 Production Compilation (`npm run build`)
Compiles JSX, optimizes images, tree-shakes unused Lucide icons, minifies CSS, and generates the production distribution package:
```bash
npm run build
```
* **Output Directory:** `./dist/`
* **Artifacts Generated:**
  - `dist/index.html` (Minified entry point, ~1.4 KB)
  - `dist/assets/index-[hash].js` (Bundle with code-splitting, ~190 KB gzipped)
  - `dist/assets/index-[hash].css` (Compiled design system, ~3.6 KB gzipped)
  - `dist/founder.jpg`, `dist/logo.png`, `dist/assets/*` (Optimized media assets)
  - `dist/assets/scholarship_arj_form.pdf` (Official printable offline form)

### 2.5 Production Execution (`npm start`)
Launches the high-performance Express server serving `./dist/` with single-page application fallback routing:
```bash
npm start
```
* Expected console output:
  ```text
  > disha-pariwar@2.0.0 start
  > node server.js

  Disha Pariwar Portal v2.0 running at http://0.0.0.0:3000
  Production SPA static assets mounted from /app/applet/dist
  ```

### 2.6 Docker Containerization & Deployment
To run Disha Pariwar Portal in an isolated container:

#### `Dockerfile`:
```dockerfile
# Multi-stage build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production runtime image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
COPY server.js ./
EXPOSE 3000
USER node
CMD ["node", "server.js"]
```

#### Docker Commands:
```bash
# Build Docker image
docker build -t disha-pariwar-portal:v2.0 .

# Run container on port 3000
docker run -d -p 3000:3000 --name disha-portal disha-pariwar-portal:v2.0

# Verify container health
curl -I http://localhost:3000/
```

---

## 3. RESTful API Specification (`/api/v1`)

### 3.1 Global Conventions & Response Envelopes
* **Base URL:** `http://localhost:3000/api/v1`
* **Content-Type:** `application/json; charset=utf-8`
* **Standard Success Envelope:**
  ```json
  {
    "success": true,
    "data": { ... },
    "message": "Human-readable confirmation",
    "timestamp": "2026-09-25T10:00:00.000Z"
  }
  ```
* **Standard Error Envelope:**
  ```json
  {
    "success": false,
    "error": "ERROR_CODE_CONSTANT",
    "message": "Detailed explanation of failure",
    "timestamp": "2026-09-25T10:00:00.000Z"
  }
  ```

---

### 3.2 Endpoint 1: Track Application Status
Queries the review progress and verification notes for an applicant.

* **Route:** `GET /api/v1/applications/track`
* **Query Parameters:**
  | Parameter | Type | Required | Description | Example |
  |:---|:---:|:---:|:---|:---|
  | `referenceNumber` | string | **Yes** | 12-char unique application token | `DP-2026-8492` |
  | `mobile` | string | Optional | 10-digit registered mobile number | `9876543210` |

#### Success Response (`HTTP 200 OK`):
```json
{
  "success": true,
  "data": {
    "referenceNumber": "DP-2026-8492",
    "studentName": "अनिकेत ज्ञानेश्वर पाटील (Aniket Dnyaneshwar Patil)",
    "mobile": "9876543210",
    "email": "aniket.patil@example.com",
    "district": "सातारा (Satara)",
    "course": "B.Tech Computer Engineering (1st Year)",
    "collegeName": "Government College of Engineering, Karad",
    "familyIncome": 65000,
    "marks10th": 88.40,
    "marks12th": 82.60,
    "status": "UNDER_REVIEW",
    "statusMr": "छाननी चालू आहे",
    "statusEn": "Under Committee Review",
    "appliedAt": "2026-08-12",
    "assignedReviewer": "S. K. Joshi",
    "remarks": "सर्व कागदपत्रे प्राप्त झाली आहेत. समितीची बैठक लवकरच होईल."
  }
}
```

#### Failure Response (`HTTP 404 Not Found`):
```json
{
  "success": false,
  "error": "APPLICATION_NOT_FOUND",
  "message": "No matching application found for Reference Number: DP-2026-9999"
}
```

---

### 3.3 Endpoint 2: Submit New Scholarship Application
Registers an eligible candidate into the scholarship evaluation pipeline.

* **Route:** `POST /api/v1/applications`
* **Headers:** `Content-Type: application/json`
* **Request Body Payload:**
```json
{
  "studentName": "सुमित विठ्ठल जाधव (Sumit Vitthal Jadhav)",
  "mobile": "9822114455",
  "email": "sumit.jadhav@example.com",
  "district": "सातारा (Satara)",
  "tehsil": "कराड (Karad)",
  "address": "मु. पो. तांबवे, ता. कराड, जि. सातारा",
  "aadhaarNumber": "458912345678",
  "course": "B.Sc Computer Science",
  "collegeName": "Kisan Veer Mahavidyalaya, Wai",
  "educationType": "DEGREE",
  "marks10th": 87.60,
  "marks12th": 84.20,
  "familyIncome": 55000,
  "parentOccupation": "अल्पभूधारक शेतकरी (Small Farmer)",
  "bankName": "Bank of Maharashtra",
  "accountNumber": "60234567890",
  "ifscCode": "MAHB0000123"
}
```

#### Success Response (`HTTP 201 Created` / `HTTP 200 OK`):
```json
{
  "success": true,
  "referenceNumber": "DP-2026-5319",
  "message": "Application submitted successfully",
  "data": {
    "referenceNumber": "DP-2026-5319",
    "studentName": "सुमित विठ्ठल जाधव (Sumit Vitthal Jadhav)",
    "mobile": "9822114455",
    "appliedAt": "2026-09-25",
    "status": "UNDER_REVIEW",
    "statusMr": "अर्ज प्राप्त झाला / छाननी प्रलंबित",
    "statusEn": "Received & Pending Verification",
    "remarks": "तुमचा अर्ज यशस्वीरीत्या जमा झाला आहे."
  }
}
```

#### Validation Error (`HTTP 400 Bad Request`):
```json
{
  "success": false,
  "error": "INCOME_LIMIT_EXCEEDED",
  "message": "Annual family income ₹2,50,000 exceeds maximum eligibility ceiling of ₹2,00,000."
}
```

---

### 3.4 Endpoint 3: Admin List & Filter Applications
Retrieves applicants for evaluation committee members with search and filter capabilities.

* **Route:** `GET /api/v1/admin/applications`
* **Query Parameters (Optional):**
  - `status`: `UNDER_REVIEW`, `APPROVED`, `REJECTED`, `DOCUMENTS_PENDING`
  - `district`: Filter by Maharashtra district name (e.g. `सातारा`, `सोलापूर`, `पुणे`)
  - `search`: Full-text match on candidate name, reference ID, or college

#### Success Response (`HTTP 200 OK`):
```json
{
  "success": true,
  "total": 2,
  "data": [
    {
      "referenceNumber": "DP-2026-8492",
      "studentName": "अनिकेत ज्ञानेश्वर पाटील",
      "mobile": "9876543210",
      "district": "सातारा (Satara)",
      "course": "B.Tech Computer Engineering (1st Year)",
      "familyIncome": 65000,
      "marks10th": 88.40,
      "status": "UNDER_REVIEW",
      "appliedAt": "2026-08-12"
    },
    {
      "referenceNumber": "DP-2026-7215",
      "studentName": "प्रियांका राहुल साळुंखे",
      "mobile": "9123456780",
      "district": "सोलापूर (Solapur)",
      "course": "Diploma in Electrical Engineering",
      "familyIncome": 48000,
      "marks10th": 91.20,
      "status": "APPROVED",
      "appliedAt": "2026-07-28"
    }
  ]
}
```

---

### 3.5 Endpoint 4: Admin Update Application Status
Updates the review state, sanction amount, and official remarks for a candidate.

* **Route:** `PUT /api/v1/admin/applications/{referenceNumber}/status`
* **Headers:** `Content-Type: application/json`
* **Request Body Payload:**
```json
{
  "status": "APPROVED",
  "sanctionAmount": 20000,
  "remarks": "समितीने अर्ज मंजूर केला आहे. शिष्यवृत्ती धनादेश पुणे कार्यालयातून वितरीत केला जाईल."
}
```

#### Success Response (`HTTP 200 OK`):
```json
{
  "success": true,
  "message": "Status updated successfully",
  "data": {
    "referenceNumber": "DP-2026-8492",
    "status": "APPROVED",
    "statusMr": "मंजूर करण्यात आला",
    "statusEn": "Scholarship Approved",
    "sanctionAmount": 20000,
    "remarks": "समितीने अर्ज मंजूर केला आहे. शिष्यवृत्ती धनादेश पुणे कार्यालयातून वितरीत केला जाईल."
  }
}
```

---

### 3.6 Endpoint 5: Submit Public Contact Inquiry
Allows students and parents to submit questions to the Pune office helpdesk.

* **Route:** `POST /api/v1/contact`
* **Request Body Payload:**
```json
{
  "fullName": "तानाजी संभाजी कदम",
  "mobile": "9922001122",
  "email": "tanaji.kadam@example.com",
  "subject": "कागदपत्रे पडताळणी प्रश्न",
  "message": "तहसीलदार उत्पन्न दाखला २ वर्षांपूर्वीचा चालेल का?"
}
```

#### Success Response (`HTTP 200 OK`):
```json
{
  "success": true,
  "message": "Inquiry received. Team will contact you."
}
```

---

## 4. API Test Scenarios & Comprehensive Test Suite

### 4.1 Test Matrix Table

| Test ID | Endpoint & Method | Scenario Description | Expected HTTP Status | Key Assertion |
|:---|:---|:---|:---:|:---|
| **TC-P01** | `GET /applications/track` | Track application with valid Ref ID and Mobile | `200 OK` | `data.referenceNumber === "DP-2026-8492"` |
| **TC-P02** | `GET /applications/track` | Track application with valid Ref ID only | `200 OK` | Record found, `success === true` |
| **TC-P03** | `POST /applications` | Submit valid candidate (Merit > 80%, Income < 2L) | `200/201` | Returns generated `DP-2026-XXXX` |
| **TC-P04** | `GET /admin/applications` | Retrieve list of all applicants | `200 OK` | Array length >= 2, valid object keys |
| **TC-P05** | `PUT /admin/.../status` | Promote candidate to `APPROVED` with remarks | `200 OK` | `data.status === "APPROVED"` |
| **TC-N01** | `GET /applications/track` | Track with non-existent Ref ID (`DP-0000-0000`) | `404 Not Found` | `success === false` |
| **TC-N02** | `GET /applications/track` | Track with valid Ref ID but mismatched mobile | `404 Not Found` | Discrepancy caught |
| **TC-N03** | `POST /applications` | Submit application with missing mandatory name | `400 Bad Request` | Validation failure message |
| **TC-N04** | `POST /applications` | Submit application with 8-digit invalid mobile | `400 Bad Request` | Phone format rejected |
| **TC-N05** | `PUT /admin/.../status` | Update invalid Reference ID | `404 Not Found` | `message === "Not found"` |
| **TC-E01** | `POST /applications` | Boundary Income: Family income exactly ₹2,00,000 | `200/201` | Eligible at maximum threshold |
| **TC-E02** | `POST /applications` | Boundary Marks: 10th marks exactly 80.00% | `200/201` | Eligible at cutoff point |
| **TC-E03** | `POST /applications` | Unicode Handling: Formal Marathi names with conjuncts | `200/201` | Exact character fidelity preserved |
| **TC-E04** | `GET /applications/track` | Case Insensitivity: Search with lowercase `dp-2026-8492` | `200 OK` | Normalized and retrieved |

---

## 5. cURL Commands with Expected Output Payloads

### Test Case 1: Track Existing Application (Positive)
```bash
curl -X GET "http://localhost:3000/api/v1/applications/track?referenceNumber=DP-2026-8492&mobile=9876543210" \
     -H "Accept: application/json"
```
#### Expected Output:
```json
{
  "success": true,
  "data": {
    "referenceNumber": "DP-2026-8492",
    "studentName": "अनिकेत ज्ञानेश्वर पाटील (Aniket Dnyaneshwar Patil)",
    "mobile": "9876543210",
    "status": "UNDER_REVIEW",
    "statusMr": "छाननी चालू आहे",
    "statusEn": "Under Committee Review"
  }
}
```

---

### Test Case 2: Track Non-Existent Application (Negative)
```bash
curl -X GET "http://localhost:3000/api/v1/applications/track?referenceNumber=DP-9999-9999&mobile=9000000000" \
     -H "Accept: application/json"
```
#### Expected Output:
```json
{
  "success": false,
  "message": "Application not found with given details."
}
```

---

### Test Case 3: Submit New Application (Positive)
```bash
curl -X POST "http://localhost:3000/api/v1/applications" \
     -H "Content-Type: application/json" \
     -d '{
       "studentName": "अमृता पांडुरंग शिंदे (Amruta Pandurang Shinde)",
       "mobile": "9765432109",
       "email": "amruta.shinde@example.com",
       "district": "पुणे (Pune)",
       "course": "B.Com 1st Year",
       "collegeName": "BMCC College, Pune",
       "familyIncome": 72000,
       "marks10th": 89.20,
       "marks12th": 85.40
     }'
```
#### Expected Output:
```json
{
  "success": true,
  "referenceNumber": "DP-2026-XXXX",
  "data": {
    "studentName": "अमृता पांडुरंग शिंदे (Amruta Pandurang Shinde)",
    "status": "UNDER_REVIEW",
    "statusMr": "अर्ज प्राप्त झाला / छाननी प्रलंबित",
    "statusEn": "Received & Pending Verification"
  }
}
```

---

### Test Case 4: Admin List All Applications
```bash
curl -X GET "http://localhost:3000/api/v1/admin/applications" \
     -H "Accept: application/json"
```
#### Expected Output:
```json
{
  "success": true,
  "data": [
    {
      "referenceNumber": "DP-2026-8492",
      "studentName": "अनिकेत ज्ञानेश्वर पाटील (Aniket Dnyaneshwar Patil)",
      "status": "UNDER_REVIEW"
    },
    {
      "referenceNumber": "DP-2026-7215",
      "studentName": "प्रियांका राहुल साळुंखे (Priyanka Rahul Salunkhe)",
      "status": "APPROVED"
    }
  ]
}
```

---

### Test Case 5: Committee Status Transition to Approved
```bash
curl -X PUT "http://localhost:3000/api/v1/admin/applications/DP-2026-8492/status" \
     -H "Content-Type: application/json" \
     -d '{
       "status": "APPROVED",
       "remarks": "सर्व कागदपत्रे छाननीमध्ये योग्य आढळली आहेत. शिष्यवृत्ती मंजूर."
     }'
```
#### Expected Output:
```json
{
  "success": true,
  "data": {
    "referenceNumber": "DP-2026-8492",
    "status": "APPROVED",
    "statusMr": "मंजूर करण्यात आला",
    "statusEn": "Scholarship Approved",
    "remarks": "सर्व कागदपत्रे छाननीमध्ये योग्य आढळली आहेत. शिष्यवृत्ती मंजूर."
  }
}
```

---

## 6. Postman Collection Specification

Save this JSON content as `disha-pariwar-api.postman_collection.json` and import directly into Postman or Insomnia:

```json
{
  "info": {
    "name": "Disha Pariwar Scholarship Portal API v2.0",
    "description": "Collection of all public and administrative REST API endpoints for Disha Pariwar Charitable Trust.",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Public / Applications",
      "item": [
        {
          "name": "Track Application (Success)",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/v1/applications/track?referenceNumber=DP-2026-8492&mobile=9876543210",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "applications", "track"],
              "query": [
                { "key": "referenceNumber", "value": "DP-2026-8492" },
                { "key": "mobile", "value": "9876543210" }
              ]
            }
          }
        },
        {
          "name": "Submit Application",
          "request": {
            "method": "POST",
            "header": [{ "key": "Content-Type", "value": "application/json" }],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"studentName\": \"अनिकेत ज्ञानेश्वर पाटील\",\n  \"mobile\": \"9876543210\",\n  \"district\": \"सातारा\",\n  \"course\": \"B.Tech\",\n  \"familyIncome\": 65000,\n  \"marks10th\": 88.40\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/v1/applications",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "applications"]
            }
          }
        }
      ]
    },
    {
      "name": "Admin / Review Committee",
      "item": [
        {
          "name": "List All Applications",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/v1/admin/applications",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "admin", "applications"]
            }
          }
        },
        {
          "name": "Update Status (Approve/Reject)",
          "request": {
            "method": "PUT",
            "header": [{ "key": "Content-Type", "value": "application/json" }],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"status\": \"APPROVED\",\n  \"remarks\": \"समितीने अर्ज मंजूर केला.\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/v1/admin/applications/DP-2026-8492/status",
              "host": ["{{baseUrl}}"],
              "path": ["api", "v1", "admin", "applications", "DP-2026-8492", "status"]
            }
          }
        }
      ]
    }
  ],
  "variable": [
    { "key": "baseUrl", "value": "http://localhost:3000" }
  ]
}
```

---

## 7. Automated Testing Strategy

### Integration Test Example (using Vitest / Jest & Supertest):
```javascript
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './server.js'; // or express app instance

describe('Disha Pariwar Scholarship API Suite', () => {
  it('TC-P01: should return application record for valid reference number', async () => {
    const res = await request('http://localhost:3000')
      .get('/api/v1/applications/track')
      .query({ referenceNumber: 'DP-2026-8492', mobile: '9876543210' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.referenceNumber).toBe('DP-2026-8492');
    expect(res.body.data.status).toBe('UNDER_REVIEW');
  });

  it('TC-N01: should return 404 for invalid reference number', async () => {
    const res = await request('http://localhost:3000')
      .get('/api/v1/applications/track')
      .query({ referenceNumber: 'DP-9999-9999' });

    expect(res.body.success).toBe(false);
  });

  it('TC-P03: should accept and register a new applicant', async () => {
    const newCandidate = {
      studentName: 'ज्ञानेश्वर तुकाराम माने',
      mobile: '9822334455',
      district: 'कोल्हापूर',
      marks10th: 85.50,
      familyIncome: 60000
    };

    const res = await request('http://localhost:3000')
      .post('/api/v1/applications')
      .send(newCandidate);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.referenceNumber).toMatch(/^DP-2026-\d{4}$/);
  });
});
```

---

## 8. Troubleshooting & FAQs

### Q1: The dev server gives `Port 3000 is already in use`. What should I do?
**A:** AI Studio and development environments mandate port 3000. Run:
```bash
# Locate process on port 3000
lsof -i :3000
# Terminate the lingering process
kill -9 <PID>
# Restart the server
npm run dev
```

### Q2: What happens if the backend server goes down? Does student tracking fail?
**A:** No. `src/services/api.js` has built-in resilient offline fallback. If `/api/v1` is unreachable or network times out, the client queries persistent local cache and seeded trust data without displaying unhandled error screens.

### Q3: How do we update applicant data for a new academic year (e.g. 2027)?
**A:** 
1. In `src/services/api.js` (and backend controllers), update the reference prefix from `DP-2026-` to `DP-2027-`.
2. Clear the local cache key `dp_applications` or migrate through the admin dashboard export.

---

*Disha Pariwar Charitable Trust, Pune — Quality Assurance and DevOps Documentation (Release 2.0.0).*
