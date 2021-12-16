package com.example.backend.controllers.advisors;

import com.example.backend.exceptions.CredentialsMissingException;
import com.example.backend.exceptions.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@ControllerAdvice
public class AuthControllerAdvisor extends ResponseEntityExceptionHandler {

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<Object> handleUnauthorizedException(UnauthorizedException ex, WebRequest request){
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("message", "Incorrect username or password.");
        return new ResponseEntity<>(body, HttpStatus.UNAUTHORIZED);
    }

        @ExceptionHandler(CredentialsMissingException.class)
        public ResponseEntity<Object> handleCredentialsMissingException(CredentialsMissingException ex, WebRequest request){
            Map<String, Object> body = new LinkedHashMap<>();
            body.put("timestamp", LocalDateTime.now());
            body.put("message", "Some of the credentials are missing.");
            return new ResponseEntity<>(body, HttpStatus.UNAUTHORIZED);
        }


}
