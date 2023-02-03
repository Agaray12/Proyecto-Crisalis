package com.crisalis.project.models.dto.response.client;

import com.crisalis.project.models.AppService;
import com.crisalis.project.models.Product;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ClientResponse {
    private Integer id;
    private Boolean hasActiveService;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<AppService> services;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<Product> products;
    private String type;
    private String clientType;
    private String cuit;
    private String companyName;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date startOfActivities;

    private Long dni;
    private String fullName;
    private String firstName;
    private String lastName;
}

