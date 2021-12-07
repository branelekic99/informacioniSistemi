package com.example.backend.models.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity(name = "citizenship")
public class CitizenshipEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Basic
    @Column(name = "country", nullable = false, length = 45)
    private String country;
    @OneToMany(mappedBy = "citizenshipEntity")
    @JsonIgnore
    private List<CitizenEntity> citizenEntities;

}