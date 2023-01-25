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

    private String status;
    private Company company;
    private Person person;
    private List<OrderDetail> orderDetails;
    private Double totalPrice;
    private Double totalPriceAfterTaxes;
}
