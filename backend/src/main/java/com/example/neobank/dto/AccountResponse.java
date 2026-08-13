package com.example.neobank.dto;

import com.example.neobank.model.CurrencyType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AccountResponse {
    private CurrencyType currency;
    private String iban;
    private double sold;
}
