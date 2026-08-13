package com.example.neobank.service;

import com.example.neobank.dto.UserRequest;
import com.example.neobank.model.Account;
import com.example.neobank.model.Address;
import com.example.neobank.model.CurrencyType;
import com.example.neobank.model.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RegistrationService {

    private UserService userService;
    private AccountService accountService;

    public RegistrationService (UserService userService, AccountService accountService) {
        this.userService = userService;
        this.accountService = accountService;
    }

    @Transactional
    public User userRegistration(UserRequest userRequest) {
        User user = new User(userRequest.getUsername(), userRequest.getPassword());
        User crtUser = userService.createUser(user);
        Address address = new Address(
                userRequest.getStreet(),
                userRequest.getTown(),
                userRequest.getCountry(),
                userRequest.getPostalCode());
        Account account = createDefaultAccount();
        connectAddressToUser(crtUser, address);
        connectAccountToUser(crtUser, account);
        return userService.saveUser(crtUser);
    }

    private Account createDefaultAccount() {
        Account account = new Account();
        account.setSold(0);
        account.setCurrency(CurrencyType.RON);
        return accountService.createAccount(account);
    }

    private void connectAccountToUser(User user, Account account) {
        user.getAccounts().add(account);
    }

    private void connectAddressToUser(User user, Address address) {
        address.setUser(user);
        user.setAddress(address);
    }

}
