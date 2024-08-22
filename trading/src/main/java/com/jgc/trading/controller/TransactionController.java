package com.jgc.trading.controller;

import com.jgc.trading.model.User;
import com.jgc.trading.model.Wallet;
import com.jgc.trading.model.WalletTransaction;
import com.jgc.trading.service.TransactionService;
import com.jgc.trading.service.UserService;
import com.jgc.trading.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TransactionController {

    @Autowired
    private WalletService walletService;

    @Autowired
    private UserService userService;

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/api/transactions")
    public ResponseEntity<List<WalletTransaction>> getUserWallet(
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);

        Wallet wallet = walletService.getUserWallet(user);

        List<WalletTransaction> transactionList = transactionService
                .getTransactionsByWallet(wallet);

        return new ResponseEntity<>(transactionList, HttpStatus.ACCEPTED);
    }
}
