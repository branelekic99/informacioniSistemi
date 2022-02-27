package com.example.backend;

import com.example.backend.models.entities.CityEntity;
import com.google.gson.Gson;
import com.google.gson.stream.JsonReader;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.*;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) throws IOException {
        /*Gson gson = new Gson();
        FileWriter fw = new FileWriter("slo_cities.json");
        fw.write("[\n");
        JsonReader citiesJson = new JsonReader(new FileReader("cities.json"));
        CityEntity[] cities = gson.fromJson(citiesJson, CityEntity[].class);
        int i = 0;
        for(CityEntity city : cities){
            if(city.getCountry().equals("SI")){
                fw.write(city.toString());
            }
        }
        fw.write("\n]");*/
        SpringApplication.run(BackendApplication.class, args);
    }


    @Bean
    ModelMapper modelMapper()
    {
        ModelMapper mapper= new ModelMapper();
        mapper.getConfiguration().setAmbiguityIgnored(true);
        return mapper;
    }

}
