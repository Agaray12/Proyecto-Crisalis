package com.crisalis.project.models.dto.request.good;

import lombok.Data;

import java.util.List;

@Data
public class GoodRequest {
    private String name;
    private String description;
    private Double price;
    private List<String> taxNames;
    private String goodType;
    private Boolean isSpecial;
    private Boolean hasWarranty;
    private Integer warrantyYears;
}
