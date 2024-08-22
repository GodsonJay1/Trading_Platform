package com.jgc.trading.service;

import com.jgc.trading.model.PaymentDetails;
import com.jgc.trading.model.User;

public interface PaymentDetailService {

    public PaymentDetails addPaymentDetails(String accountNumber,
                                            String accountHolderName,
                                            String ifsc,
                                            String bankName,
                                            User user);

    public PaymentDetails getUsersPaymentDetails(User user);
}
