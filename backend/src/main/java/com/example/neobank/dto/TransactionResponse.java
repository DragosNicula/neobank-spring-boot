package com.example.neobank.dto;

import com.example.neobank.model.TransactionType;
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
    private String sourceAccount;
    private String destinationAccount;
    private TransactionType type;
}
