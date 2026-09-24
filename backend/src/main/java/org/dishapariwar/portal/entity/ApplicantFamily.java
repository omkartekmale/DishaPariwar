package org.dishapariwar.portal.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "applicant_family")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicantFamily {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "application_id", nullable = false)
    @JsonIgnore
    private Application application;

    @Column(name = "father_name", length = 120)
    private String fatherName;

    @Column(name = "father_occupation", length = 100)
    private String fatherOccupation;

    @Column(name = "father_income")
    private BigDecimal fatherIncome;

    @Column(name = "father_contact", length = 20)
    private String fatherContact;

    @Column(name = "mother_name", length = 120)
    private String motherName;

    @Column(name = "mother_occupation", length = 100)
    private String motherOccupation;

    @Column(name = "mother_income")
    private BigDecimal motherIncome;

    @Column(name = "parent_status", length = 50)
    private String parentStatus;

    @Column(name = "ration_card_type", length = 30)
    private String rationCardType;

    @Column(name = "house_type", length = 40)
    private String houseType;

    @Column(name = "land_acres", length = 20)
    private String landAcres;

    @Column(name = "land_gunthas", length = 20)
    private String landGunthas;

    @Column(name = "vehicles_owned", length = 100)
    private String vehiclesOwned;

    @Column(name = "family_members_count")
    private Integer familyMembersCount;

    @Column(name = "earning_members_count")
    private Integer earningMembersCount;

    @Column(name = "total_annual_income", nullable = false)
    private BigDecimal totalAnnualIncome;
}
