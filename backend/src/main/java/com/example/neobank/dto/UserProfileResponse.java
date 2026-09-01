package com.example.neobank.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserProfileResponse {
    String username;
    AddressResponse address;
}
