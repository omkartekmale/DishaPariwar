package org.dishapariwar.portal.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicationRequestDTO {

    private String draftId;

    // Personal Details
    private String firstName;
    private String middleName;
    private String lastName;
    private String fullName;
    private LocalDate dob;
    private String gender;
    private String mobile;
    private String altMobile;
    private String email;
    private String category;
    private String bloodGroup;
    private String physicallyHandicapped;
    private String currentAddress;
    private String permanentAddress;
    private String district;
    private String taluka;
    private String village;
    private String pincode;

    // Track B
    private String admissionConfirmed;

    // Academics
    private String school10th;
    private String board10th;
    private String marks10th;
    private String year10th;
    private String college12thDiploma;
    private String stream12thDiploma;
    private String marks12thDiploma;
    private String year12thDiploma;
    private String currentCourse;
    private String currentYear;
    private String collegeName;
    private String collegeAddress;
    private String universityBoard;
    private String admissionType;
    private String entranceExamName;
    private String entranceScore;

    // Family
    private String fatherName;
    private String fatherOccupation;
    private BigDecimal fatherIncome;
    private String fatherContact;
    private String motherName;
    private String motherOccupation;
    private BigDecimal motherIncome;
    private String parentStatus;
    private String rationCardType;
    private String houseType;
    private String landAcres;
    private String landGunthas;
    private String vehiclesOwned;
    private Integer familyMembersCount;
    private Integer earningMembersCount;
    private BigDecimal totalAnnualIncome;

    private List<FamilyMemberDTO> familyMembers;

    // Finances
    private BigDecimal feeCollege;
    private BigDecimal feeHostel;
    private BigDecimal feeMess;
    private BigDecimal feeBooks;
    private BigDecimal feeTransport;
    private BigDecimal feeOther;
    private BigDecimal feeTotal;
    private String govtScholarshipReceived;
    private String govtScholarshipName;
    private BigDecimal govtScholarshipAmount;
    private String otherScholarshipReceived;
    private String otherScholarshipDetails;
    private BigDecimal otherScholarshipAmount;
    private String bankAccountHolder;
    private String bankName;
    private String bankBranch;
    private String accountNumber;
    private String ifscCode;

    // Declarations
    private Boolean declarationAgreed;
    private Boolean termsAgreed;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FamilyMemberDTO {
        private String name;
        private String relation;
        private Integer age;
        private String studying;
        private String earning;
        private String occupation;
        private BigDecimal annualIncome;
    }
}
