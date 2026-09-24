package org.dishapariwar.portal.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "applicant_academics")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicantAcademics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "application_id", nullable = false)
    @JsonIgnore
    private Application application;

    @Column(name = "school_10th", length = 180)
    private String school10th;

    @Column(name = "board_10th", length = 80)
    private String board10th;

    @Column(name = "marks_10th", length = 20)
    private String marks10th;

    @Column(name = "year_10th", length = 10)
    private String year10th;

    @Column(name = "college_12th_diploma", length = 180)
    private String college12thDiploma;

    @Column(name = "stream_12th_diploma", length = 60)
    private String stream12thDiploma;

    @Column(name = "marks_12th_diploma", length = 20)
    private String marks12thDiploma;

    @Column(name = "year_12th_diploma", length = 10)
    private String year12thDiploma;

    @Column(name = "current_course", nullable = false, length = 100)
    private String currentCourse;

    @Column(name = "current_year", nullable = false, length = 30)
    private String currentYear;

    @Column(name = "college_name", nullable = false, length = 200)
    private String collegeName;

    @Column(name = "college_address", columnDefinition = "TEXT")
    private String collegeAddress;

    @Column(name = "university_board", length = 150)
    private String universityBoard;

    @Column(name = "admission_type", length = 40)
    private String admissionType;

    @Column(name = "entrance_exam_name", length = 40)
    private String entranceExamName;

    @Column(name = "entrance_score", length = 30)
    private String entranceScore;
}
