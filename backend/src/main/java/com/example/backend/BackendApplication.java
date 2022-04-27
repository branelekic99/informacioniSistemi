package com.example.backend;

import com.example.backend.models.entities.CityEntity;
import com.google.gson.Gson;
import com.google.gson.stream.JsonReader;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import java.io.*;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) throws IOException {
        /*Gson gson = new Gson();
        PrintWriter pw = new PrintWriter("slo_cities.json");
        JsonReader citiesJson = new JsonReader(new FileReader("cities.json"));
        CityEntity[] cities = gson.fromJson(citiesJson, CityEntity[].class);
        int i = 0;
        pw.write("[\n");
        for(CityEntity city : cities){
            if(city.getCountry().equals("SI")){
                pw.write(city.toString());
                i++;
            }
        }
        pw.write("]");
        System.out.println(i);*/
        SpringApplication.run(BackendApplication.class, args);
    }


    @Bean
    ModelMapper modelMapper()
    {
        ModelMapper mapper= new ModelMapper();
        mapper.getConfiguration().setAmbiguityIgnored(true);
        return mapper;
    }
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

}
