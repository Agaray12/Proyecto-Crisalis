package com.crisalis.project.models.dto.response.order;

import com.crisalis.project.models.Client;
import com.crisalis.project.models.Company;
import com.crisalis.project.models.OrderDetail;
import com.crisalis.project.models.Person;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrderResponse {

    private Integer id;
    private String status;
    private String clientType;
    private String companyName;
    private String personName;
    private List<OrderDetail> orderDetails;
    private Double totalPrice;
    private Double totalPriceAfterTaxes;
    private Double finalPrice;
}
