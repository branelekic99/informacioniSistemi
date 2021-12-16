package com.example.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(
        value = HttpStatus.UNAUTHORIZED,
        reason = "Some of the credentials are missing."
)
public class CredentialsMissingException extends HttpException {

    public CredentialsMissingException() {
        super(HttpStatus.UNAUTHORIZED, null);
    }

    public CredentialsMissingException(Object data) {
        super(HttpStatus.UNAUTHORIZED, data);
    }
}