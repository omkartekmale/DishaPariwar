package org.dishapariwar.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reference_number", nullable = false, unique = true, length = 50)
    private String referenceNumber;

    @Column(name = "student_name", nullable = false)
    private String studentName;

    @Column(name = "gender", nullable = false, length = 10)
    private String gender;

    @Column(name = "dob")
    private LocalDate dob;

    @Column(name = "mobile", nullable = false, length = 15)
    private String mobile;

    @Column(name = "email")
    private String email;

    @Column(name = "category")
    private String category;

    @Column(name = "district", nullable = false)
    private String district;

    @Column(name = "father_occupation")
    private String fatherOccupation;

    @Column(name = "annual_income", nullable = false)
    private BigDecimal annualIncome;

    @Column(name = "marks_10th", nullable = false)
    private BigDecimal marks10th;

    @Column(name = "marks_12th")
    private BigDecimal marks12th;

    @Column(name = "course_name", nullable = false)
    private String courseName;

    @Column(name = "college_name", nullable = false)
    private String collegeName;

    @Column(name = "total_college_fee", nullable = false)
    private BigDecimal totalCollegeFee;

    @Column(name = "status", length = 30)
    private String status = "UNDER_REVIEW";

    @Column(name = "status_mr")
    private String statusMr = "छाननी चालू आहे";

    @Column(name = "status_en")
    private String statusEn = "Under Committee Review";

    @Column(name = "remarks", columnDefinition = "TEXT")
    private String remarks;

    @Column(name = "applied_at")
    private LocalDate appliedAt;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Application() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getReferenceNumber() { return referenceNumber; }
    public void setReferenceNumber(String referenceNumber) { this.referenceNumber = referenceNumber; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public LocalDate getDob() { return dob; }
    public void setDob(LocalDate dob) { this.dob = dob; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getFatherOccupation() { return fatherOccupation; }
    public void setFatherOccupation(String fatherOccupation) { this.fatherOccupation = fatherOccupation; }

    public BigDecimal getAnnualIncome() { return annualIncome; }
    public void setAnnualIncome(BigDecimal annualIncome) { this.annualIncome = annualIncome; }

    public BigDecimal getMarks10th() { return marks10th; }
    public void setMarks10th(BigDecimal marks10th) { this.marks10th = marks10th; }

    public BigDecimal getMarks12th() { return marks12th; }
    public void setMarks12th(BigDecimal marks12th) { this.marks12th = marks12th; }

    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }

    public String getCollegeName() { return collegeName; }
    public void setCollegeName(String collegeName) { this.collegeName = collegeName; }

    public BigDecimal getTotalCollegeFee() { return totalCollegeFee; }
    public void setTotalCollegeFee(BigDecimal totalCollegeFee) { this.totalCollegeFee = totalCollegeFee; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getStatusMr() { return statusMr; }
    public void setStatusMr(String statusMr) { this.statusMr = statusMr; }

    public String getStatusEn() { return statusEn; }
    public void setStatusEn(String statusEn) { this.statusEn = statusEn; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }

    public LocalDate getAppliedAt() { return appliedAt; }
    public void setAppliedAt(LocalDate appliedAt) { this.appliedAt = appliedAt; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
