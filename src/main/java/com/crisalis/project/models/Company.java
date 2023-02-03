package com.crisalis.project.models;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@DiscriminatorValue("Empresa")
@Data
public class Company extends Client{

    private String cuit;
    private String companyName;
    private Date startOfActivities;
/*    @OneToMany
    private List<Person> employees;*/
}