package com.example.backend.controllers;

import com.example.backend.models.entities.CitizenshipEntity;
import com.example.backend.models.entities.CityEntity;
import com.example.backend.repositories.CitizenshipEntityRepository;
import com.example.backend.repositories.CityEntityRepository;
import com.google.gson.Gson;
import com.google.gson.stream.JsonReader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/citizenships")
public class CitizenshipController {

    private final CitizenshipEntityRepository citizenshipEntityRepository;

    public CitizenshipController(CitizenshipEntityRepository citizenshipEntityRepository) {
        this.citizenshipEntityRepository = citizenshipEntityRepository;
    }



    @GetMapping
    List<CitizenshipEntity> findAll() {
        return citizenshipEntityRepository.findAll();
    }
}