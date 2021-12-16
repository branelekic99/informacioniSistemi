package com.example.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(
        value = HttpStatus.FORBIDDEN,
        reason = "Forbidden access"
)
public class ForbiddenException extends HttpException {
    public ForbiddenException() {
        super(HttpStatus.FORBIDDEN, null);
    }


    public ForbiddenException(Object data) {
        super(HttpStatus.FORBIDDEN, data);
    }
}