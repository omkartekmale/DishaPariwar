package org.dishapariwar.portal.repository;

import org.dishapariwar.portal.entity.ApplicationDraft;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApplicationDraftRepository extends JpaRepository<ApplicationDraft, String> {
    Optional<ApplicationDraft> findByDraftIdAndEmail(String draftId, String email);
}
