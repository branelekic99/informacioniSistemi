package com.example.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(
        value = HttpStatus.UNAUTHORIZED,
        reason = "Unauthorized access."
)
public class UnauthorizedException extends HttpException {

    public UnauthorizedException() {
        super(HttpStatus.UNAUTHORIZED, null);
    }

    public UnauthorizedException(Object data) {
        super(HttpStatus.UNAUTHORIZED, data);
    }
}