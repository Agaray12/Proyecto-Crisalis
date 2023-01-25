package com.crisalis.project.models.dto.request.order;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderUpdateRequest {
    Integer orderId;
    Integer orderDetailId;
}
