package com.example.backend.controllers;

import com.example.backend.exceptions.InvalidRequestException;
import com.example.backend.models.entities.CitizenEntity;
import com.example.backend.repositories.CitizenEntityRepository;
import com.example.backend.repositories.CityEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/citizens")
public class CitizenController {

    private final CitizenEntityRepository citizenEntityRepository;

    private final CityEntityRepository cityEntityRepository;

    public CitizenController(CitizenEntityRepository citizenEntityRepository, CityEntityRepository cityEntityRepository) {
        this.citizenEntityRepository = citizenEntityRepository;
        this.cityEntityRepository = cityEntityRepository;
    }


    @GetMapping
    public ResponseEntity<Map<String, Object>> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String city_name,
            @RequestParam(required = false) String education,
            @RequestParam(required = false) String firstname,
            @RequestParam(required = false) String lastname
    ) {

        try {
            List<CitizenEntity> citizens = new ArrayList<CitizenEntity>();
            Pageable paging = PageRequest.of(page, size);

            Page<CitizenEntity> pageCitizens;
            if(city_name != null)
                pageCitizens = citizenEntityRepository.findByCity(cityEntityRepository.findByName(city_name).getId(), paging);
            else if(education != null)
                pageCitizens = citizenEntityRepository.findByEducation(education, paging);
            else if(firstname != null && lastname != null)
                pageCitizens = citizenEntityRepository.findByName(firstname, lastname, paging);
            else
                pageCitizens = citizenEntityRepository.findAll(paging);

            citizens = pageCitizens.getContent();

            Map<String, Object> response = new HashMap<>();
            response.put("citizens", citizens);
            response.put("currentPage", pageCitizens.getNumber());
            response.put("totalItems", pageCitizens.getTotalElements());
            response.put("totalPages", pageCitizens.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/filter")
    Page<CitizenEntity> findAll(@RequestParam(name="city_name", required = false) String city_name) {
        /*if(city_name != null)
            return citizenEntityRepository.findByCity(city_name);
        return citizenEntityRepository.findAll();*/
        return null;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    CitizenEntity save(@RequestBody CitizenEntity citizen) {
        if(citizen.getId() != null)
            throw new InvalidRequestException("Invalid request, field id must be null.");
        if(citizen.getFirstname() == null)
            throw new InvalidRequestException("Invalid request, field firstaname cannot be null.");
        else if(citizen.getLastname() == null)
            throw new InvalidRequestException("Invalid request, field lastname cannot be null.");
        else if(citizen.getCityEntity() == null)
            throw new InvalidRequestException("Invalid request, field city cannot be null.");
        else if(citizen.getPhone() == null)
            throw new InvalidRequestException("Invalid request, field phone cannot be null.");
        else if(citizen.getEmail() == null)
            throw new InvalidRequestException("Invalid request, field email cannot be null.");
        else if(citizen.getYear_of_birth() == null)
            throw new InvalidRequestException("Invalid request, field year_of_birth cannot be null.");
        else if(citizen.getCitizenshipEntity() == null)
            throw new InvalidRequestException("Invalid request, field citizenship_entity cannot be null.");
        return citizenEntityRepository.save(citizen);
    }
}