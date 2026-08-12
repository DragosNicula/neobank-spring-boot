package com.example.neobank.controller;

import com.example.neobank.dto.LoginRequest;
import com.example.neobank.service.JwtService;
import com.example.neobank.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/login")
public class AuthController {

    private final JwtService jwtService;
    private final UserService userService;

    public AuthController(JwtService jwtService, UserService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @PostMapping()
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest request) {

        Boolean checkPw = userService.checkPassword(request);
        if (!checkPw) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password.");
        }
        String token = jwtService.generateToken(request);
        return ResponseEntity.status(HttpStatus.OK).body(token);
    }

}
