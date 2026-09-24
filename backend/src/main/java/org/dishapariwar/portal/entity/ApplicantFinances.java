package org.dishapariwar.portal.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "applicant_finances")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicantFinances {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "application_id", nullable = false)
    @JsonIgnore
    private Application application;

    @Column(name = "fee_college")
    private BigDecimal feeCollege;

    @Column(name = "fee_hostel")
    private BigDecimal feeHostel;

    @Column(name = "fee_mess")
    private BigDecimal feeMess;

    @Column(name = "fee_books")
    private BigDecimal feeBooks;

    @Column(name = "fee_transport")
    private BigDecimal feeTransport;

    @Column(name = "fee_other")
    private BigDecimal feeOther;

    @Column(name = "fee_total", nullable = false)
    private BigDecimal feeTotal;

    @Column(name = "govt_scholarship_received", length = 10)
    private String govtScholarshipReceived;

    @Column(name = "govt_scholarship_name", length = 100)
    private String govtScholarshipName;

    @Column(name = "govt_scholarship_amount")
    private BigDecimal govtScholarshipAmount;

    @Column(name = "other_scholarship_received", length = 10)
    private String otherScholarshipReceived;

    @Column(name = "other_scholarship_details", length = 150)
    private String otherScholarshipDetails;

    @Column(name = "other_scholarship_amount")
    private BigDecimal otherScholarshipAmount;

    @Column(name = "bank_account_holder", length = 120)
    private String bankAccountHolder;

    @Column(name = "bank_name", length = 100)
    private String bankName;

    @Column(name = "bank_branch", length = 100)
    private String bankBranch;

    @Column(name = "account_number", length = 40)
    private String accountNumber;

    @Column(name = "ifsc_code", length = 20)
    private String ifscCode;
}
