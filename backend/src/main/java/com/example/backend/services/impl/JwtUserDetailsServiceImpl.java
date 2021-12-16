package com.example.backend.services.impl;

import com.example.backend.models.dto.JwtUser;
import com.example.backend.repositories.UserEntityRepository;
import com.example.backend.services.JwtUserDetailsService;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsServiceImpl implements JwtUserDetailsService {

    private final UserEntityRepository userEntityRepository;
    private final ModelMapper modelMapper;

    public JwtUserDetailsServiceImpl(UserEntityRepository userEntityRepository, ModelMapper modelMapper) {
        this.userEntityRepository = userEntityRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public JwtUser loadUserByUsername(String username) throws UsernameNotFoundException {

        return modelMapper.map(userEntityRepository.findByUsername(username).
                orElseThrow(() -> new UsernameNotFoundException(username)), JwtUser.class);
    }
}