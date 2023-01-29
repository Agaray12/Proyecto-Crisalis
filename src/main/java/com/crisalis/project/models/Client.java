package com.crisalis.project.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "client_type")
@Table(name = "clients")
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToMany(
            fetch = FetchType.LAZY
    )
    private List<Product> products;
    @ManyToMany(
            fetch = FetchType.LAZY
    )
    private List<AppService> services;
    private Boolean hasActiveService;
}