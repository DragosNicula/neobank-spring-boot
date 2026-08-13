package com.example.neobank.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class TransactionResponse {
    private String currency;
    private LocalDate transactionDate;
    private double sum;
}
