package com.example.backend.controllers;

import com.example.backend.models.entities.CityEntity;
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
@RequestMapping("/cities")
public class CityController {

    private final CityEntityRepository cityEntityRepository;

    public CityController(CityEntityRepository cityEntityRepository) {
        this.cityEntityRepository = cityEntityRepository;
    }


    @GetMapping("/fill")
    public ResponseEntity<Map<String, Object>> fillCities() throws FileNotFoundException {
        Gson gson = new Gson();
        JsonReader citiesJson = new JsonReader(new FileReader("city_list.json"));
        CityEntity[] cities = gson.fromJson(citiesJson, CityEntity[].class);
        int i = 0;
        for(CityEntity city : cities){
            if(city.getCountry().equals("SI")){
                cityEntityRepository.save(city);
                i++;
            }
        }
        Map<String, Object> response = new HashMap<>();
        response.put("num_of_cities", i);

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @GetMapping
    List<CityEntity> findAll() {
        return cityEntityRepository.findAll();
    }
}