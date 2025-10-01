package com.jgc.trading.service;

import com.jgc.trading.domain.OrderType;
import com.jgc.trading.model.Coin;
import com.jgc.trading.model.Order;
import com.jgc.trading.model.OrderItem;
import com.jgc.trading.model.User;

import java.util.List;

public interface OrderService {

    Order createOrder(User user, OrderItem orderItem, OrderType orderType);

    Order getOrderById(Long orderId) throws Exception;

    List<Order> getAllOrdersOfUser(Long userId, OrderType orderType, String assetSymbol);

    Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws Exception;
}
