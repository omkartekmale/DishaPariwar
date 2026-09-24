package org.dishapariwar.portal.repository;

import org.dishapariwar.portal.entity.OtpVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OtpVerificationRepository extends JpaRepository<OtpVerification, Long> {
    Optional<OtpVerification> findTopBySerialNumberAndEmailAndIsConsumedFalseOrderByCreatedAtDesc(String serialNumber, String email);
    Optional<OtpVerification> findBySessionToken(String sessionToken);
}
