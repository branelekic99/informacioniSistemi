package com.example.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(
        value = HttpStatus.UNAUTHORIZED,
        reason = "Wrong password."
)
public class WrongPasswordException extends HttpException {

    public WrongPasswordException() {
        super(HttpStatus.UNAUTHORIZED, null);
    }

    public WrongPasswordException(Object data) {
        super(HttpStatus.UNAUTHORIZED, data);
    }
}