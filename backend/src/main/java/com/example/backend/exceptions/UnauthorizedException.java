package com.example.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(
        value = HttpStatus.UNAUTHORIZED,
        reason = "Pogrešno korisničko ime ili lozinka. Molimo pokušajte ponovo."
)
public class UnauthorizedException extends HttpException {

    public UnauthorizedException() {
        super(HttpStatus.UNAUTHORIZED, null);
    }

    public UnauthorizedException(Object data) {
        super(HttpStatus.UNAUTHORIZED, data);
    }
}