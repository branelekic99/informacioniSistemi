package com.example.backend.controllers;

import com.example.backend.models.entities.CitizenEntity;
import com.example.backend.repositories.CitizenEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/citizens")
public class CitizenController {

    private final CitizenEntityRepository citizenEntityRepository;

    public CitizenController(CitizenEntityRepository citizenEntityRepository) {
        this.citizenEntityRepository = citizenEntityRepository;
    }

    @GetMapping
    List<CitizenEntity> findAll()
    {
        return citizenEntityRepository.findAll();
    }
}
