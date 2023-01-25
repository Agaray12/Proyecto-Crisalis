package com.crisalis.project.models.dto.response.client;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Date;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ClientResponse {
    private Integer id;
    private Boolean hasActiveService;
    private String clientType;

    private String cuit;
    private String companyName;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date startOfActivities;

    private Long dni;
    private String firstName;
    private String lastName;
}

