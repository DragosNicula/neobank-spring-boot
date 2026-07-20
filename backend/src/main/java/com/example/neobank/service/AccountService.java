package com.example.neobank.service;

import com.example.neobank.exception.AccountException;
import com.example.neobank.model.Account;
import com.example.neobank.model.CurrencyType;
import com.example.neobank.repository.AccountRepository;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Account createAccount(Account account) {
        accountRepository.save(account);
        String iban = createIban(account);
        account.setIban(iban);
        return accountRepository.save(account);
    }

    private String createIban(Account account) {
        Long id = account.getId();
        switch (account.getCurrency()) {
            case USD:
                return "USNEOBANK0000" + id;
            case EUR:
                return "EUNEOBANK0000" + id;
            default:
                return "RONEOBANK0000" + id;
        }
    }
}
