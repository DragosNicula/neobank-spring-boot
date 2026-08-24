package com.example.neobank.controller;

import com.example.neobank.dto.TransactionResponse;
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
    public ResponseEntity<TransactionResponse> createTransaction(@RequestBody Transaction transaction) {
        Transaction crtTransaction = transactionService.createTransaction(transaction);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(crtTransaction));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionResponse> getTransactionById(@PathVariable Long id) {
        Transaction crtTransaction = transactionService.getTransactionById(id);
        return ResponseEntity.ok(toResponse(crtTransaction));
    }

    private TransactionResponse toResponse(Transaction crtTransaction) {
        TransactionResponse result = new TransactionResponse(
                crtTransaction.getCurrency(),
                crtTransaction.getTransactionDate(),
                crtTransaction.getSum());
        return result;
    }
}
