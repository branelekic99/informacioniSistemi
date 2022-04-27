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
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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
    private final RestTemplate restTemplate;


    public CitizenController(CitizenEntityRepository citizenEntityRepository, CityEntityRepository cityEntityRepository, EntityManager entityManager, CitizenshipEntityRepository citizenshipEntityRepository, ModelMapper modelMapper, RestTemplate restTemplate) {
        this.citizenEntityRepository = citizenEntityRepository;
        this.cityEntityRepository = cityEntityRepository;
        this.entityManager = entityManager;
        this.citizenshipEntityRepository = citizenshipEntityRepository;
        this.modelMapper = modelMapper;
        this.restTemplate = restTemplate;
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
            @RequestParam(required = false) Integer year_of_birth,
            @RequestParam(required = false) Integer year_of_arrival,
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
                    education(education).cityEntity(city).workplace(workplace).build(),
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

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    CitizenEntity save(@RequestBody CitizenRequest citizenRequest,@RequestParam(name="g-recaptcha-response") String captchaResponse) {
        String url = "https://www.google.com/recaptcha/api/siteverify";
        String params = "?secret=dodajtoken&response="+captchaResponse;
        ReCaptchaResponse reCaptchaResponse = restTemplate.exchange(url+params, HttpMethod.POST,null,ReCaptchaResponse.class).getBody();



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
        else if(!reCaptchaResponse.isSuccess())
            throw new InvalidRequestException("Invalid request, there si no confirmation od a human.");
        citizen.setT_create(new Date());

            return citizenEntityRepository.save(citizen);

    }

    @GetMapping("/map")
    List<CitizenMapDTO> citizensForMap(){
        return citizenEntityRepository.getCitizenMapDTOs();

    }
}