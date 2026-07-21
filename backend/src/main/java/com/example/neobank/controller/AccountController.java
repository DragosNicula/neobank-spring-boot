package com.example.neobank.controller;

import com.example.neobank.model.Account;
import com.example.neobank.service.AccountService;
import com.example.neobank.service.AssignService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(("/api/accounts"))
public class AccountController {

    private AccountService accountService;
    private AssignService assignService;

    public AccountController(AccountService accountService, AssignService assignService) {
        this.accountService = accountService;
        this.assignService = assignService;
    }

    @PostMapping()
    public ResponseEntity<Account> createAccount (@RequestBody Account account,@RequestParam Long userId) {
        Account created = accountService.createAccount(account);
        assignService.assignAccountToUser(created, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable Long id) {
        return ResponseEntity.ok(accountService.getAccountById(id));
    }

    @GetMapping()
    public ResponseEntity<List<Account>> getAllAccounts() {
        return ResponseEntity.ok(accountService.getAllAccounts());
    }

}
