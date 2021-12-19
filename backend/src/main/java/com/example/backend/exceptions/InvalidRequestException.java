package com.example.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(
        value = HttpStatus.BAD_REQUEST
)
public class InvalidRequestException extends HttpException {
    public InvalidRequestException() {
        super(HttpStatus.BAD_REQUEST, null);
    }

    public InvalidRequestException(Object data) {
        super(HttpStatus.BAD_REQUEST, data);
    }
}