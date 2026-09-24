package org.dishapariwar.controller;

import org.dishapariwar.model.Application;
import org.dishapariwar.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    // 1. Track Application
    @GetMapping("/applications/track")
    public ResponseEntity<?> trackApplication(
            @RequestParam String referenceNumber,
            @RequestParam(required = false) String mobile) {
        Optional<Application> appOpt = applicationService.trackApplication(referenceNumber, mobile);
        Map<String, Object> response = new HashMap<>();
        if (appOpt.isPresent()) {
            response.put("success", true);
            response.put("data", appOpt.get());
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Application not found with given details.");
            return ResponseEntity.status(404).body(response);
        }
    }

    // 2. Submit Application
    @PostMapping("/applications")
    public ResponseEntity<?> submitApplication(@RequestBody Application application) {
        Application saved = applicationService.createApplication(application);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", saved);
        response.put("referenceNumber", saved.getReferenceNumber());
        return ResponseEntity.ok(response);
    }

    // 3. Admin Get All Applications
    @GetMapping("/admin/applications")
    public ResponseEntity<?> getAllApplications() {
        List<Application> list = applicationService.getAllApplications();
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", list);
        return ResponseEntity.ok(response);
    }

    // 4. Admin Update Status
    @PutMapping("/admin/applications/{ref}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable String ref,
            @RequestBody Map<String, String> body) {
        String status = body.get("status");
        String remarks = body.get("remarks");
        Optional<Application> updated = applicationService.updateStatus(ref, status, remarks);
        Map<String, Object> response = new HashMap<>();
        if (updated.isPresent()) {
            response.put("success", true);
            response.put("data", updated.get());
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Application not found");
            return ResponseEntity.status(404).body(response);
        }
    }
}
