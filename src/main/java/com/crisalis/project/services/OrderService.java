package com.crisalis.project.services;

import com.crisalis.project.models.AppOrder;
import com.crisalis.project.models.OrderDetail;
import com.crisalis.project.models.Tax;
import com.crisalis.project.models.dto.request.order.OrderDetailRequest;
import com.crisalis.project.models.dto.request.order.OrderRequest;
import com.crisalis.project.models.dto.request.order.OrderUpdateRequest;
import com.crisalis.project.models.dto.response.order.OrderDetailResponse;
import com.crisalis.project.models.dto.response.order.OrderResponse;

import java.util.List;

public interface OrderService {

    public List<AppOrder> getAll();

    public OrderDetail findOrderDetailById (Integer id);

    public AppOrder findOrderById(Integer id);

    public Double calculateTaxes(List<Tax> taxes, Double totalPrice);

    public OrderDetailResponse createOrderDetail(OrderDetailRequest orderDetailRequest);

    public OrderResponse createOrder(OrderRequest request);

    public OrderResponse updateOrder(OrderUpdateRequest request);

    public OrderResponse saveOrder(Integer id);
}
