package com.example.neobank.controller;

import com.example.neobank.dto.AddressResponse;
import com.example.neobank.dto.UserProfileResponse;
import com.example.neobank.dto.UserRequest;
import com.example.neobank.dto.UserResponse;
import com.example.neobank.exception.UserException;
import com.example.neobank.model.User;
import com.example.neobank.repository.UserRepository;
import com.example.neobank.service.RegistrationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final RegistrationService registrationService;
    private final UserRepository userRepository;
    public UserController (RegistrationService registrationService, UserRepository userRespository) {
        this.registrationService = registrationService;
        this.userRepository = userRespository;
    }

    @PostMapping()
    public ResponseEntity<UserResponse> createUser(@RequestBody UserRequest userRequest) {
        User crtUser = registrationService.userRegistration(userRequest);
        UserResponse userResponse = new UserResponse(crtUser.getId(), crtUser.getUsername(), crtUser.getJoinDate());
        return ResponseEntity.status(HttpStatus.CREATED).body(userResponse);
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getUserProfileData(Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName()).
                orElseThrow(() -> new UserException("User not found."));
        AddressResponse address = new AddressResponse(user.getAddress().getStreet(), user.getAddress().getTown(), user.getAddress().getCountry(), user.getAddress().getPostalCode());
        UserProfileResponse userProfileResponse = new UserProfileResponse(user.getUsername(), address);
        return ResponseEntity.status(HttpStatus.OK).body(userProfileResponse);
    }
}
