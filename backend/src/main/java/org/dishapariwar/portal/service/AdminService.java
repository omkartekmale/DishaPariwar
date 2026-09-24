package org.dishapariwar.portal.service;

import lombok.RequiredArgsConstructor;
import org.dishapariwar.portal.dto.AdminUpdateDTO;
import org.dishapariwar.portal.entity.Application;
import org.dishapariwar.portal.entity.CommunicationLog;
import org.dishapariwar.portal.repository.ApplicationRepository;
import org.dishapariwar.portal.repository.SystemConfigRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final ApplicationRepository applicationRepository;
    private final SystemConfigRepository systemConfigRepository;

    public boolean authenticateAdmin(String password) {
        // Matches portal default admin authorization check
        return "admin@disha2026".equals(password) || "disha@admin#2026".equals(password) || "admin123".equals(password);
    }

    public List<Application> searchApplications(String query) {
        if (query == null || query.trim().isEmpty() || "*".equals(query)) {
            return applicationRepository.findAll();
        }
        return applicationRepository.searchApplications(query.trim());
    }

    @Transactional
    public Application updateApplication(String serialNumber, AdminUpdateDTO dto) {
        Application app = applicationRepository.findBySerialNumber(serialNumber)
                .orElseThrow(() -> new RuntimeException("Application not found: " + serialNumber));

        if (dto.getCurrentStage() != null) app.setCurrentStage(dto.getCurrentStage());
        if (dto.getApplicationStatus() != null) app.setApplicationStatus(dto.getApplicationStatus());
        if (dto.getFinalDecision() != null) app.setFinalDecision(dto.getFinalDecision());
        if (dto.getFinalDecisionClass() != null) app.setFinalDecisionClass(dto.getFinalDecisionClass());
        if (dto.getDecisionDate() != null) app.setDecisionDate(dto.getDecisionDate());
        if (dto.getDecisionReason() != null) app.setDecisionReason(dto.getDecisionReason());
        if (dto.getScholarshipAmount() != null) app.setScholarshipAmount(dto.getScholarshipAmount());
        if (dto.getPhysicalFormReceived() != null) {
            app.setPhysicalFormReceived(dto.getPhysicalFormReceived());
            if ("Yes".equalsIgnoreCase(dto.getPhysicalFormReceived()) && app.getPhysicalFormReceivedDate() == null) {
                app.setPhysicalFormReceivedDate(LocalDate.now());
            }
        }
        if (dto.getDocumentsVerified() != null) {
            app.setDocumentsVerified(dto.getDocumentsVerified());
            if ("Yes".equalsIgnoreCase(dto.getDocumentsVerified()) && app.getDocumentsVerifiedDate() == null) {
                app.setDocumentsVerifiedDate(LocalDate.now());
            }
        }
        if (dto.getAssignedReviewer() != null) app.setAssignedReviewer(dto.getAssignedReviewer());
        if (dto.getInterviewDate() != null) app.setInterviewDate(dto.getInterviewDate());
        if (dto.getInterviewMode() != null) app.setInterviewMode(dto.getInterviewMode());
        if (dto.getInterviewNotes() != null) app.setInterviewNotes(dto.getInterviewNotes());
        if (dto.getInternalNotes() != null) app.setInternalNotes(dto.getInternalNotes());

        // Add communication log entry for admin update
        CommunicationLog log = CommunicationLog.builder()
                .application(app)
                .channel("Admin")
                .subject("Status Updated by Administrator")
                .message("Stage: " + app.getCurrentStage() + " | Decision: " + app.getFinalDecision())
                .build();
        app.getCommunicationLogs().add(log);

        return applicationRepository.save(app);
    }

    public Map<String, Object> getMetrics() {
        Map<String, Object> metrics = new HashMap<>();
        long total = applicationRepository.count();
        long approved = applicationRepository.countByFinalDecision("Approved");
        long waitlist = applicationRepository.countByFinalDecision("Waitlist");
        long rejected = applicationRepository.countByFinalDecision("Rejected");
        long pending = applicationRepository.countByFinalDecision("Pending");

        metrics.put("totalApplications", total);
        metrics.put("approvedCount", approved);
        metrics.put("waitlistCount", waitlist);
        metrics.put("rejectedCount", rejected);
        metrics.put("pendingCount", pending);
        return metrics;
    }
}
