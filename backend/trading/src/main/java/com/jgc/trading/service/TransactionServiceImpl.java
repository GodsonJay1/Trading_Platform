package com.jgc.trading.service;

import com.jgc.trading.domain.WalletTransactionType;
import com.jgc.trading.model.Wallet;
import com.jgc.trading.model.WalletTransaction;
import com.jgc.trading.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public WalletTransaction createTransaction(Wallet wallet, WalletTransactionType type, Long receiverWalletId, String purpose, Long amount) {

        WalletTransaction transaction = WalletTransaction.builder()
                .wallet(wallet)
                .type(type)
                .receiverWalletId(receiverWalletId)
                .purpose(purpose)
                .amount(amount)
                .date(LocalDate.now())
                .build();

        return transactionRepository.save(transaction);
    }

    @Override
    public List<WalletTransaction> getTransactionsByWallet(Wallet wallet) {
        return transactionRepository.findByWallet(wallet);
    }
}
