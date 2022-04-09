package com.example.backend.repositories;

import com.example.backend.models.dto.CitizenMapDTO;
import com.example.backend.models.entities.CitizenEntity;
import com.example.backend.models.enums.Sex;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CitizenEntityRepository extends JpaRepository<CitizenEntity,Integer> {

    @Query(value = "select * from citizen where city_id = ?1", nativeQuery = true)
    Page<CitizenEntity> findByCity(Integer city_id, Pageable pageable);

    @Query(value = "select * from citizen where education = ?1", nativeQuery = true)
    Page<CitizenEntity> findByEducation(String education, Pageable pageable);

    @Query(value = "select * from citizen where firstname = ?1 and lastname= ?2", nativeQuery = true)
    Page<CitizenEntity> findByName(String firstName, String lastname, Pageable pageable);

    @Query(nativeQuery = true, value = "select * from citizen_map_view")
    List<CitizenMapDTO> getCitizenMapDTOs();

    @Query(nativeQuery = true, value = "select count(id) FROM citizen where sex=?")
    int countSex(String sex);

    @Query(nativeQuery = true, value = "select count(id) from citizen where year_of_arrival between ?1 and ?2")
    int countArrival(int first_year, int second_year);

    @Query(nativeQuery = true, value = "select count(id) from citizen where month(t_create)=?")
    int countMonth(int month);

    @Query(nativeQuery = true, value = "select count(id) from citizen where (year(now())-year_of_birth) between ?1 and ?2")
    int countAge(int first_year, int second_year);

    @Query(nativeQuery = true, value = "select count(id) from citizen where citizenship_id=?")
    int countCitizenship(int citizenship_id);
    @Query(value = "select * from citizen where year_of_birth = ?1", nativeQuery = true)
    Page<CitizenEntity> findByYearOfBirth(String year_of_birth, Pageable pageable);
}