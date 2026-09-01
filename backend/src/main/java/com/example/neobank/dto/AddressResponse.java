package com.example.neobank.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AddressResponse {
    private String street;
    private String town;
    private String country;
    private String postalCode;
}
