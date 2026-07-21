package com.example.neobank.controller;

import com.example.neobank.model.User;
import com.example.neobank.service.RegistrationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final RegistrationService registrationService;
    public UserController (RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping()
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User created = registrationService.userRegistration(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

}
