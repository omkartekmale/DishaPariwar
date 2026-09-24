package org.dishapariwar.portal.repository;

import org.dishapariwar.portal.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    Optional<Application> findBySerialNumber(String serialNumber);

    Optional<Application> findBySerialNumberAndEmail(String serialNumber, String email);

    @Query("SELECT a FROM Application a WHERE " +
           "LOWER(a.serialNumber) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(a.fullName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "a.mobile LIKE CONCAT('%', :query, '%') OR " +
           "LOWER(a.district) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Application> searchApplications(@Param("query") String query);

    long countByFinalDecision(String finalDecision);

    long countByCurrentStage(String currentStage);
}
