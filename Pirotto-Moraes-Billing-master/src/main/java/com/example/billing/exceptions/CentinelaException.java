package com.example.billing.exceptions;

import lombok.Data;

@Data
public class CentinelaException extends Exception{

   private CentinelaExceptionCode centinelaExceptionCode;

   public CentinelaException(String message, CentinelaExceptionCode code) {
      super(message);
      this.centinelaExceptionCode = code;
   }

   public String toString() {
      return centinelaExceptionCode + " :: " + super.toString();
   }

}
