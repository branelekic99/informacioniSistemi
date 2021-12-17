package com.example.backend.controllers;

import com.example.backend.models.entities.CitizenEntity;
import com.example.backend.repositories.CitizenEntityRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/citizens")
public class CitizenController {

    private final CitizenEntityRepository citizenEntityRepository;

    public CitizenController(CitizenEntityRepository citizenEntityRepository) {
        this.citizenEntityRepository = citizenEntityRepository;
    }

    @GetMapping
    List<CitizenEntity> findAll() {
        return citizenEntityRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    CitizenEntity save(@RequestBody CitizenEntity citizen) {
        return citizenEntityRepository.save(citizen);
    }
}
