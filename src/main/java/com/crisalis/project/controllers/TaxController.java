package com.crisalis.project.controllers;

import com.crisalis.project.models.dto.request.tax.TaxRequest;
import com.crisalis.project.services.impl.TaxServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tax")
public class TaxController {

    @Autowired
    private TaxServiceImpl taxService;

    @PostMapping("/create")
    public ResponseEntity<?> createTax(@RequestBody TaxRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(taxService.createTax(request));
    }
}
