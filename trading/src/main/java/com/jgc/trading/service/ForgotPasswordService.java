package com.jgc.trading.service;

import com.jgc.trading.domain.VerificationType;
import com.jgc.trading.model.ForgotPasswordToken;
import com.jgc.trading.model.User;

public interface ForgotPasswordService {

    ForgotPasswordToken createToken(User user,
                                    String id,
                                    String otp,
                                    VerificationType verificationType,
                                    String sendTo);

    ForgotPasswordToken findById(String id);

    ForgotPasswordToken findByUser(Long userId);

    void deleteToken(ForgotPasswordToken token);
}
