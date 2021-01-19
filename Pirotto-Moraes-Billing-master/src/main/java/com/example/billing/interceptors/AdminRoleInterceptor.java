package com.example.billing.interceptors;


import java.util.List;
import java.util.Objects;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.HandlerInterceptor;

import com.example.billing.DTOs.SessionDataDTO;
import com.example.billing.DTOs.UserDTO;
import com.example.billing.exceptions.CentinelaException;
import com.example.billing.exceptions.CentinelaExceptionCode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
@PropertySource("classpath:application.properties")
public class AdminRoleInterceptor implements HandlerInterceptor {

   @Autowired
   private Environment env;

   public AdminRoleInterceptor adminRoleInterceptor() {
      return new AdminRoleInterceptor();
   }

   @Override
   public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
      String authReq = request.getHeader("Authorization");
      if (Objects.isNull(authReq)) {
         throw new CentinelaException("Unauthorized", CentinelaExceptionCode.UNAUTHORIZED);
      }
      SessionDataDTO data = authorize(authReq, List.of("ADMIN"));
      request.setAttribute("id", data.getId());
      request.setAttribute("organization", data.getOrganization());
      request.setAttribute("token", data.getToken());
      return true;
   }

   public SessionDataDTO authorize(String authReq, List<String> roles) throws Exception {
      String token = getBearerToken(authReq);
      String decodedToken = decodeJWT(token);

      ObjectMapper mapper = new ObjectMapper();
      SessionDataDTO sessionData = mapper.readValue(decodedToken, SessionDataDTO.class);

      sessionData.setToken(token);

      if (Objects.isNull(sessionData) || !roles.contains(sessionData.getRole())) {
         throw new CentinelaException("Unauthorized", CentinelaExceptionCode.UNAUTHORIZED);
      }

      UserDTO sessionUser = getUser(sessionData.getId());

      if (Objects.isNull(sessionUser) || !roles.contains(sessionUser.getRole())){
         throw new CentinelaException("Unauthorized", CentinelaExceptionCode.UNAUTHORIZED);
      }

      sessionData.setOrganization(sessionUser.getOrganizationName());

      return sessionData;
   }

   private String getBearerToken(String authReq) {
      String[] splitValue = authReq.split("\\s");
      String token = splitValue.length == 2 ? splitValue[1] : "";
      return token;
   }

   private String decodeJWT(String token){
      String payload = token.split("\\.")[1];
      String res = new String(Base64.decodeBase64(payload));
      return res;
   }

   private UserDTO getUser(String id){
      RestTemplate restTemplate = new RestTemplate();

      HttpHeaders headers = new HttpHeaders();
      headers.set("MachineToken", env.getProperty("machine.token"));
      HttpEntity<String> entity = new HttpEntity<String>("parameters",headers);

      ResponseEntity<UserDTO> responseEntity = restTemplate.exchange(env.getProperty("auth.url") + "users/"+id,
            HttpMethod.GET, entity, new ParameterizedTypeReference<UserDTO>() {
            });
      return responseEntity.getBody();
   }

}

