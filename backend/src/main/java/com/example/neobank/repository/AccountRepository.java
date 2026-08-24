package com.example.neobank.repository;

import com.example.neobank.model.Account;
import com.example.neobank.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    public Optional<Account> findByIban(String iban);
}
