package com.jgc.trading.request;

import com.jgc.trading.domain.OrderType;
import lombok.Data;

@Data
public class CreateOrderRequest {

    private String coinId;

    private double quantity;

    private OrderType orderType;
}
