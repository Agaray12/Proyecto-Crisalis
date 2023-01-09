package com.crisalis.project.models.dto.response.good;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GoodResponse {
    private Integer id;
    private String name;
    private String description;
    private Double price;
    private String goodType;
    private Boolean isSpecial;
    private Boolean hasWarranty;
    private Integer warrantyYears;
}
