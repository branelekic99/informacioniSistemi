package com.example.backend.models.entities;


import com.example.backend.base.BaseEntity;
import com.example.backend.models.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity(name = "city")
public class CityEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Basic
    @Column(name = "name", nullable = false, length = 45)
    private String name;
    @Basic
    @Column(name = "latitude", nullable = false)
    private long latitude;
    @Basic
    @Column(name = "longitude", nullable = false)
    private String longitude;
    @OneToMany(mappedBy = "cityEntity")
    @JsonIgnore
    private List<CitizenEntity> citizenEntities;


}
