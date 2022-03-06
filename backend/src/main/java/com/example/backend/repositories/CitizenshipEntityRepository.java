package com.example.backend.repositories;

import com.example.backend.models.entities.CitizenEntity;
import com.example.backend.models.entities.CitizenshipEntity;
import com.example.backend.models.entities.CityEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CitizenshipEntityRepository extends JpaRepository<CitizenshipEntity,Integer> {

    @Query(value = "select * from citizenship where id = ?1", nativeQuery = true)
    CitizenshipEntity findByIdentifier(Integer id);
}
