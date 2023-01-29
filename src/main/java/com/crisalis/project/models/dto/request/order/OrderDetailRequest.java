package com.crisalis.project.models.dto.request.order;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDetailRequest {
    private Integer orderId;
    private Integer goodId;
    private Integer quantity;
    private Boolean hasWarranty;
    private Integer warrantyYears;
}
