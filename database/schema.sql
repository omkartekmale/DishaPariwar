-- ====================================================================
-- Disha Pariwar Charitable Trust, Pune (दिशा पारिवार चॅरिटेबल ट्रस्ट, पुणे)
-- Production Relational MySQL Database Schema
-- Version: 1.0.0
-- ====================================================================

CREATE DATABASE IF NOT EXISTS disha_pariwar_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE disha_pariwar_db;

-- 1. Users Table (Students, Admins, Reviewers)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    mobile VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(255) NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('STUDENT', 'ADMIN', 'REVIEWER') DEFAULT 'STUDENT',
    district VARCHAR(100) NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_mobile (mobile)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Scholarship Applications Table
CREATE TABLE IF NOT EXISTS applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reference_number VARCHAR(50) NOT NULL UNIQUE,
    user_id BIGINT NULL,
    
    -- Personal details
    student_name VARCHAR(255) NOT NULL,
    gender ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
    dob DATE NULL,
    mobile VARCHAR(15) NOT NULL,
    email VARCHAR(255) NULL,
    aadhaar_number VARCHAR(20) NULL,
    category VARCHAR(50) DEFAULT 'OPEN',
    district VARCHAR(100) NOT NULL,
    residential_address TEXT NULL,
    
    -- Family details
    father_name VARCHAR(255) NULL,
    father_occupation VARCHAR(255) NULL,
    mother_name VARCHAR(255) NULL,
    mother_occupation VARCHAR(255) NULL,
    annual_income DECIMAL(12, 2) NOT NULL,
    
    -- Academic details
    marks_10th DECIMAL(5, 2) NOT NULL,
    board_10th VARCHAR(100) DEFAULT 'SSC Maharashtra',
    marks_12th DECIMAL(5, 2) NULL,
    marks_diploma DECIMAL(5, 2) NULL,
    course_name VARCHAR(255) NOT NULL,
    year_of_study VARCHAR(50) DEFAULT '1st Year',
    college_name VARCHAR(255) NOT NULL,
    college_city VARCHAR(100) NULL,
    entrance_exam VARCHAR(100) NULL,
    entrance_score VARCHAR(50) NULL,
    
    -- Financial details
    total_college_fee DECIMAL(10, 2) NOT NULL,
    govt_scholarship_received ENUM('YES', 'NO') DEFAULT 'NO',
    govt_scholarship_amount DECIMAL(10, 2) DEFAULT 0.00,
    hostel_fee DECIMAL(10, 2) DEFAULT 0.00,
    requested_amount DECIMAL(10, 2) NULL,
    sanction_amount DECIMAL(10, 2) DEFAULT 0.00,
    bank_account_no VARCHAR(50) NULL,
    bank_ifsc VARCHAR(20) NULL,
    
    -- Status & review
    status ENUM('SUBMITTED', 'DOCUMENTS_PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED') DEFAULT 'SUBMITTED',
    status_mr VARCHAR(255) DEFAULT 'अर्ज प्राप्त झाला',
    status_en VARCHAR(255) DEFAULT 'Application Received',
    remarks TEXT NULL,
    assigned_reviewer VARCHAR(100) NULL,
    applied_at DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_app_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_app_ref (reference_number),
    INDEX idx_app_mobile (mobile),
    INDEX idx_app_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Documents Table
CREATE TABLE IF NOT EXISTS documents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT NOT NULL,
    doc_type VARCHAR(100) NOT NULL,
    file_name VARCHAR(255) NULL,
    file_path VARCHAR(500) NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    missing_reason TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_doc_application FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS contact_inquiries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    email VARCHAR(255) NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('NEW', 'IN_PROGRESS', 'RESOLVED') DEFAULT 'NEW',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- Seed Initial Records
-- ====================================================================
INSERT INTO applications (
    reference_number, student_name, gender, mobile, email, district, 
    annual_income, marks_10th, marks_12th, course_name, college_name, 
    total_college_fee, status, status_mr, status_en, remarks, applied_at
) VALUES 
('DP-2026-8492', 'अनिकेत ज्ञानेश्वर पाटील (Aniket Patil)', 'MALE', '9876543210', 'aniket.patil@example.com', 'Satara', 65000.00, 88.40, 82.60, 'B.Tech Computer Engineering', 'Government College of Engineering, Karad', 45000.00, 'UNDER_REVIEW', 'छाननी चालू आहे', 'Under Committee Review', 'सर्व कागदपत्रे प्राप्त झाली आहेत. समितीची बैठक लवकरच होईल.', '2026-08-12'),
('DP-2026-7215', 'प्रियांका राहुल साळुंखे (Priyanka Salunkhe)', 'FEMALE', '9123456780', 'priyanka.s@example.com', 'Solapur', 48000.00, 91.20, NULL, 'Diploma in Electrical Engineering', 'Government Polytechnic, Solapur', 18000.00, 'APPROVED', 'मंजूर करण्यात आला', 'Scholarship Approved', 'पुणे कार्यालयास प्रत्यक्ष भेट देऊन संमती पत्र सादर करावे.', '2026-07-28');
