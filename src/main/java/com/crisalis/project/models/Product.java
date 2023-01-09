package com.crisalis.project.models;

import lombok.Data;
import org.springframework.lang.Nullable;

import javax.persistence.*;

@Entity
@DiscriminatorValue("Product")
@Data
public class Product extends Good{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Boolean hasWarranty;
    @Column(nullable = true)
    private Integer warrantyYears;
}
