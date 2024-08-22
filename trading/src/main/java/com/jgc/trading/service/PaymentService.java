package com.jgc.trading.service;

import com.jgc.trading.domain.PaymentMethod;
import com.jgc.trading.model.PaymentOrder;
import com.jgc.trading.model.User;
import com.jgc.trading.response.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {

    PaymentOrder createOrder(User user, Long amount, PaymentMethod paymentMethod);

    PaymentOrder getPaymentOrderById(Long id) throws Exception;

    Boolean proceedPaymentOrder(PaymentOrder paymentOrder, String paymentId);

    PaymentResponse createPaystackPaymentLink(User user, Long amount, Long orderId) throws Exception;

    PaymentResponse createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException;

}
