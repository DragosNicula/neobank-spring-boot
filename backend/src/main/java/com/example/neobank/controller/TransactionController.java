package com.example.neobank.controller;

import com.example.neobank.model.Transaction;
import com.example.neobank.service.TransactionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping()
    public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction, @RequestParam Long sourceAccountId, @RequestParam Long destinationAccountId) {
        Transaction created = transactionService.createTransaction(transaction, sourceAccountId, destinationAccountId);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable Long id) {
        return ResponseEntity.ok(transactionService.getTransactionById(id));
    }

}
