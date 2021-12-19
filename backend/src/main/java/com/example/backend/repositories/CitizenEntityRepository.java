package com.example.backend.repositories;

import com.example.backend.models.entities.CitizenEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CitizenEntityRepository extends JpaRepository<CitizenEntity,Integer> {
}
