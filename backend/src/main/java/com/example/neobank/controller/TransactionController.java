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
    public ResponseEntity<TransactionResponse> createTransaction(@RequestBody Transaction transaction, @RequestParam Long sourceAccountId, @RequestParam Long destinationAccountId) {
        Transaction crtTransaction = transactionService.createTransaction(transaction, sourceAccountId, destinationAccountId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createResponse(crtTransaction));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionResponse> getTransactionById(@PathVariable Long id) {
        Transaction crtTransaction = transactionService.getTransactionById(id);
        return ResponseEntity.ok(createResponse(crtTransaction));
    }

    private TransactionResponse createResponse(Transaction crtTransaction) {
        TransactionResponse result = new TransactionResponse(
                crtTransaction.getCurrency(),
                crtTransaction.getTransactionDate(),
                crtTransaction.getSum());
        return result;
    }
}
