package com.example.neobank.model;

import jakarta.persistence.OneToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="addresses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    @Id
    private Long id;
    private String street;
    private String town;
    private String country;
    private String postalCode;
    @OneToOne
    @MapsId
    @JoinColumn(name="user_id")
    private User user;

    public Address(String street, String town, String country, String postalCode) {
        this.street = street;
        this.town = town;
        this.country = country;
        this.postalCode = postalCode;
    }

}
