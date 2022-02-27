package com.example.backend.repositories;

import com.example.backend.models.entities.CitizenEntity;
import com.example.backend.models.entities.CityEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.List;

public interface CitizenEntityRepository extends JpaRepository<CitizenEntity,Integer> {

    @Query(value = "select * from citizen where city_id = ?1", nativeQuery = true)
    Page<CitizenEntity> findByCity(Integer city_id, Pageable pageable);

    @Query(value = "select * from citizen where education = ?1", nativeQuery = true)
    Page<CitizenEntity> findByEducation(String education, Pageable pageable);

    @Query(value = "select * from citizen where firstname = ?1 and lastname= ?2", nativeQuery = true)
    Page<CitizenEntity> findByName(String firstName, String lastname, Pageable pageable);
}