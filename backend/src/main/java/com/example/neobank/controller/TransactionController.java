package com.example.neobank.controller;

import com.example.neobank.dto.TransactionResponse;
import com.example.neobank.exception.UserException;
import com.example.neobank.model.Transaction;
import com.example.neobank.model.User;
import com.example.neobank.repository.UserRepository;
import com.example.neobank.service.TransactionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

    private final TransactionService transactionService;
    private final UserRepository userRepository;

    public TransactionController(TransactionService transactionService, UserRepository userRepository) {
        this.transactionService = transactionService;
        this.userRepository = userRepository;
    }

    @PostMapping()
    public ResponseEntity<TransactionResponse> createTransaction(@RequestBody Transaction transaction) {
        Transaction crtTransaction = transactionService.createTransaction(transaction);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(crtTransaction));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionResponse> getTransactionById(@PathVariable Long id) {
        Transaction crtTransaction = transactionService.getTransactionById(id);
        return ResponseEntity.ok(toResponse(crtTransaction));
    }

    @GetMapping("/history")
    public ResponseEntity<List<TransactionResponse>> getTransactionHistory(Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName()).
                orElseThrow(() -> new UserException("User not found"));

        List<Transaction> userTransactions = transactionService.getUserTransactions(user.getUsername());
        List<TransactionResponse> result = toResponse(userTransactions);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    private TransactionResponse toResponse(Transaction crtTransaction) {
        TransactionResponse result = new TransactionResponse(
                crtTransaction.getCurrency(),
                crtTransaction.getTransactionDate(),
                crtTransaction.getSum(),
                crtTransaction.getSourceAccount(),
                crtTransaction.getDestinationAccount(),
                crtTransaction.getType());
        return result;
    }

    private List<TransactionResponse> toResponse(List<Transaction> userTransactions) {
        List<TransactionResponse> result = new ArrayList<>();
        for (Transaction transaction : userTransactions) {
            result.add(toResponse(transaction));
        }
        return result;
    }
}
