package com.example.backend.models.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity(name = "workplace")
public class WorkplaceEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Basic
    @Column(name = "name", nullable = false, length = 45)
    private String name;
    @OneToMany(mappedBy = "workplaceEntity")
    @JsonIgnore
    private List<CitizenEntity> citizenEntities;

    public WorkplaceEntity(){

    }
    public WorkplaceEntity(Integer id, String name){
        this.id = id;
        this.name = name;
    }
}
