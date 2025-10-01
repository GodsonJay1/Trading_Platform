package com.jgc.trading.service;

import com.jgc.trading.domain.WalletTransactionType;
import com.jgc.trading.model.Wallet;
import com.jgc.trading.model.WalletTransaction;

import java.time.LocalDate;
import java.util.List;

public interface TransactionService {
    public WalletTransaction createTransaction(Wallet wallet, WalletTransactionType type, Long receiverWalletId, String purpose, Long amount);

    List<WalletTransaction> getTransactionsByWallet(Wallet wallet);
}
