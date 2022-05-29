package com.example.backend.models.requests;

import com.example.backend.models.entities.CitizenEntity;
import com.example.backend.models.entities.CitizenshipEntity;
import com.example.backend.models.entities.CityEntity;
import com.example.backend.models.enums.Sex;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Data
public class CitizenRequest {

    @NotBlank
    private String firstname;
    @NotBlank
    private String lastname;
    @NotBlank
    private String email;
    @NotBlank
    private String phone;
    @NotBlank
    private String company;
    @NotBlank
    private String year_of_birth;
    @NotBlank
    private String year_of_arrival;
    @NotBlank
    private String education;
    @NotBlank
    private String workplace;
    @NotBlank
    private String other;
    @NotBlank
    private String num_of_family_members;
    @NotNull
    private Integer citizenship_id;
    @NotNull
    private Integer city_id;
    @NotBlank
    private Sex sex;
    @NotBlank
    private String token;
}