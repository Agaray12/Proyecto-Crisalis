package com.crisalis.project.models.dto.request.tax;

import lombok.Data;

@Data
public class TaxRequest {
    private String name;
    private Double percentage;
}
