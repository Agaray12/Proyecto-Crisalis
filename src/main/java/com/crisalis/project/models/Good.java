package com.crisalis.project.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "good_type")
@Table(name = "goods")
@Data
public class Good {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String description;
    private Double price;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Tax> taxes;
}
