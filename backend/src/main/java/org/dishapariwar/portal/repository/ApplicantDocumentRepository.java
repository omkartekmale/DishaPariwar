package org.dishapariwar.portal.repository;

import org.dishapariwar.portal.entity.ApplicantDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicantDocumentRepository extends JpaRepository<ApplicantDocument, Long> {
    List<ApplicantDocument> findByApplicationId(Long applicationId);
    Optional<ApplicantDocument> findByApplicationIdAndDocId(Long applicationId, String docId);
}
