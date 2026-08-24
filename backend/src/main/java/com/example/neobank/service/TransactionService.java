package com.example.neobank.service;

import com.example.neobank.exception.AccountException;
import com.example.neobank.exception.TransactionException;
import com.example.neobank.model.Account;
import com.example.neobank.model.Transaction;
import com.example.neobank.model.TransactionType;
import com.example.neobank.repository.AccountRepository;
import com.example.neobank.repository.TransactionRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;


@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;

    public TransactionService(TransactionRepository transactionRepository, AccountRepository accountRepository) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
    }

    @Transactional
    public Transaction createTransaction(Transaction transaction) {
        TransactionType type = transaction.getType();
        Account sourceAccount = accountRepository.findByIban(transaction.getSourceAccount()).
                orElseThrow(() -> new AccountException("Account with IBAN: " + transaction.getSourceAccount() + " is not found"));
        transaction.setTransactionDate(LocalDate.now());
        switch (type) {
            case DEPOSIT:
                processTransactionDeposit(transaction, sourceAccount);
                break;
            case WITHDRAWAL:
                processTransactionWithdrawal(transaction, sourceAccount);
                break;
            default:
                Account destinationAccount = accountRepository.findByIban(transaction.getDestinationAccount()).
                        orElseThrow(() -> new AccountException("Account with IBAN: " + transaction.getDestinationAccount() + " is not found"));
                processTransactionTransfer(transaction, sourceAccount, destinationAccount);
                break;
        }
        return transactionRepository.save(transaction);
    }

    private void processTransactionDeposit(Transaction transaction, Account destinationAccount) {
        if (transaction.getSum() <= 0) {
            throw new AccountException("The amount of money you are trying to deposit is too small.");
        }
        double deposit = destinationAccount.getSold() + transaction.getSum();
        destinationAccount.setSold(deposit);
        accountRepository.save(destinationAccount);
    }

    private void processTransactionWithdrawal(Transaction transaction, Account sourceAccount) {
        if (sourceAccount.getSold() <= 0 || sourceAccount.getSold() <= transaction.getSum()) {
            throw new AccountException("Insuficient funds.");
        }
        withdrawalProcess(transaction, sourceAccount);
    }

    private void processTransactionTransfer(Transaction transaction, Account sourceAccount, Account destinationAccount) {
        if (sourceAccount.getSold() <= 0 || sourceAccount.getSold() <= transaction.getSum()) {
            throw new AccountException("Insuficient funds.");
        }
        withdrawalProcess(transaction, sourceAccount);
        transferProcess(transaction, destinationAccount);
    }

    private void withdrawalProcess(Transaction transaction, Account sourceAccount) {
        double amountRemaining = sourceAccount.getSold() - transaction.getSum();
        sourceAccount.setSold(amountRemaining);
        accountRepository.save(sourceAccount);
    }

    private void transferProcess(Transaction transaction, Account destinationAccount) {
        destinationAccount.setSold(destinationAccount.getSold() + transaction.getSum());
        accountRepository.save(destinationAccount);
    }

    public Transaction getTransactionById(Long id) {
        return transactionRepository.findById(id).
                orElseThrow(() -> new TransactionException("Transaction with id: " + id + " not found."));
    }
}
