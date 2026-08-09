package com.example.neobank.service;

import com.example.neobank.dto.LoginRequest;
import com.example.neobank.exception.UserException;
import com.example.neobank.model.User;
import com.example.neobank.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.regex.Pattern;

@Service
public class UserService {

    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(User user) {
        if (!passwordValidator(user.getPassword())) {
            throw new UserException("Password invalid. Password must containt at least 1 upper character, " +
                    "1 special character, 1 number and be at least 6 characters long.");
        }
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new UserException("This username already exists.");
        }
        hashPassword(user);
        user.setJoinDate(LocalDate.now());
        return saveUser(user);
    }

    private Boolean passwordValidator(String password) {
        String PASSWORD_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!])(?=\\S+$).{6,}$";
        Pattern pattern = Pattern.compile(PASSWORD_REGEX);
        if (password == null) {
            return false;
        }
        return pattern.matcher(password).matches();
    }

    private void hashPassword(User user) {
        String password = user.getPassword();
        user.setPassword(passwordEncoder.encode(password));
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public Boolean checkPassword(LoginRequest request) {
        User crtUser = userRepository.findByUsername(request.getUsername()).
                orElseThrow(() -> new UserException("User not found"));
        return passwordEncoder.matches(request.getPassword(), crtUser.getPassword());
    }

}
