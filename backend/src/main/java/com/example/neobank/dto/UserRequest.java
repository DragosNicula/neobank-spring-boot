package com.example.neobank.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserRequest {
    private String username;
    private String password;
    private String street;
    private String town;
    private String country;
    private String postalCode;
}
