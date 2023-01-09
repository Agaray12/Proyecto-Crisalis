package com.crisalis.project.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@DiscriminatorValue("Service")
@Data
public class AppService extends Good{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Boolean isSpecial;
}
