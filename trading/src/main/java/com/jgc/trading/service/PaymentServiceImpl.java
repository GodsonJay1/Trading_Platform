package com.jgc.trading.service;

import com.jgc.trading.domain.PaymentMethod;
import com.jgc.trading.domain.PaymentOrderStatus;
import com.jgc.trading.model.PaymentOrder;
import com.jgc.trading.model.User;
import com.jgc.trading.repository.PaymentOrderRepository;
import com.jgc.trading.response.PaymentResponse;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.View;

import java.io.BufferedReader;
import java.io.InputStreamReader;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentOrderRepository paymentOrderRepository;

    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    @Value("${paystack.secret.key}")
    private String paystackSecretKey;

    private static final String PAYSTACK_CREATE_PAYMENT_LINK_URL = "https://api.paystack.co/transaction/initialize";


    @Override
    public PaymentOrder createOrder(User user, Long amount, PaymentMethod paymentMethod) {

        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setUser(user);
        paymentOrder.setAmount(amount);
        paymentOrder.setPaymentMethod(paymentMethod);
        paymentOrder.setStatus(PaymentOrderStatus.PENDING);

        return paymentOrderRepository.save(paymentOrder);
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long id) throws Exception {
        return paymentOrderRepository.findById(id).orElseThrow(
                () -> new Exception("Payment order not found"));
    }

    @Override
    public Boolean proceedPaymentOrder(PaymentOrder paymentOrder, String paymentId) {
        if (paymentOrder.getStatus() == null) {
            paymentOrder.setStatus(PaymentOrderStatus.PENDING);
        }
        if (paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING)) {
            if (paymentOrder.getPaymentMethod().equals(PaymentMethod.PAYSTACK)) {

                // Initialize HTTP client for Paystack
                HttpClient client = HttpClientBuilder.create().build();
                HttpGet request = new HttpGet("https://api.paystack.co/transaction/verify/" + paymentId);
                request.addHeader("Content-type", "application/json");
                request.addHeader("Authorization", "Bearer " + paystackSecretKey);

                try {
                    HttpResponse response = client.execute(request);
                    if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
                        // Parse the response
                        BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
                        StringBuilder result = new StringBuilder();
                        String line;
                        while ((line = rd.readLine()) != null) {
                            result.append(line);
                        }

                        JSONObject jsonResponse = new JSONObject(result.toString());
                        String status = jsonResponse.getJSONObject("data").getString("status");

                        if (status.equals("success")) {
                            paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
                            paymentOrderRepository.save(paymentOrder);
                            return true;
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }

                paymentOrder.setStatus(PaymentOrderStatus.FAILED);
                paymentOrderRepository.save(paymentOrder);
                return false;
            }
            paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
            paymentOrderRepository.save(paymentOrder);
            return true;
        }
        return false;
    }


    @Override
    public PaymentResponse createPaystackPaymentLink(User user, Long amount, Long orderId) throws Exception {

        PaymentResponse response = null;

        try {
            HttpClient client = HttpClientBuilder.create().build();
            HttpPost post = new HttpPost(PAYSTACK_CREATE_PAYMENT_LINK_URL);

            // Set headers
            post.addHeader("Content-Type", "application/json");
            post.addHeader("Authorization", "Bearer " + paystackSecretKey);

            // Create a JSON object with the payment link request parameters
            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount", amount * 100);
            paymentLinkRequest.put("currency", "NGN");

            // Create a JSON object with the customer details
            JSONObject customer = new JSONObject();
            customer.put("name", user.getFullName());
            customer.put("email", user.getEmail());
            paymentLinkRequest.put("email", user.getEmail());

            // Create a JSON object with the notification settings
            JSONObject notify = new JSONObject();
            notify.put("email", true);
            paymentLinkRequest.put("notify", notify);

            // Set the reminder settings
            paymentLinkRequest.put("reminder_enabled", true);

            // Set the callback URL and method
            paymentLinkRequest.put("callback_url", "http://localhost:5173/wallet?order_id="+orderId);
            paymentLinkRequest.put("callback_method", "get");

            // Add the JSON payload to the request
            StringEntity entity = new StringEntity(paymentLinkRequest.toString());
            post.setEntity(entity);

            // Execute the request
            HttpResponse httpResponse = client.execute(post);

            int statusCode = httpResponse.getStatusLine().getStatusCode();
            BufferedReader rd = new BufferedReader(new InputStreamReader(httpResponse.getEntity().getContent()));
            StringBuilder result = new StringBuilder();

            String line;

            while ((line = rd.readLine()) != null) {
                result.append(line);
            }

            if (statusCode == 200) {
                JSONObject jsonResponse = new JSONObject(result.toString());
                String paymentLinkUrl = jsonResponse.getJSONObject("data").getString("authorization_url");

                // prepare the response object
                response = new PaymentResponse();
                response.setPayment_url(paymentLinkUrl);
            }else {
                throw new Exception("Failed to create payment link with Paystack. Error: " + result.toString());
            }

            // Handle the response
        } catch (Exception e) {
            throw new Exception("Error creating payment link with Paystack: " + e.getMessage());
        }

         return response;
    }


    @Override
    public PaymentResponse createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException {
        Stripe.apiKey = stripeSecretKey;

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5173/wallet?order_id="+orderId)
                .setCancelUrl("http://localhost:5173/payment/cancel")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(
                                SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("usd")
                                        .setUnitAmount(amount*100)
                                        .setProductData(SessionCreateParams
                                                .LineItem
                                                .PriceData
                                                .ProductData
                                                .builder()
                                                .setName("Top up wallet")
                                                .build()
                                        ).build()
                        ).build()
                ).build();

        Session session = Session.create(params);

        System.out.println("session _____" + session);

        PaymentResponse response = new PaymentResponse();
        response.setPayment_url(session.getUrl());

        return response;

    }
}
