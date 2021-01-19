package com.example.billing.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SessionDataDTO {
   private String id;
   private String role;
   private String iat;
   private String exp;
   private String token;
   private String organization;
}

