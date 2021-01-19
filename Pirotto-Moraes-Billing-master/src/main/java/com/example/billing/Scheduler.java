package com.example.billing;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.billing.services.BillingService;

@Component
@EnableScheduling
public class Scheduler {

   @Autowired
   private BillingService billingService;

   //@Scheduled(cron = "0 * * * * *")//Para ejecutarlo cada un minuto
   @Scheduled(cron = "0 0 0 1 1/1 *")
   public void scheduleTaskWithCronExpression() {
      System.out.println("Guardando facturas...");
      billingService.saveBilling();
   }

}
