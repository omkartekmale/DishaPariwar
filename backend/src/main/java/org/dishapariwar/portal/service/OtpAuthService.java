package org.dishapariwar.portal.service;

import lombok.RequiredArgsConstructor;
import org.dishapariwar.portal.entity.Application;
import org.dishapariwar.portal.entity.OtpVerification;
import org.dishapariwar.portal.repository.ApplicationRepository;
import org.dishapariwar.portal.repository.OtpVerificationRepository;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OtpAuthService {

    private final ApplicationRepository applicationRepository;
    private final OtpVerificationRepository otpRepository;
    private final SecureRandom random = new SecureRandom();

    public boolean requestOtp(String serialNumber, String email) {
        Optional<Application> appOpt = applicationRepository.findBySerialNumberAndEmail(serialNumber, email);
        if (appOpt.isEmpty()) {
            return false;
        }

        // Generate 6 digit OTP
        int otpInt = 100000 + random.nextInt(900000);
        String otpCode = String.valueOf(otpInt);

        OtpVerification otp = OtpVerification.builder()
                .serialNumber(serialNumber)
                .email(email)
                .otpCode(otpCode)
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .isConsumed(false)
                .build();
        otpRepository.save(otp);

        // In production email/SMS service would send this; for testing & dev it is logged
        System.out.println(">>> OTP for [" + serialNumber + " / " + email + "] is: " + otpCode);
        return true;
    }

    public Optional<String> verifyOtp(String serialNumber, String email, String otpCode) {
        Optional<OtpVerification> opt = otpRepository.findTopBySerialNumberAndEmailAndIsConsumedFalseOrderByCreatedAtDesc(serialNumber, email);
        if (opt.isEmpty()) {
            return Optional.empty();
        }

        OtpVerification verification = opt.get();
        if (verification.getExpiresAt().isBefore(LocalDateTime.now())) {
            return Optional.empty();
        }

        if (!verification.getOtpCode().equals(otpCode)) {
            return Optional.empty();
        }

        verification.setIsConsumed(true);
        String sessionToken = "ST-" + UUID.randomUUID().toString();
        verification.setSessionToken(sessionToken);
        otpRepository.save(verification);

        return Optional.of(sessionToken);
    }

    public boolean validateSession(String sessionToken, String serialNumber) {
        return otpRepository.findBySessionToken(sessionToken)
                .map(v -> v.getSerialNumber().equalsIgnoreCase(serialNumber))
                .orElse(false);
    }
}
