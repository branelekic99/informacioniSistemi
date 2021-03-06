package com.example.backend.controllers;

import com.example.backend.exceptions.InvalidRequestException;
import com.example.backend.models.dto.CitizenMapDTO;
import com.example.backend.models.entities.CitizenEntity;
import com.example.backend.models.entities.CitizenshipEntity;
import com.example.backend.models.entities.CityEntity;
import com.example.backend.models.enums.Sex;
import com.example.backend.models.requests.CitizenRequest;
import com.example.backend.repositories.CitizenEntityRepository;
import com.example.backend.repositories.CitizenshipEntityRepository;
import com.example.backend.repositories.CityEntityRepository;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.*;
import java.util.*;

import static org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers.startsWith;

@RestController
@RequestMapping("/citizens")
public class CitizenController {

    private final CitizenEntityRepository citizenEntityRepository;

    private final CityEntityRepository cityEntityRepository;
    private final CitizenshipEntityRepository citizenshipEntityRepository;
    private final EntityManager entityManager;
    private final ModelMapper modelMapper;

    @Value("${secret}")
    private String secret;



    public CitizenController(CitizenEntityRepository citizenEntityRepository, CityEntityRepository cityEntityRepository, EntityManager entityManager, CitizenshipEntityRepository citizenshipEntityRepository, ModelMapper modelMapper, RestTemplate restTemplate) {
        this.citizenEntityRepository = citizenEntityRepository;
        this.cityEntityRepository = cityEntityRepository;
        this.entityManager = entityManager;
        this.citizenshipEntityRepository = citizenshipEntityRepository;
        this.modelMapper = modelMapper;
    //    this.restTemplate = restTemplate;
    }


    @GetMapping
    public ResponseEntity<Map<String, Object>> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Integer city_id,
            @RequestParam(required = false) String education,
            @RequestParam(required = false) String firstname,
            @RequestParam(required = false) String lastname,
            @RequestParam(required = false) String workplace,
            @RequestParam(required = false) String year_of_birth,
            @RequestParam(required = false) String year_of_arrival,
            @RequestParam(required = false) Integer citizenship_id,
            @RequestParam(required = false) Sex sex,
            @RequestParam(required = false) String company
    ) {

        try {
            List<CitizenEntity> citizens = new ArrayList<CitizenEntity>();
            Pageable paging = PageRequest.of(page, size);
            CriteriaBuilder cb = entityManager.getCriteriaBuilder();
            CriteriaQuery cq = cb.createQuery();
            Root<CitizenEntity> citizen = cq.from(CitizenEntity.class);
            Page<CitizenEntity> pageCitizens;
            CityEntity city = cityEntityRepository.findByIdentifier(city_id);
            CitizenshipEntity citizenship = citizenshipEntityRepository.findByIdentifier(citizenship_id);
            pageCitizens = citizenEntityRepository.findAll(Example.of(CitizenEntity.builder().company(company).sex(sex).citizenshipEntity(citizenship).firstname(firstname).lastname(lastname).
                    education(education).cityEntity(city).workplace(workplace).year_of_birth(year_of_birth).year_of_arrival(year_of_arrival).build(),
                    ExampleMatcher.matchingAll().withMatcher("firstname", startsWith().ignoreCase()).
                            withMatcher("lastname", startsWith().ignoreCase()).withMatcher("education", startsWith().ignoreCase()).withMatcher("company", startsWith().ignoreCase())),
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
    @GetMapping("/age")
    Page<CitizenEntity> findAge(@RequestParam(name="year_of_birth", required = false) String year_of_birth) {
        if(year_of_birth != null)
            return citizenEntityRepository.findByYearOfBirth(year_of_birth,PageRequest.of(0, 5));
        return null;
    }

    public boolean captcha( String token) {
        URL url = null;
        try {
            url = new URL("https://www.google.com/recaptcha/api/siteverify" + "?secret=" + secret + "&response=" + token);
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection) con;
            http.setRequestMethod("GET"); // PUT is another valid option
            http.setDoOutput(true);
            http.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            http.setRequestProperty("Content-Length", "<calculated when request is sent>");

            http.connect();
            String stringJson = new String(http.getInputStream().readAllBytes());
            JsonObject jsonObject = new JsonParser().parse(stringJson).getAsJsonObject();
            if (jsonObject.get("success").getAsBoolean() == true)
                return true;
            else
                return false;



        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (ProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    CitizenEntity save(@RequestBody CitizenRequest citizenRequest) {
        if(!captcha( citizenRequest.getToken()))
            throw new InvalidRequestException("Invalid request, there si no confirmation of a human.");

        CitizenEntity citizen = modelMapper.map(citizenRequest, CitizenEntity.class);
        citizen.setCitizenshipEntity(citizenshipEntityRepository.getById(citizenRequest.getCitizenship_id()));
        citizen.setCityEntity(cityEntityRepository.getById(citizenRequest.getCity_id()));

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
        else if(!(citizen.getSex().equals(Sex.male) || citizen.getSex().equals(Sex.female)))
            throw new InvalidRequestException("Invalid request, field sex must have value male or female.");
        citizen.setT_create(new Date());

            return citizenEntityRepository.save(citizen);

    }

    @GetMapping("/map")
    List<CitizenMapDTO> citizensForMap(){
        return citizenEntityRepository.getCitizenMapDTOs();
    }

    @GetMapping("/statistics/sex")
    public ResponseEntity statisticsSex(){
        Map<String, Object> response = new HashMap<>();
        response.put("Mu??ki", citizenEntityRepository.countSex("male"));
        response.put("??enski", citizenEntityRepository.countSex("female"));
        return new ResponseEntity(response,HttpStatus.OK);
    }

    @GetMapping("/statistics/arrival")
    public ResponseEntity statisticsArrival(){
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("1990-1995", citizenEntityRepository.countArrival(1991,1995));
        response.put("1996-2000", citizenEntityRepository.countArrival(1996,2000));
        response.put("2001-2005", citizenEntityRepository.countArrival(2001,2005));
        response.put("2006-2010", citizenEntityRepository.countArrival(2006,2010));
        response.put("2011-2015", citizenEntityRepository.countArrival(2011,2015));
        response.put("2016-2020", citizenEntityRepository.countArrival(2016,2020));
        response.put("2021-2022", citizenEntityRepository.countArrival(2021,2022));

        return new ResponseEntity(response,HttpStatus.OK);
    }

    @GetMapping("/statistics/age")
    public ResponseEntity statisticsAge(){
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("1-10", citizenEntityRepository.countAge(1,10));
        response.put("11-20", citizenEntityRepository.countAge(11,20));
        response.put("21-30", citizenEntityRepository.countAge(21,30));
        response.put("31-40", citizenEntityRepository.countAge(31,40));
        response.put("41-50", citizenEntityRepository.countAge(41,50));
        response.put("51-60", citizenEntityRepository.countAge(51,60));
        response.put("61-70", citizenEntityRepository.countAge(61,70));
        response.put("71-100", citizenEntityRepository.countAge(71,100));

        return new ResponseEntity(response,HttpStatus.OK);
    }

    @GetMapping("/statistics/month")
    public ResponseEntity statisticsMonth(){
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("Jan", citizenEntityRepository.countMonth(1));
        response.put("Feb", citizenEntityRepository.countMonth(2));
        response.put("Mar", citizenEntityRepository.countMonth(3));
        response.put("Apr", citizenEntityRepository.countMonth(4));
        response.put("May", citizenEntityRepository.countMonth(5));
        response.put("Jun", citizenEntityRepository.countMonth(6));
        response.put("Jul", citizenEntityRepository.countMonth(7));
        response.put("Aug", citizenEntityRepository.countMonth(8));
        response.put("Sep", citizenEntityRepository.countMonth(9));
        response.put("Oct", citizenEntityRepository.countMonth(10));
        response.put("Nov", citizenEntityRepository.countMonth(11));
        response.put("Dec", citizenEntityRepository.countMonth(12));

        return new ResponseEntity(response,HttpStatus.OK);
    }

    @GetMapping("/statistics/citizenship")
    public ResponseEntity statisticsCitizenship(){
        Map<String, Object> response = new LinkedHashMap<>();
        List<CitizenshipEntity> citizenships = citizenshipEntityRepository.findAll();
        for(CitizenshipEntity citizenshipEntity : citizenships)
            response.put(citizenshipEntity.getCountry(), citizenEntityRepository.countCitizenship(citizenshipEntity.getId()));

        return new ResponseEntity(response,HttpStatus.OK);
    }
}