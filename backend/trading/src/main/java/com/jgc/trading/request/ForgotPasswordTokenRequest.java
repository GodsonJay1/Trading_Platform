package com.jgc.trading.request;

import com.jgc.trading.domain.VerificationType;
import lombok.Data;

@Data
public class ForgotPasswordTokenRequest {

    private String sendTo;

    private VerificationType verificationType;
}
