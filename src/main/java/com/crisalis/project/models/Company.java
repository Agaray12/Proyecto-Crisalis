package com.crisalis.project.models;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@DiscriminatorValue("Company")
@Data
public class Company extends Client{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String cuit;
    private String companyName;
    private Date startOfActivities;
/*    @OneToMany
    private List<Person> employees;*/
}