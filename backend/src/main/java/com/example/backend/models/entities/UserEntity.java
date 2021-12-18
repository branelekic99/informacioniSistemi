package com.example.backend.models.entities;


import com.example.backend.base.BaseEntity;
import com.example.backend.models.enums.Role;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity(name = "user")
public class UserEntity implements BaseEntity<Integer> {
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
    @Column(name = "username", nullable = false, length = 100)
    private String username;
    @Basic
    @Column(name = "password", nullable = false, length = 100)
    private String password;
    @Basic
    @Column(name = "email", nullable = false, length = 100)
    private String email;
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "rola", nullable = false)
    private Role role;

}
