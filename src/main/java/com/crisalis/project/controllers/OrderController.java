package com.crisalis.project.controllers;

import com.crisalis.project.models.dto.request.order.OrderDetailRequest;
import com.crisalis.project.models.dto.request.order.OrderRequest;
import com.crisalis.project.models.dto.request.order.OrderSaveRequest;
import com.crisalis.project.models.dto.request.order.OrderUpdateRequest;
import com.crisalis.project.services.impl.OrderServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderServiceImpl orderService;

    @PostMapping("/item/create")
    public ResponseEntity<?> createOrderDetail(@RequestBody OrderDetailRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.createOrderDetail(request));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createOrder (@RequestBody OrderRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.createOrder(request));
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateOrder (@RequestBody OrderUpdateRequest request){
        return ResponseEntity.status(HttpStatus.OK).body(orderService.updateOrder(request));
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveOrder(@RequestBody OrderSaveRequest request){
        return ResponseEntity.status(HttpStatus.OK).body(orderService.saveOrder(request));
    }
}
