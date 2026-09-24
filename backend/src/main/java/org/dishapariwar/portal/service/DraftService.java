package org.dishapariwar.portal.service;

import lombok.RequiredArgsConstructor;
import org.dishapariwar.portal.entity.ApplicationDraft;
import org.dishapariwar.portal.repository.ApplicationDraftRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DraftService {

    private final ApplicationDraftRepository draftRepository;

    public ApplicationDraft createDraft(String name, String mobile, String email) {
        String draftId = "DRAFT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        ApplicationDraft draft = ApplicationDraft.builder()
                .draftId(draftId)
                .studentName(name)
                .mobile(mobile)
                .email(email)
                .currentPanel(1)
                .formData("{}")
                .build();
        return draftRepository.save(draft);
    }

    public Optional<ApplicationDraft> getDraft(String draftId, String email) {
        return draftRepository.findByDraftIdAndEmail(draftId, email);
    }

    public ApplicationDraft saveDraftPanel(String draftId, int panel, String formData) {
        ApplicationDraft draft = draftRepository.findById(draftId)
                .orElseThrow(() -> new RuntimeException("Draft not found: " + draftId));
        draft.setCurrentPanel(panel);
        draft.setFormData(formData);
        return draftRepository.save(draft);
    }
}
