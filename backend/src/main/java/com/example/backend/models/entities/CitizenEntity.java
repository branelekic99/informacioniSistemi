package com.example.backend.models.entities;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.*;

import javax.persistence.*;

@Data
@Entity(name = "citizen")
public class CitizenEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Basic
    @Column(name = "firstname", nullable = false, length = 45)
    private String firstname;
    @Basic
    @Column(name = "lastname", nullable = false, length = 45)
    private String lastname;
    @Basic
    @Column(name = "email", nullable = false, length = 100)
    private String email;
    @Basic
    @Column(name = "phone", nullable = false, length = 45)
    private String phone;
    @Basic
    @Column(name = "city", nullable = false, length = 45)
    private String city;
    @Basic
    @Column(name = "company", nullable = false, length = 45)
    private String company;
    @Basic
    @Column(name = "year", nullable = false, length = 45)
    private String year;
    @Basic
    @Column(name = "num_of_family_members", nullable = false)
    private String num_of_family_members;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workplace_id", referencedColumnName = "id", nullable = true)
    private WorkplaceEntity workplaceEntity;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "citizenship_id", referencedColumnName = "id", nullable = true)
    private CitizenshipEntity citizenshipEntity;
}
