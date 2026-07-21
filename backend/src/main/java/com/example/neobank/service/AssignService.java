package com.example.neobank.service;

import com.example.neobank.exception.UserException;
import com.example.neobank.model.Account;
import com.example.neobank.model.User;
import com.example.neobank.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AssignService {

    private final UserRepository userRepository;

    public AssignService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void assignAccountToUser(Account account, Long id) {
        User user = userRepository.findById(id).
                orElseThrow(() -> new UserException("User not found"));
        assignAccount(user, account);
        userRepository.save(user);
    }

    public void assignAccount(User user, Account account) {
        user.getAccounts().add(account);
    }

}
