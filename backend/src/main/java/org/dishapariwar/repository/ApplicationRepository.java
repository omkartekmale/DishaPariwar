package org.dishapariwar.repository;

import org.dishapariwar.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    Optional<Application> findByReferenceNumber(String referenceNumber);
    Optional<Application> findByReferenceNumberAndMobile(String referenceNumber, String mobile);
    List<Application> findByStatus(String status);
}
