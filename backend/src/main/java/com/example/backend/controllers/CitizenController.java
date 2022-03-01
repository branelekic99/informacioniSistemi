package com.example.backend.controllers;

import com.example.backend.exceptions.InvalidRequestException;
import com.example.backend.models.entities.CitizenEntity;
import com.example.backend.models.entities.CityEntity;
import com.example.backend.repositories.CitizenEntityRepository;
import com.example.backend.repositories.CityEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers.contains;

@RestController
@RequestMapping("/citizens")
public class CitizenController {

    private final CitizenEntityRepository citizenEntityRepository;

    private final CityEntityRepository cityEntityRepository;
    private final EntityManager entityManager;

    public CitizenController(CitizenEntityRepository citizenEntityRepository, CityEntityRepository cityEntityRepository, EntityManager entityManager) {
        this.citizenEntityRepository = citizenEntityRepository;
        this.cityEntityRepository = cityEntityRepository;
        this.entityManager = entityManager;
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
            CriteriaBuilder cb = entityManager.getCriteriaBuilder();
            CriteriaQuery cq = cb.createQuery();
            Root<CitizenEntity> citizen = cq.from(CitizenEntity.class);
            Page<CitizenEntity> pageCitizens;
            CityEntity city = cityEntityRepository.findByName(city_name);
            pageCitizens = citizenEntityRepository.findAll(Example.of(CitizenEntity.builder().firstname(firstname).lastname(lastname).
                    education(education).cityEntity(city).build(),
                    ExampleMatcher.matchingAll().withMatcher("firstName", contains().ignoreCase()).
                            withMatcher("firstName", contains().ignoreCase())),
                    paging);





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