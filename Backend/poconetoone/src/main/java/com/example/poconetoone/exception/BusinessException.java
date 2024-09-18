package com.example.poconetoone.exception;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
    public class BusinessException extends Exception {

        private String errorMessage;


    }


