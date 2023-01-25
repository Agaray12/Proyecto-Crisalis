package com.crisalis.project.models.dto.response.order;

import com.crisalis.project.models.AppService;
import com.crisalis.project.models.Product;
import com.crisalis.project.models.dto.response.good.GoodResponse;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrderDetailResponse {

    private Integer orderDetailId;
    private Product product;
    private AppService service;
    private Integer quantity;
    private Double price;
    private Double totalPrice;
}
