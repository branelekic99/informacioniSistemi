package com.example.backend.controllers;

import com.example.backend.exceptions.InvalidRequestException;
import com.example.backend.models.entities.CitizenEntity;
import com.example.backend.repositories.CitizenEntityRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/citizens")
public class CitizenController {

    private final CitizenEntityRepository citizenEntityRepository;

    public CitizenController(CitizenEntityRepository citizenEntityRepository) {
        this.citizenEntityRepository = citizenEntityRepository;
    }


    @GetMapping
    public ResponseEntity<Map<String, Object>> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {

        try {
            List<CitizenEntity> citizens = new ArrayList<CitizenEntity>();
            Pageable paging = PageRequest.of(page, size);

            Page<CitizenEntity> pageCitizens;
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
    /*@GetMapping
    List<CitizenEntity> findAll() {
        return citizenEntityRepository.findAll();
    }*/

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    CitizenEntity save(@RequestBody CitizenEntity citizen) {
        if(citizen.getId() != null)
            throw new InvalidRequestException("Invalid request, field id must be null.");
        if(citizen.getFirstname() == null)
            throw new InvalidRequestException("Invalid request, field firstaname cannot be null.");
        else if(citizen.getLastname() == null)
            throw new InvalidRequestException("Invalid request, field lastname cannot be null.");
        else if(citizen.getCity() == null)
            throw new InvalidRequestException("Invalid request, field city cannot be null.");
        else if(citizen.getPhone() == null || citizen.getPhone().length() < 9)
            throw new InvalidRequestException("Invalid request, field phone contains invalid value.");
        else if(citizen.getEmail() == null || isEmailValid(citizen.getEmail()))
            throw new InvalidRequestException("Invalid request, field email contains invalid value.");
        else if(citizen.getYear_of_birth() == null)
            throw new InvalidRequestException("Invalid request, field year_of_birth cannot be null.");
        else if(citizen.getCitizenshipEntity() == null)
            throw new InvalidRequestException("Invalid request, field citizenship_entity cannot be null.");
        try{
            if(citizen.getNum_of_family_members() != null)
                Integer.parseInt(citizen.getNum_of_family_members());
        }
        catch(NumberFormatException e){
            throw new InvalidRequestException("num_of_family_members field must contain integer value.");
        }
        try{
            if(citizen.getYear_of_arrival() != null && Integer.parseInt(citizen.getYear_of_arrival()) > LocalDateTime.now().getYear())
                throw new InvalidRequestException("Year of arrival cannot be a future year.");
        }
        catch(NumberFormatException e){
            throw new InvalidRequestException("year_of_arrival field must contain integer value.");
        }try{
            if(citizen.getYear_of_birth() != null && Integer.parseInt(citizen.getYear_of_birth()) > LocalDateTime.now().getYear())
                throw new InvalidRequestException("Year of birth cannot be a future year.");
        }
        catch(NumberFormatException e){
            throw new InvalidRequestException("year_of_birth field must contain integer value.");
        }

        return citizenEntityRepository.save(citizen);
    }


    public static boolean isEmailValid(String email)
    {
        String regex = "^[A-Za-z0-9+_.-]+@(.+)$";
        Pattern pattern = Pattern.compile(regex);
        if (email == null)
            return false;
        return !pattern.matcher(email).matches();
    }
}
