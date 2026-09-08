package com.example.neobank.dto;

import com.example.neobank.model.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class TransactionResponse {
    private String currency;
    private LocalDateTime transactionDate;
    private double sum;
    private String sourceAccount;
    private String destinationAccount;
    private TransactionType type;
}
