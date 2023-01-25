package com.crisalis.project.models.dto.request.order;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class OrderRequest {
    private Integer personId;
    private Integer companyId;
}
