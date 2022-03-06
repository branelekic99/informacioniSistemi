package com.example.backend.models.dto;

import com.example.backend.models.enums.Sex;

public interface CitizenMapDTO {

    Integer getId();

    Double getLatitude();

    Double getLongitude();

    String getCity_name();

    Integer getYear_of_birth();

    String getCitizenship();

    Sex getSex();

    Integer getYear_of_arrival();
}