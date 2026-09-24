package org.dishapariwar.service;

import org.dishapariwar.model.Application;
import org.dishapariwar.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public Optional<Application> getByReference(String ref) {
        return applicationRepository.findByReferenceNumber(ref);
    }

    public Optional<Application> trackApplication(String ref, String mobile) {
        if (mobile == null || mobile.trim().isEmpty()) {
            return applicationRepository.findByReferenceNumber(ref);
        }
        return applicationRepository.findByReferenceNumberAndMobile(ref, mobile);
    }

    public Application createApplication(Application application) {
        if (application.getReferenceNumber() == null || application.getReferenceNumber().isEmpty()) {
            int randomNum = 1000 + new Random().nextInt(9000);
            application.setReferenceNumber("DP-" + LocalDate.now().getYear() + "-" + randomNum);
        }
        if (application.getAppliedAt() == null) {
            application.setAppliedAt(LocalDate.now());
        }
        application.setStatus("UNDER_REVIEW");
        application.setStatusMr("छाननी चालू आहे");
        application.setStatusEn("Under Committee Review");
        return applicationRepository.save(application);
    }

    public Optional<Application> updateStatus(String ref, String newStatus, String remarks) {
        Optional<Application> opt = applicationRepository.findByReferenceNumber(ref);
        if (opt.isPresent()) {
            Application app = opt.get();
            app.setStatus(newStatus);
            app.setRemarks(remarks);

            if ("APPROVED".equalsIgnoreCase(newStatus)) {
                app.setStatusMr("मंजूर करण्यात आला");
                app.setStatusEn("Scholarship Approved");
            } else if ("REJECTED".equalsIgnoreCase(newStatus)) {
                app.setStatusMr("नामंजूर");
                app.setStatusEn("Not Eligible");
            } else if ("DOCUMENTS_PENDING".equalsIgnoreCase(newStatus)) {
                app.setStatusMr("कागदपत्रे प्रलंबित");
                app.setStatusEn("Documents Pending");
            } else {
                app.setStatusMr("छाननी चालू आहे");
                app.setStatusEn("Under Committee Review");
            }
            return Optional.of(applicationRepository.save(app));
        }
        return Optional.empty();
    }
}
