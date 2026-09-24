package org.dishapariwar.portal.service;

import lombok.RequiredArgsConstructor;
import org.dishapariwar.portal.dto.ApplicationRequestDTO;
import org.dishapariwar.portal.entity.*;
import org.dishapariwar.portal.repository.ApplicationDraftRepository;
import org.dishapariwar.portal.repository.ApplicationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Year;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final ApplicationDraftRepository draftRepository;

    private static final AtomicInteger sequenceCounter = new AtomicInteger(100);

    @Transactional
    public Application submitApplication(ApplicationRequestDTO dto) {
        String academicYear = "2026-27";
        int seq = sequenceCounter.incrementAndGet();
        String serialNumber = String.format("DP/%s/%03d", academicYear, seq);

        String fullName = dto.getFullName();
        if (fullName == null || fullName.trim().isEmpty()) {
            fullName = String.format("%s %s %s",
                    dto.getFirstName() != null ? dto.getFirstName() : "",
                    dto.getMiddleName() != null ? dto.getMiddleName() : "",
                    dto.getLastName() != null ? dto.getLastName() : "").trim();
        }

        Application application = Application.builder()
                .serialNumber(serialNumber)
                .draftId(dto.getDraftId())
                .firstName(dto.getFirstName())
                .middleName(dto.getMiddleName())
                .lastName(dto.getLastName())
                .fullName(fullName)
                .dob(dto.getDob())
                .gender(dto.getGender())
                .mobile(dto.getMobile())
                .altMobile(dto.getAltMobile())
                .email(dto.getEmail())
                .category(dto.getCategory())
                .bloodGroup(dto.getBloodGroup())
                .physicallyHandicapped(dto.getPhysicallyHandicapped())
                .currentAddress(dto.getCurrentAddress())
                .permanentAddress(dto.getPermanentAddress())
                .district(dto.getDistrict())
                .taluka(dto.getTaluka())
                .village(dto.getVillage())
                .pincode(dto.getPincode())
                .currentStage("Stage 1")
                .applicationStatus("Active")
                .finalDecision("Pending")
                .finalDecisionClass("Active")
                .physicalFormReceived("No")
                .documentsVerified("No")
                .admissionConfirmed(dto.getAdmissionConfirmed() != null ? dto.getAdmissionConfirmed() : "Yes")
                .declarationAgreed(dto.getDeclarationAgreed())
                .termsAgreed(dto.getTermsAgreed())
                .build();

        // Academics
        ApplicantAcademics academics = ApplicantAcademics.builder()
                .application(application)
                .school10th(dto.getSchool10th())
                .board10th(dto.getBoard10th())
                .marks10th(dto.getMarks10th())
                .year10th(dto.getYear10th())
                .college12thDiploma(dto.getCollege12thDiploma())
                .stream12thDiploma(dto.getStream12thDiploma())
                .marks12thDiploma(dto.getMarks12thDiploma())
                .year12thDiploma(dto.getYear12thDiploma())
                .currentCourse(dto.getCurrentCourse())
                .currentYear(dto.getCurrentYear())
                .collegeName(dto.getCollegeName())
                .collegeAddress(dto.getCollegeAddress())
                .universityBoard(dto.getUniversityBoard())
                .admissionType(dto.getAdmissionType())
                .entranceExamName(dto.getEntranceExamName())
                .entranceScore(dto.getEntranceScore())
                .build();
        application.setAcademics(academics);

        // Family
        ApplicantFamily family = ApplicantFamily.builder()
                .application(application)
                .fatherName(dto.getFatherName())
                .fatherOccupation(dto.getFatherOccupation())
                .fatherIncome(dto.getFatherIncome())
                .fatherContact(dto.getFatherContact())
                .motherName(dto.getMotherName())
                .motherOccupation(dto.getMotherOccupation())
                .motherIncome(dto.getMotherIncome())
                .parentStatus(dto.getParentStatus())
                .rationCardType(dto.getRationCardType())
                .houseType(dto.getHouseType())
                .landAcres(dto.getLandAcres())
                .landGunthas(dto.getLandGunthas())
                .vehiclesOwned(dto.getVehiclesOwned())
                .familyMembersCount(dto.getFamilyMembersCount())
                .earningMembersCount(dto.getEarningMembersCount())
                .totalAnnualIncome(dto.getTotalAnnualIncome())
                .build();
        application.setFamily(family);

        // Family dynamic list
        if (dto.getFamilyMembers() != null) {
            for (ApplicationRequestDTO.FamilyMemberDTO mDto : dto.getFamilyMembers()) {
                FamilyMember member = FamilyMember.builder()
                        .application(application)
                        .name(mDto.getName())
                        .relation(mDto.getRelation())
                        .age(mDto.getAge())
                        .studying(mDto.getStudying())
                        .earning(mDto.getEarning())
                        .occupation(mDto.getOccupation())
                        .annualIncome(mDto.getAnnualIncome())
                        .build();
                application.getFamilyMembers().add(member);
            }
        }

        // Finances
        ApplicantFinances finances = ApplicantFinances.builder()
                .application(application)
                .feeCollege(dto.getFeeCollege())
                .feeHostel(dto.getFeeHostel())
                .feeMess(dto.getFeeMess())
                .feeBooks(dto.getFeeBooks())
                .feeTransport(dto.getFeeTransport())
                .feeOther(dto.getFeeOther())
                .feeTotal(dto.getFeeTotal())
                .govtScholarshipReceived(dto.getGovtScholarshipReceived())
                .govtScholarshipName(dto.getGovtScholarshipName())
                .govtScholarshipAmount(dto.getGovtScholarshipAmount())
                .otherScholarshipReceived(dto.getOtherScholarshipReceived())
                .otherScholarshipDetails(dto.getOtherScholarshipDetails())
                .otherScholarshipAmount(dto.getOtherScholarshipAmount())
                .bankAccountHolder(dto.getBankAccountHolder())
                .bankName(dto.getBankName())
                .bankBranch(dto.getBankBranch())
                .accountNumber(dto.getAccountNumber())
                .ifscCode(dto.getIfscCode())
                .build();
        application.setFinances(finances);

        // Add initial system communication log
        CommunicationLog log = CommunicationLog.builder()
                .application(application)
                .channel("System")
                .subject("Application Submitted")
                .message("Your scholarship application (" + serialNumber + ") has been submitted successfully.")
                .build();
        application.getCommunicationLogs().add(log);

        return applicationRepository.save(application);
    }

    public Optional<Application> findBySerialNumber(String serialNumber) {
        return applicationRepository.findBySerialNumber(serialNumber);
    }

    public Optional<Application> findBySerialNumberAndEmail(String serialNumber, String email) {
        return applicationRepository.findBySerialNumberAndEmail(serialNumber, email);
    }
}
