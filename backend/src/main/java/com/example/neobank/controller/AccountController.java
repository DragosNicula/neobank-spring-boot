package com.example.neobank.controller;

import com.example.neobank.dto.AccountResponse;
import com.example.neobank.exception.UserException;
import com.example.neobank.model.Account;
import com.example.neobank.model.User;
import com.example.neobank.repository.UserRepository;
import com.example.neobank.service.AccountService;
import com.example.neobank.service.AssignService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(("/api/accounts"))
public class AccountController {

    private final AccountService accountService;
    private final AssignService assignService;
    private final UserRepository userRepository;

    public AccountController(AccountService accountService, AssignService assignService, UserRepository userRepository) {
        this.accountService = accountService;
        this.assignService = assignService;
        this.userRepository = userRepository;
    }

    @PostMapping()
    public ResponseEntity<AccountResponse> createAccount (@RequestBody Account account, @RequestParam Long userId) {
        Account created = accountService.createAccount(account);
        assignService.assignAccountToUser(created, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(created));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccountResponse> getAccountById(@PathVariable Long id) {
        Account crtAccount = accountService.getAccountById(id);
        return ResponseEntity.ok(toResponse(crtAccount));
    }

    @GetMapping()
    public ResponseEntity<List<AccountResponse>> getAllAccounts(Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new UserException("User not found"));
        return ResponseEntity.ok(toResponseList(user.getAccounts()));
    }

    private AccountResponse toResponse(Account account) {
        AccountResponse result = new AccountResponse(
                account.getCurrency(),
                account.getIban(),
                account.getSold());
        return result;
    }

    private List<AccountResponse> toResponseList(List<Account> accounts) {
        List<AccountResponse> result = new ArrayList<>();
        for (Account account : accounts) {
            AccountResponse acc = toResponse(account);
            result.add(acc);
        }
        return result;
    }

}
