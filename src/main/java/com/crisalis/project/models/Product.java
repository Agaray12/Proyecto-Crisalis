package com.crisalis.project.models;

import lombok.Data;
import org.springframework.lang.Nullable;

import javax.persistence.*;

@Entity
@DiscriminatorValue("Product")
@Data
public class Product extends Good{

    private Boolean hasWarranty;
    @Column(nullable = true)
    private Integer warrantyYears;
}
