package com.example.backend.models.entities;

import com.example.backend.models.enums.Sex;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name= "citizen")
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
    @Column(name = "company", nullable = false, length = 45)
    private String company;
    @Basic
    @Column(name = "year_of_birth", nullable = false, length = 45)
    private String year_of_birth;
    @Basic
    @Column(name = "year_of_arrival", nullable = false, length = 45)
    private String year_of_arrival;
    @Basic
    @Column(name = "education", nullable = false, length = 100)
    private String education;
    @Basic
    @Column(name = "workplace", nullable = false, length = 100)
    private String workplace;
    @Basic
    @Column(name = "other", length = 1000)
    private String other;
    @Basic
    @Column(name = "num_of_family_members", nullable = false)
    private String num_of_family_members;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "citizenship_id", referencedColumnName = "id", nullable = false)
    private CitizenshipEntity citizenshipEntity;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id", referencedColumnName = "id", nullable = false)
    private CityEntity cityEntity;
    @Enumerated(value=EnumType.STRING)
    @Column(name="sex")
    private Sex sex;
    @Column(name="t_create")
    public Date t_create;
}
