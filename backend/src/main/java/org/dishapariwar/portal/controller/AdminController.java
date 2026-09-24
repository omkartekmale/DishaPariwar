package org.dishapariwar.portal.controller;

import lombok.RequiredArgsConstructor;
import org.dishapariwar.portal.dto.AdminUpdateDTO;
import org.dishapariwar.portal.entity.Application;
import org.dishapariwar.portal.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String password = body.get("password");
        if (adminService.authenticateAdmin(password)) {
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "token", "ADMIN-TOKEN-2026",
                    "role", "ADMIN"
            ));
        }
        return ResponseEntity.status(401).body(Map.of("success", false, "error", "Invalid admin password"));
    }

    @GetMapping("/applications")
    public ResponseEntity<?> searchApplications(@RequestParam(required = false, defaultValue = "") String query) {
        List<Application> apps = adminService.searchApplications(query);
        return ResponseEntity.ok(Map.of("success", true, "applications", apps));
    }

    @PutMapping("/applications/{serialNumber}")
    public ResponseEntity<?> updateApplication(
            @PathVariable String serialNumber,
            @RequestBody AdminUpdateDTO dto) {
        try {
            Application updated = adminService.updateApplication(serialNumber, dto);
            return ResponseEntity.ok(Map.of("success", true, "application", updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @GetMapping("/metrics")
    public ResponseEntity<?> getMetrics() {
        return ResponseEntity.ok(Map.of("success", true, "metrics", adminService.getMetrics()));
    }
}
