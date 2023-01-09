package com.crisalis.project.models.dto.request.client;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class ClientRequest {
    private Boolean hasActiveService;
    private String clientType;

    private String cuit;
    private String companyName;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private Date startOfActivities;

    private Long dni;
    private String firstName;
    private String lastName;
}
