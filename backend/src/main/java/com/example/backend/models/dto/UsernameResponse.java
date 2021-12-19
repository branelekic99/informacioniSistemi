package com.example.backend.models.dto;


import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class UsernameResponse extends User {
    private String username;

    public UsernameResponse(String username){
        this.username = username;
    }
}