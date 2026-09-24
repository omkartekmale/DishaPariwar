package org.dishapariwar.portal.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "serial_number", unique = true, nullable = false, length = 32)
    private String serialNumber;

    @Column(name = "draft_id", length = 32)
    private String draftId;

    @Column(name = "first_name", nullable = false, length = 60)
    private String firstName;

    @Column(name = "middle_name", length = 60)
    private String middleName;

    @Column(name = "last_name", nullable = false, length = 60)
    private String lastName;

    @Column(name = "full_name", nullable = false, length = 180)
    private String fullName;

    @Column(name = "dob", nullable = false)
    private LocalDate dob;

    @Column(name = "gender", nullable = false, length = 20)
    private String gender;

    @Column(name = "mobile", nullable = false, length = 15)
    private String mobile;

    @Column(name = "alt_mobile", length = 15)
    private String altMobile;

    @Column(name = "email", nullable = false, length = 120)
    private String email;

    @Column(name = "category", nullable = false, length = 30)
    private String category;

    @Column(name = "blood_group", length = 10)
    private String bloodGroup;

    @Column(name = "physically_handicapped", length = 10)
    private String physicallyHandicapped;

    @Column(name = "current_address", columnDefinition = "TEXT")
    private String currentAddress;

    @Column(name = "permanent_address", columnDefinition = "TEXT")
    private String permanentAddress;

    @Column(name = "district", nullable = false, length = 60)
    private String district;

    @Column(name = "taluka", nullable = false, length = 60)
    private String taluka;

    @Column(name = "village", length = 80)
    private String village;

    @Column(name = "pincode", nullable = false, length = 10)
    private String pincode;

    // Status Tracking
    @Column(name = "current_stage", length = 30)
    private String currentStage;

    @Column(name = "application_status", length = 30)
    private String applicationStatus;

    @Column(name = "final_decision", length = 30)
    private String finalDecision;

    @Column(name = "final_decision_class", length = 30)
    private String finalDecisionClass;

    @Column(name = "decision_date")
    private LocalDate decisionDate;

    @Column(name = "decision_reason", columnDefinition = "TEXT")
    private String decisionReason;

    @Column(name = "scholarship_amount")
    private BigDecimal scholarshipAmount;

    @Column(name = "physical_form_received", length = 10)
    private String physicalFormReceived;

    @Column(name = "physical_form_received_date")
    private LocalDate physicalFormReceivedDate;

    @Column(name = "documents_verified", length = 10)
    private String documentsVerified;

    @Column(name = "documents_verified_date")
    private LocalDate documentsVerifiedDate;

    @Column(name = "assigned_reviewer", length = 100)
    private String assignedReviewer;

    @Column(name = "interview_date", length = 60)
    private String interviewDate;

    @Column(name = "interview_mode", length = 40)
    private String interviewMode;

    @Column(name = "interview_notes", columnDefinition = "TEXT")
    private String interviewNotes;

    @Column(name = "internal_notes", columnDefinition = "TEXT")
    private String internalNotes;

    @Column(name = "admission_confirmed", length = 20)
    private String admissionConfirmed;

    @Column(name = "admission_proof_status", length = 40)
    private String admissionProofStatus;

    @Column(name = "track_b_deadline")
    private LocalDate trackBDeadline;

    @Column(name = "declaration_agreed")
    private Boolean declarationAgreed;

    @Column(name = "terms_agreed")
    private Boolean termsAgreed;

    @Column(name = "submission_date")
    private LocalDateTime submissionDate;

    @OneToOne(mappedBy = "application", cascade = CascadeType.ALL)
    private ApplicantAcademics academics;

    @OneToOne(mappedBy = "application", cascade = CascadeType.ALL)
    private ApplicantFamily family;

    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FamilyMember> familyMembers = new ArrayList<>();

    @OneToOne(mappedBy = "application", cascade = CascadeType.ALL)
    private ApplicantFinances finances;

    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ApplicantDocument> documents = new ArrayList<>();

    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommunicationLog> communicationLogs = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        if (this.submissionDate == null) {
            this.submissionDate = LocalDateTime.now();
        }
        if (this.currentStage == null) {
            this.currentStage = "Stage 1";
        }
        if (this.applicationStatus == null) {
            this.applicationStatus = "Active";
        }
        if (this.finalDecision == null) {
            this.finalDecision = "Pending";
        }
        if (this.finalDecisionClass == null) {
            this.finalDecisionClass = "Active";
        }
        if (this.physicalFormReceived == null) {
            this.physicalFormReceived = "No";
        }
        if (this.documentsVerified == null) {
            this.documentsVerified = "No";
        }
    }
}
