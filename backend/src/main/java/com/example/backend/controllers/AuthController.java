package com.example.backend.controllers;

import com.example.backend.exceptions.UnauthorizedException;
import com.example.backend.models.dto.JwtUser;
import com.example.backend.models.dto.LoginResponse;
import com.example.backend.models.dto.UsernameResponse;
import com.example.backend.models.requests.LoginRequest;
import com.example.backend.services.AuthService;
import com.example.backend.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.client.RestTemplate;


import javax.validation.Valid;

@RestController
@ControllerAdvice("AuthControllerAdvisor.class")
public class AuthController {

    private final AuthService service;
    private final UserService userService;
    @Autowired
    private RestTemplate restTemplate;

    public AuthController(AuthService service, UserService userService) {
        this.service = service;
        this.userService = userService;
    }


    @PostMapping("login")
    public LoginResponse login(@RequestBody @Valid LoginRequest request,@RequestParam(name="g-recaptcha-response") String captchaResponse) {

        String url = "https://www.google.com/recaptcha/api/siteverify";
        String params = "?secret=6Lf6r_weAAAAAOYCf0cuc1mwSw30vhkFPfRGMzV0&response="+captchaResponse;
        ReCaptchaResponse reCaptchaResponse = restTemplate.exchange(url+params, HttpMethod.POST,null,ReCaptchaResponse.class).getBody();

        if(reCaptchaResponse.isSuccess())
            return service.login(request);
        else
            return null;
    }


    @GetMapping("get-user")
    public UsernameResponse state(Authentication auth) {
        JwtUser jwtUser = (JwtUser) auth.getPrincipal();
        return new UsernameResponse(jwtUser.getUsername());
    }

}