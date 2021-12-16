package com.example.backend.services.impl;


import com.example.backend.exceptions.CredentialsMissingException;
import com.example.backend.exceptions.UnauthorizedException;
import com.example.backend.models.dto.JwtUser;
import com.example.backend.models.dto.LoginResponse;
import com.example.backend.models.requests.LoginRequest;
import com.example.backend.services.AuthService;
import com.example.backend.services.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;


import java.util.Date;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    @Value("${authorization.token.expiration-time}")
    private String tokenExpirationTime;
    @Value("${authorization.token.secret}")
    private String tokenSecret;


    public AuthServiceImpl(AuthenticationManager authenticationManager, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        LoginResponse response = null;
        try {
            if(request.getUsername() == null || request.getPassword() == null)
                throw new CredentialsMissingException("Some of the credentials are missig.");
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getUsername(), request.getPassword()
                            )
                    );
            JwtUser user = (JwtUser) authenticate.getPrincipal();
            response = userService.findById(user.getId(), LoginResponse.class);
            response.setToken(generateJwt(user));
        } catch (UnauthorizedException ex) {
            throw new UnauthorizedException("Wrong credentials.");
        }
        return response;
    }

    private String generateJwt(JwtUser user) {
        return Jwts.builder()
                .setId(user.getId().toString())
                .setSubject(user.getUsername())
                .claim("role", user.getRole().name())
                .setExpiration(new Date(System.currentTimeMillis() + Long.parseLong(tokenExpirationTime)))
                .signWith(SignatureAlgorithm.HS512, tokenSecret)
                .compact();
    }
}