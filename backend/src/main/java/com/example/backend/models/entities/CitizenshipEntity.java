package com.example.backend.models.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
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


    public CitizenshipEntity(){
    }

    public CitizenshipEntity(Integer id, String country){
        this.id = id;
        this.country = country;
    }

    public CitizenshipEntity(Integer id){
        this.id = id;
    }

}