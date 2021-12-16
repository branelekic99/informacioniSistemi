package com.example.backend.controllers;

import com.example.backend.controllers.advice.AuthControllerAdvisor;
import com.example.backend.exceptions.UnauthorizedException;
import com.example.backend.models.dto.JwtUser;
import com.example.backend.models.dto.LoginResponse;
import com.example.backend.models.requests.LoginRequest;
import com.example.backend.services.AuthService;
import com.example.backend.services.UserService;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;


import javax.validation.Valid;

@RestController
@ControllerAdvice("AuthControllerAdvisor.class")
public class AuthController {

    private final AuthService service;
    private final UserService userService;

    public AuthController(AuthService service, UserService userService) {
        this.service = service;
        this.userService = userService;
    }

    @PostMapping("login")
    @ExceptionHandler(UnauthorizedException.class)
    public LoginResponse login(@RequestBody @Valid LoginRequest request) {
        return service.login(request);
    }

    @GetMapping("state")
    public LoginResponse state(Authentication auth) {
        JwtUser jwtUser = (JwtUser) auth.getPrincipal();
        return userService.findById(jwtUser.getId(), LoginResponse.class);
    }

}