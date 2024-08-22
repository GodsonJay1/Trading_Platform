package com.jgc.trading.controller;

import com.jgc.trading.domain.PaymentMethod;
import com.jgc.trading.model.PaymentOrder;
import com.jgc.trading.model.User;
import com.jgc.trading.response.PaymentResponse;
import com.jgc.trading.service.PaymentService;
import com.jgc.trading.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PaymentController {

    @Autowired
    private UserService userService;

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/payment/{paymentMethod}/amount/{amount}")
    public ResponseEntity<PaymentResponse> paymentHandler(
            @PathVariable PaymentMethod paymentMethod,
            @PathVariable Long amount,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);

        PaymentResponse paymentResponse;

        PaymentOrder order = paymentService.createOrder(user, amount, paymentMethod);

        if(paymentMethod.equals(PaymentMethod.PAYSTACK)){
            paymentResponse = paymentService.createPaystackPaymentLink(user, amount, order.getId());
        }
        else{
            paymentResponse = paymentService.createStripePaymentLink(user, amount, order.getId());
        }

        return new ResponseEntity<>(paymentResponse, HttpStatus.CREATED);
    }
}
