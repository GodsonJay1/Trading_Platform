package com.jgc.trading.model;

import com.jgc.trading.domain.WithdrawalStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
public class Withdrawal {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private WithdrawalStatus status;

    private Long Amount;

    @ManyToOne
    private User user;

    private LocalDateTime date = LocalDateTime.now();
}
