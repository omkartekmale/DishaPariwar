package org.dishapariwar.portal.controller;

import lombok.RequiredArgsConstructor;
import org.dishapariwar.portal.entity.ApplicationDraft;
import org.dishapariwar.portal.service.DraftService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/drafts")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DraftController {

    private final DraftService draftService;

    @PostMapping
    public ResponseEntity<?> createDraft(@RequestBody Map<String, String> body) {
        String name = body.get("name");
        String mobile = body.get("mobile");
        String email = body.get("email");

        if (name == null || mobile == null || email == null) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Name, mobile, and email are required"));
        }

        ApplicationDraft draft = draftService.createDraft(name, mobile, email);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "draft_id", draft.getDraftId(),
                "message", "Draft created successfully"
        ));
    }

    @GetMapping("/{draftId}")
    public ResponseEntity<?> getDraft(@PathVariable String draftId, @RequestParam String email) {
        return draftService.getDraft(draftId, email)
                .map(draft -> ResponseEntity.ok(Map.of("success", true, "data", draft)))
                .orElse(ResponseEntity.status(404).body(Map.of("success", false, "error", "Draft not found with provided ID and email")));
    }

    @PutMapping("/{draftId}/panel")
    public ResponseEntity<?> savePanel(
            @PathVariable String draftId,
            @RequestBody Map<String, Object> body) {
        try {
            int panel = (int) body.getOrDefault("panel", 1);
            String formData = (String) body.getOrDefault("data", "{}");
            ApplicationDraft updated = draftService.saveDraftPanel(draftId, panel, formData);
            return ResponseEntity.ok(Map.of("success", true, "panel", updated.getCurrentPanel()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }
}
