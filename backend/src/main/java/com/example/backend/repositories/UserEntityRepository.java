package com.example.backend.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.models.entities.UserEntity;

import java.util.Optional;

public interface UserEntityRepository extends JpaRepository<UserEntity, Integer> {

    Optional<UserEntity> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByUsernameAndIdNot(String username, Integer id);
}