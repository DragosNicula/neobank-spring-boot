package com.example.neobank.repository;

import com.example.neobank.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("SELECT t FROM Transaction t WHERE t.sourceAccount IN :ibans OR t.destinationAccount IN :ibans ORDER BY t.transactionDate DESC")
    List<Transaction> findByAccountInvolved(@Param("ibans") List<String> ibans);
}