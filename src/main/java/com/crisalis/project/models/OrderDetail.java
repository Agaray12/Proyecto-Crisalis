package com.crisalis.project.models;

import com.crisalis.project.models.dto.response.good.GoodResponse;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders_detail")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private AppService service;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private AppOrder order;
    private Integer quantity;
    private Double price = (double) 0;
    private Double totalPrice = (double) 0;
    private Double priceAfterTaxes = (double) 0;
    private Double extraCost = (double) 0;
    private Double finalItemPrice = (double) 0;
}
