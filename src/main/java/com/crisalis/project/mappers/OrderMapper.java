package com.crisalis.project.mappers;

import com.crisalis.project.models.*;
import com.crisalis.project.models.dto.request.order.OrderDetailRequest;
import com.crisalis.project.models.dto.response.order.OrderDetailResponse;
import com.crisalis.project.models.dto.response.order.OrderResponse;
import org.springframework.stereotype.Component;


@Component
public class OrderMapper {

    public OrderDetail orderDetailRequestToEntity(OrderDetailRequest orderDetailRequest,
                                                  AppOrder order, AppService service,
                                                  Product product,
                                                  Double price){
        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setService(service);
        orderDetail.setProduct(product);
        orderDetail.setOrder(order);
        orderDetail.setPrice(price);
        orderDetail.setQuantity(orderDetailRequest.getQuantity());
        orderDetail.setTotalPrice(price * orderDetailRequest.getQuantity());
        return orderDetail;
    }

    public OrderDetailResponse orderDetailEntityToResponse(OrderDetail orderDetailEntity) {
        OrderDetailResponse response = new OrderDetailResponse();
        response.setOrderDetailId(orderDetailEntity.getId());
        response.setService(orderDetailEntity.getService());
        response.setProduct(orderDetailEntity.getProduct());
        response.setQuantity(orderDetailEntity.getQuantity());
        response.setPrice(orderDetailEntity.getPrice());
        response.setTotalPrice(orderDetailEntity.getTotalPrice());
        response.setPriceAfterTaxes(orderDetailEntity.getPriceAfterTaxes());
        return response;
    }

    public AppOrder orderRequestToEntity(Person person, Company company) {
        AppOrder order = new AppOrder();
        order.setStatus("PENDIENTE");
        order.setPerson(person);
        order.setCompany(company);
        return order;
    }

    public OrderResponse orderEntityToResponse(AppOrder orderEntity) {
        OrderResponse response = new OrderResponse();
        response.setCompany(orderEntity.getCompany());
        response.setPerson(orderEntity.getPerson());
        response.setStatus(orderEntity.getStatus());
        response.setOrderDetails(orderEntity.getOrderDetails());
        response.setTotalPrice(orderEntity.getTotalPrice());
        response.setTotalPriceAfterTaxes(orderEntity.getTotalPriceAfterTaxes());
        return response;
    }
}
