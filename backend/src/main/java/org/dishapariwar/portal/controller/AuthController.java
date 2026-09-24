package org.dishapariwar.portal.controller;

import lombok.RequiredArgsConstructor;
import org.dishapariwar.portal.service.OtpAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth/otp")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final OtpAuthService otpAuthService;

    @PostMapping("/request")
    public ResponseEntity<?> requestOtp(@RequestBody Map<String, String> body) {
        String serialNumber = body.get("serial_number");
        String email = body.get("email");

        if (serialNumber == null || email == null) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Serial number and email required"));
        }

        boolean sent = otpAuthService.requestOtp(serialNumber.trim(), email.trim());
        if (sent) {
            return ResponseEntity.ok(Map.of("success", true, "message", "OTP sent to registered email"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", "No matching application found with this Serial Number and Email"));
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> body) {
        String serialNumber = body.get("serial_number");
        String email = body.get("email");
        String otp = body.get("otp");

        if (serialNumber == null || email == null || otp == null) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Missing credentials"));
        }

        return otpAuthService.verifyOtp(serialNumber.trim(), email.trim(), otp.trim())
                .map(token -> ResponseEntity.ok(Map.of("success", true, "session_token", token)))
                .orElse(ResponseEntity.badRequest().body(Map.of("success", false, "error", "Invalid or expired OTP")));
    }
}
