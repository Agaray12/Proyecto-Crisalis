package com.crisalis.project.models.dto.request.good;

import lombok.Data;

@Data
public class GoodRequest {
    private String name;
    private String description;
    private Double price;
    private String goodType;
    private Boolean isSpecial;
    private Boolean hasWarranty;
    private Integer warrantyYears;
}
