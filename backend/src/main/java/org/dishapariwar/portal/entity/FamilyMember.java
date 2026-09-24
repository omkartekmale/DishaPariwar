package org.dishapariwar.portal.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "family_members")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FamilyMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "application_id", nullable = false)
    @JsonIgnore
    private Application application;

    @Column(name = "name", nullable = false, length = 120)
    private String name;

    @Column(name = "relation", nullable = false, length = 40)
    private String relation;

    @Column(name = "age")
    private Integer age;

    @Column(name = "studying", length = 10)
    private String studying;

    @Column(name = "earning", length = 10)
    private String earning;

    @Column(name = "occupation", length = 100)
    private String occupation;

    @Column(name = "annual_income")
    private BigDecimal annualIncome;
}
