package com.crisalis.project.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@DiscriminatorValue("Persona")
@Data
public class Person extends Client{

    private Long dni;
    private String firstName;
    private String lastName;
}