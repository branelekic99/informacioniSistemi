package com.example.backend.services.impl;

import com.example.backend.base.CrudJpaService;
import com.example.backend.models.entities.UserEntity;
import com.example.backend.models.enums.Role;
import com.example.backend.repositories.UserEntityRepository;
import com.example.backend.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl extends CrudJpaService<UserEntity, Integer> implements UserService {

    private final UserEntityRepository repository;

    private final PasswordEncoder passwordEncoder;


    @Value("${authorization.default.username:}")
    private String defaultUsername;
    @Value("${authorization.default.first-name:}")
    private String defaultFirstName;
    @Value("${authorization.default.last-name:}")
    private String defaultLastName;
    @Value("${authorization.default.password:}")
    private String defaultPassword;
    @Value("${authorization.default.email:}")
    private String defaultEmail;



    public UserServiceImpl(UserEntityRepository repository, ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
        super(repository, modelMapper, UserEntity.class);
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void postConstruct() {
        if (repository.count() == 0) {
            UserEntity userEntity = new UserEntity();
            userEntity.setUsername(defaultUsername);
            userEntity.setPassword(passwordEncoder.encode(defaultPassword));
            userEntity.setEmail(defaultEmail);
            userEntity.setFirstname(defaultFirstName);
            userEntity.setLastname(defaultLastName);
            userEntity.setRole(Role.ADMIN);
            repository.saveAndFlush(userEntity);
        }
    }






}