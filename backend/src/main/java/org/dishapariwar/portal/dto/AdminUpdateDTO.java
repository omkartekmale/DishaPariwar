package org.dishapariwar.portal.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminUpdateDTO {
    private String currentStage;
    private String applicationStatus;
    private String finalDecision;
    private String finalDecisionClass;
    private LocalDate decisionDate;
    private String decisionReason;
    private BigDecimal scholarshipAmount;
    private String physicalFormReceived;
    private LocalDate physicalFormReceivedDate;
    private String documentsVerified;
    private LocalDate documentsVerifiedDate;
    private String assignedReviewer;
    private String interviewDate;
    private String interviewMode;
    private String interviewNotes;
    private String internalNotes;
}
