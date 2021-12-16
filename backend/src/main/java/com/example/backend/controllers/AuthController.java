package com.example.backend.controllers;

import com.example.backend.models.dto.JwtUser;
import com.example.backend.models.dto.LoginResponse;
import com.example.backend.models.requests.LoginRequest;
import com.example.backend.services.AuthService;
import com.example.backend.services.UserService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;


import javax.validation.Valid;

@RestController
public class AuthController {

    private final AuthService service;
    private final UserService userService;

    public AuthController(AuthService service, UserService userService) {
        this.service = service;
        this.userService = userService;
    }

    @PostMapping("login")
    public LoginResponse login(@RequestBody @Valid LoginRequest request) {
        return service.login(request);
    }

    @GetMapping("state")
    public LoginResponse state(Authentication auth) {
        JwtUser jwtUser = (JwtUser) auth.getPrincipal();
        return userService.findById(jwtUser.getId(), LoginResponse.class);
    }

}