package com.crisalis.project.services.impl;

import com.crisalis.project.mappers.GoodMapper;
import com.crisalis.project.mappers.OrderMapper;
import com.crisalis.project.models.*;
import com.crisalis.project.models.dto.request.order.OrderDetailRequest;
import com.crisalis.project.models.dto.request.order.OrderRequest;
import com.crisalis.project.models.dto.request.order.OrderSaveRequest;
import com.crisalis.project.models.dto.request.order.OrderUpdateRequest;
import com.crisalis.project.models.dto.response.good.GoodResponse;
import com.crisalis.project.models.dto.response.order.OrderDetailResponse;
import com.crisalis.project.models.dto.response.order.OrderResponse;
import com.crisalis.project.repositories.OrderDetailRepository;
import com.crisalis.project.repositories.OrderRepository;
import org.hibernate.ObjectNotFoundException;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl {

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private ClientServiceImpl clientService;

    @Autowired
    private GoodServiceImpl goodService;

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private OrderDetailRepository orderDetailRepo;

    public List<AppOrder> getAll(){
        return orderRepo.findAll();
    }

    public OrderDetail findOrderDetailById (Integer id){
        return orderDetailRepo.findById(id).orElse(null);
    }

    public AppOrder findOrderById(Integer id){
        return orderRepo.findById(id).orElse(null);
    }

    public Double calculateTaxes(List<Tax> taxes, Double totalPrice){
        Double basePrice = totalPrice;
        for (Tax tax:
             taxes) {
            totalPrice += basePrice * ((tax.getPercentage() / 100));
        }
        return totalPrice;
    }


    public OrderDetailResponse createOrderDetail(OrderDetailRequest orderDetailRequest){

        AppOrder order = findOrderById(orderDetailRequest.getOrderId());
        if(order == null || order.getStatus().equals("REALIZADO")){
            return null;
        }

        Optional<AppService> serviceOpt = goodService.findServiceById(orderDetailRequest.getGoodId());
        if(serviceOpt.isPresent()){
            AppService service = serviceOpt.get();
            OrderDetail orderDetail = orderMapper.orderDetailRequestToEntity(
                    orderDetailRequest,
                    order,
                    service,
                    null,
                    service.getPrice());
            Double priceAfterTaxes = calculateTaxes(service.getTaxes(), orderDetail.getTotalPrice());
            orderDetail.setPriceAfterTaxes(priceAfterTaxes);
            OrderDetail orderDetailEntity = orderDetailRepo.save(orderDetail);
            return  orderMapper.orderDetailEntityToResponse(orderDetailEntity);
        }
        Optional<Product> productOpt = goodService.findProductById(orderDetailRequest.getGoodId());

        if(productOpt.isPresent()){
            Product product = productOpt.get();
            OrderDetail orderDetail = orderMapper.orderDetailRequestToEntity(
                    orderDetailRequest,
                    order,
                    null,
                    product,
                    product.getPrice());
            Double priceAfterTaxes = calculateTaxes(product.getTaxes(), orderDetail.getTotalPrice());
            orderDetail.setPriceAfterTaxes(priceAfterTaxes);
            OrderDetail orderDetailEntity = orderDetailRepo.save(orderDetail);
            return  orderMapper.orderDetailEntityToResponse(orderDetailEntity);
        }

        return null;
    }

    public OrderResponse createOrder(OrderRequest request) {

        if(request.getCompanyId() == null){
            Optional<Person> personOpt = clientService.findPersonById(request.getPersonId());
            if (personOpt.isPresent()){
                Person person = personOpt.get();
                AppOrder order = orderMapper.orderRequestToEntity(person, null);
                AppOrder orderEntity = orderRepo.save(order);
                return orderMapper.orderEntityToResponse(orderEntity);
            }
            return null;
        }

        Optional<Company> companyOpt = clientService.findCompanyById(request.getCompanyId());

        if (companyOpt.isPresent()){
            Optional<Person> personOpt = clientService.findPersonById(request.getPersonId());
            if (personOpt.isPresent()){
                Company company = companyOpt.get();
                Person person = personOpt.get();

                AppOrder order = orderMapper.orderRequestToEntity(person, company);
                AppOrder orderEntity = orderRepo.save(order);
                return orderMapper.orderEntityToResponse(orderEntity);
            }
        }

        return null;
    }

    public OrderResponse updateOrder(OrderUpdateRequest request) {
        OrderDetail orderDetail = findOrderDetailById(request.getOrderDetailId());
        AppOrder order = findOrderById(request.getOrderId());

        if(orderDetail == null || order == null || order.getStatus().equals("REALIZADO")){
            return null;
        }

        List<OrderDetail> orderDetailList = order.getOrderDetails();
        orderDetailList.add(orderDetail);

        Double totalPrice = order.getTotalPrice() + orderDetail.getTotalPrice();
        Double totalPriceAfterTaxes = order.getTotalPriceAfterTaxes() + orderDetail.getPriceAfterTaxes();

        order.setTotalPrice(totalPrice);
        order.setTotalPriceAfterTaxes(totalPriceAfterTaxes);

        order.setOrderDetails(orderDetailList);
        return orderMapper.orderEntityToResponse(orderRepo.save(order));
    }

    public OrderResponse saveOrder(OrderSaveRequest request) {
        AppOrder order = findOrderById(request.getOrderId());
        order.setStatus("REALIZADO");
        return orderMapper.orderEntityToResponse(orderRepo.save(order));
    }
}
