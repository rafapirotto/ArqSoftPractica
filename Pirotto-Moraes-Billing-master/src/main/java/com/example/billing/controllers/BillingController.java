package com.example.billing.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.billing.DTOs.BillingDTO;
import com.example.billing.exceptions.CentinelaException;
import com.example.billing.services.BillingService;

@RestController
@RequestMapping("/")
public class BillingController {

   @Autowired
   private BillingService billingService;

   @GetMapping()
   public BillingDTO get(@RequestAttribute("organization") String organization, @RequestParam(required = false) Integer month,
         @RequestParam(required = false) Integer year) throws CentinelaException {
      return billingService.get(organization, month, year);
   }

   @GetMapping("/previous")
   public List<BillingDTO> getPrevious(@RequestAttribute("organization") String organization) throws CentinelaException {
      return billingService.getPrevious(organization);
   }
}
