package com.crisalis.project.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@DiscriminatorValue("Person")
@Data
public class Person extends Client{

    private Long dni;
    private String firstName;
    private String lastName;
}