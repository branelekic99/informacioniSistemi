package com.example.backend.repositories;

import com.example.backend.models.entities.CitizenEntity;
import com.example.backend.models.entities.CityEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CityEntityRepository extends JpaRepository<CityEntity,Integer> {

    @Query(value = "select * from city where name = ?1", nativeQuery = true)
    CityEntity findByName(String name);
}
