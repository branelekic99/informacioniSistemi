package com.example.backend.exceptions;

import com.example.backend.exceptions.HttpException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(
        value = HttpStatus.NOT_FOUND,
        reason = "Not found"
)
public class NotFoundException extends HttpException {
    public NotFoundException() {
        super(HttpStatus.NOT_FOUND, null);
    }

    public NotFoundException(Object data) {
        super(HttpStatus.NOT_FOUND, data);
    }
}