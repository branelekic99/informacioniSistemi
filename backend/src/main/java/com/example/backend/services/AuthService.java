package com.example.backend.services;

import com.example.backend.models.dto.LoginResponse;
import com.example.backend.models.requests.LoginRequest;


public interface AuthService {
    LoginResponse login(LoginRequest request);
}