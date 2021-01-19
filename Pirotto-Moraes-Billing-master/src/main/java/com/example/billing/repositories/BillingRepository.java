package com.example.billing.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.billing.entities.BillingEntity;

public interface BillingRepository extends MongoRepository<BillingEntity, String> {

   List<BillingEntity> findByDateBetween(LocalDate from, LocalDate to);

   List<BillingEntity> findBillingEntitiesByOrganization(String organization);
}
