package com.jgc.trading.model;

import com.jgc.trading.domain.WalletTransactionType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Wallet wallet;

    private WalletTransactionType type;

    @Column(nullable = false)
    private Long amount;

    private Long receiverWalletId;

    @Column(nullable = false)
    private String purpose;

    private LocalDateTime timestamp = LocalDateTime.now();

}
