package com.example.billing.entities;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@Document(collection = "billings")
@AllArgsConstructor
public class BillingEntity {

   @Id
   private String id;

   private LocalDate date;

   private String organization;

   private Integer errors_quantity;

   private Double cost_per_error;

   private Double errors_total_cost;

   private Integer users_quantity;

   private Double cost_per_user;

   private Double users_total_cost;

   private Double total_cost;

}
