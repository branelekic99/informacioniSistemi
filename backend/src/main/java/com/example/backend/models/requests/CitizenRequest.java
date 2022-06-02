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

    @NotNull
    private String firstname;
    @NotNull
    private String lastname;
    @NotNull
    private String email;
    @NotNull
    private String phone;
    @NotNull
    private String company;
    @NotNull
    private String year_of_birth;
    @NotNull
    private String year_of_arrival;
    @NotNull
    private String education;
    @NotNull
    private String workplace;

    private String other;

    @NotNull
    private String num_of_family_members;
    @NotNull
    private Integer citizenship_id;
    @NotNull
    private Integer city_id;
    @NotNull
    private Sex sex;
    /*@NotBlank
    private String token;*/
}