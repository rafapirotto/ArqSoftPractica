package com.example.billing.DTOs;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BillingDTO {

   private String organization;

   private LocalDate date;

   private Integer errors_quantity;

   private Double cost_per_error;

   private Double errors_total_cost;

   private Integer users_quantity;

   private Double cost_per_user;

   private Double users_total_cost;

   private Double total_cost;

}
