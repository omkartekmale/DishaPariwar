package org.dishapariwar.portal.controller;

import lombok.RequiredArgsConstructor;
import org.dishapariwar.portal.dto.ApplicationRequestDTO;
import org.dishapariwar.portal.entity.Application;
import org.dishapariwar.portal.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping
    public ResponseEntity<?> submitApplication(@RequestBody ApplicationRequestDTO dto) {
        try {
            Application app = applicationService.submitApplication(dto);
            Map<String, Object> resp = new HashMap<>();
            resp.put("success", true);
            resp.put("serial_number", app.getSerialNumber());
            resp.put("message", "Application submitted successfully");
            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            Map<String, Object> err = new HashMap<>();
            err.put("success", false);
            err.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(err);
        }
    }

    @GetMapping("/{serialNumber}")
    public ResponseEntity<?> getApplication(@PathVariable String serialNumber) {
        return applicationService.findBySerialNumber(serialNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{serialNumber}/status")
    public ResponseEntity<?> getApplicationStatus(@PathVariable String serialNumber) {
        return applicationService.findBySerialNumber(serialNumber)
                .map(app -> {
                    Map<String, Object> resp = new HashMap<>();
                    resp.put("success", true);
                    resp.put("application", app);
                    resp.put("serial_number", app.getSerialNumber());
                    resp.put("current_stage", app.getCurrentStage());
                    resp.put("application_status", app.getApplicationStatus());
                    resp.put("final_decision", app.getFinalDecision());
                    resp.put("physical_form_received", app.getPhysicalFormReceived());
                    resp.put("documents_verified", app.getDocumentsVerified());
                    return ResponseEntity.ok(resp);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
