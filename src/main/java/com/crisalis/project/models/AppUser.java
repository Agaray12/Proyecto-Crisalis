package com.crisalis.project.models;

import com.crisalis.project.enums.Role;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "users")
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String username;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;
}
