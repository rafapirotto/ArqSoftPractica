package com.example.billing.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.billing.DTOs.BillingDTO;
import com.example.billing.DTOs.ErrorDTO;
import com.example.billing.DTOs.OrganizationDTO;
import com.example.billing.entities.BillingEntity;
import com.example.billing.exceptions.CentinelaException;
import com.example.billing.repositories.BillingRepository;

@Service
@PropertySource("classpath:application.properties")
public class BillingService {

   @Autowired
   private Environment env;

   @Autowired
   private BillingRepository billingRepository;

   public BillingDTO get(String organization, Integer month, Integer year) throws CentinelaException {
      if (month!=null && year!=null){
         return getByMonthAndOrganization(organization, month,year);
      }else{
         return generateBilling(organization, getErrorsOfActualMonth(organization));
      }
   }

   public List<BillingDTO> getPrevious(String organization) throws CentinelaException {
      List<BillingEntity> billingEntities = billingRepository.findBillingEntitiesByOrganization(organization);
      List<BillingDTO> billingDTOList = new ArrayList<>();
      for (BillingEntity billing : billingEntities) {
         BillingDTO billingDTO = new BillingDTO(billing.getOrganization(),billing.getDate(),
               billing.getErrors_quantity(),billing.getCost_per_error(),billing.getErrors_total_cost(),
               billing.getUsers_quantity(),billing.getCost_per_user(),billing.getUsers_total_cost(),
               billing.getTotal_cost());
         billingDTOList.add(billingDTO);
      }
      return billingDTOList;
   }

   public BillingDTO getByMonthAndOrganization(String organization, Integer month, Integer year){
      YearMonth yearMonthObject = YearMonth.of(year, month);
      Integer daysInMonth = yearMonthObject.lengthOfMonth();
      LocalDate from = LocalDate.of(year, month, 1);
      LocalDate to = LocalDate.of(year, month, daysInMonth);
      List<BillingEntity> billings = billingRepository.findByDateBetween(from.minusDays(1),to.plusDays(1));
      List<BillingEntity> organizationBillings = new ArrayList<>();
      for (BillingEntity b : billings
           ) {
         if (b.getOrganization().equalsIgnoreCase(organization)){
            organizationBillings.add(b);
         }
      }
      if (organizationBillings.isEmpty()){
         return null;
      }else{
         BillingEntity billing = organizationBillings.get(0);
         return new BillingDTO(billing.getOrganization(),billing.getDate(),
               billing.getErrors_quantity(),billing.getCost_per_error(),billing.getErrors_total_cost(),
               billing.getUsers_quantity(),billing.getCost_per_user(),billing.getUsers_total_cost(),
               billing.getTotal_cost());
      }
   }

   public void saveBilling(){
      for (OrganizationDTO organization : getOrganizations()) {
         String organizationName = organization.getOrganizationName();
         BillingDTO lastBilling = generateBilling(organizationName, getErrorsOfLastMonth(organizationName));
         BillingEntity billingToSave = new BillingEntity(null,getDateNow().minusDays(1),lastBilling.getOrganization(),
               lastBilling.getErrors_quantity(),lastBilling.getCost_per_error(),lastBilling.getErrors_total_cost(),
               lastBilling.getUsers_quantity(),lastBilling.getCost_per_user(),lastBilling.getUsers_total_cost(),
               lastBilling.getTotal_cost());
         billingRepository.save(billingToSave);
      }

   }

   private BillingDTO generateBilling(String organization, List<ErrorDTO> errors){
      List<String> users = getUsers(organization);
      Integer errors_quantity = errors.size();
      Double cost_per_error = 0.1;
      Double errors_total_cost = errors_quantity*cost_per_error;
      Integer users_quantity = users.size();
      Double cost_per_user = 5.0;
      Double users_total_cost = users_quantity*cost_per_user;
      Double total_cost = errors_total_cost+users_total_cost;
      return new BillingDTO(organization, getDateNow(), errors_quantity,cost_per_error,errors_total_cost,users_quantity,cost_per_user,users_total_cost,total_cost);
   }

   private List<ErrorDTO> getErrorsOfActualMonth(String organization){
      LocalDate actualDate = getDateNow();
      LocalDate from = LocalDate.of(actualDate.getYear(), actualDate.getMonthValue(), 1);
      return getErrors(organization,from,actualDate);
   }

   private List<ErrorDTO> getErrorsOfLastMonth(String organization){
      LocalDate actualDate = getDateNow();
      Integer actualMonth = actualDate.getMonthValue();
      Integer actualYear = actualDate.getYear();
      Integer lastMonth;
      Integer yearOfLastMonth;
      if (actualMonth!=1){
         lastMonth = actualMonth - 1;
         yearOfLastMonth = actualYear;
      }else{
         lastMonth = 12;
         yearOfLastMonth = actualYear - 1;
      }
      YearMonth yearMonthObject = YearMonth.of(yearOfLastMonth, lastMonth);
      Integer daysInMonth = yearMonthObject.lengthOfMonth();
      LocalDate from = LocalDate.of(yearOfLastMonth, lastMonth, 1);
      LocalDate to = LocalDate.of(yearOfLastMonth, lastMonth, daysInMonth);
      return getErrors(organization,from,to);
   }

   private LocalDate getDateNow(){
      LocalDateTime localDateTime = LocalDateTime.now();
      LocalDate actualDate = localDateTime.toLocalDate();
      return actualDate;
   }

   private List<ErrorDTO> getErrors(String organization, LocalDate from, LocalDate to){
      RestTemplate restTemplate = new RestTemplate();
      Map<String, String> params = new HashMap<>();
      params.put("from", from.toString());
      params.put("to", to.toString());

      HttpHeaders headers = new HttpHeaders();
      headers.set("MachineToken", env.getProperty("machine.token"));
      HttpEntity<String> entity = new HttpEntity<String>("parameters",headers);

      ResponseEntity<List<ErrorDTO>> responseEntity = restTemplate.exchange(env.getProperty("errors.url") + "betweenTwoDates/" + organization + "?from={from}&to={to}",
            HttpMethod.GET, entity, new ParameterizedTypeReference<List<ErrorDTO>>() {
            }, params);
      return responseEntity.getBody();
   }

   private List<String> getUsers(String organization){
      RestTemplate restTemplate = new RestTemplate();

      HttpHeaders headers = new HttpHeaders();
      headers.set("MachineToken", env.getProperty("machine.token"));
      HttpEntity<String> entity = new HttpEntity<String>("parameters",headers);

      ResponseEntity<List<String>> responseEntity = restTemplate.exchange(env.getProperty("auth.url") + "emails/" + organization,
            HttpMethod.GET, entity, new ParameterizedTypeReference<List<String>>() {
            });
      return responseEntity.getBody();
   }

   private List<OrganizationDTO> getOrganizations(){
      RestTemplate restTemplate = new RestTemplate();

      HttpHeaders headers = new HttpHeaders();
      headers.set("MachineToken", env.getProperty("machine.token"));
      HttpEntity<String> entity = new HttpEntity<String>("parameters",headers);

      ResponseEntity<List<OrganizationDTO>> responseEntity = restTemplate.exchange(env.getProperty("auth.url") + "organizations",
            HttpMethod.GET, entity, new ParameterizedTypeReference<List<OrganizationDTO>>() {
            });
      return responseEntity.getBody();
   }

}
