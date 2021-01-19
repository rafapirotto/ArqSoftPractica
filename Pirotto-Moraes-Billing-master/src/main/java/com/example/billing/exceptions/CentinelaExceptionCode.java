package com.example.billing.exceptions;

import org.springframework.http.HttpStatus;

import com.example.billing.DTOs.ErrorResponseDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CentinelaExceptionCode {

   UNAUTHORIZED(1, HttpStatus.UNAUTHORIZED),
   INTERNAL_ERROR(3, HttpStatus.INTERNAL_SERVER_ERROR),
   INVALID_USER_OR_PASSWORD(2, HttpStatus.NOT_FOUND);

   private final int internalCode;

   private final HttpStatus status;

   public ErrorResponseDTO toErrorResponseDto(String message) {
      return new ErrorResponseDTO(internalCode, message);
   }

}
