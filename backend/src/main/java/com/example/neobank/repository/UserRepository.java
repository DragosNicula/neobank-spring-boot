package com.example.neobank.repository;

import com.example.neobank.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    public Boolean existsByUsername(String username);

}
