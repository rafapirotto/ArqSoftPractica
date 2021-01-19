package com.example.billing.handler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.billing.exceptions.CentinelaExceptionCode;

@RestControllerAdvice
public class RestControllerHandler {

   @ExceptionHandler({ Exception.class })
   public ResponseEntity handleException(Exception ex) {
      return createResponse(CentinelaExceptionCode.INTERNAL_ERROR, ex.getMessage());
   }

   private ResponseEntity createResponse(CentinelaExceptionCode centinelaExceptionCode, String message) {

      return new ResponseEntity<>(centinelaExceptionCode.toErrorResponseDto(message), centinelaExceptionCode.getStatus());
   }
}