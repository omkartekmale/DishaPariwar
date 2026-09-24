package org.dishapariwar.portal.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "application_drafts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicationDraft {

    @Id
    @Column(name = "draft_id", length = 32)
    private String draftId;

    @Column(name = "student_name", nullable = false, length = 150)
    private String studentName;

    @Column(name = "mobile", nullable = false, length = 15)
    private String mobile;

    @Column(name = "email", nullable = false, length = 120)
    private String email;

    @Column(name = "current_panel")
    private Integer currentPanel;

    @Column(name = "form_data", columnDefinition = "LONGTEXT")
    private String formData;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
        if (this.currentPanel == null) {
            this.currentPanel = 1;
        }
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
