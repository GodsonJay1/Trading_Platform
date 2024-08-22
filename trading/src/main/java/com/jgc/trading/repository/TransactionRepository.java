package com.jgc.trading.repository;

import com.jgc.trading.model.Wallet;
import com.jgc.trading.model.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<WalletTransaction, Long> {
    List<WalletTransaction> findByWallet(Wallet wallet);
}
