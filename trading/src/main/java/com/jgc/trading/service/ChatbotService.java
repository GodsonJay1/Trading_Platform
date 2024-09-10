package com.jgc.trading.service;

import com.jgc.trading.response.ApiResponse;

public interface ChatbotService {

    ApiResponse getCoinDetails(String prompt) throws Exception;

    String simpleChat(String prompt);
}
