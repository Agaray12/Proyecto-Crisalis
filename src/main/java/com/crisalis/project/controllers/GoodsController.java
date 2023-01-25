package com.crisalis.project.controllers;

import com.crisalis.project.models.dto.request.good.GoodRequest;
import com.crisalis.project.services.impl.GoodServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/goods")
public class GoodsController {

    @Autowired
    private GoodServiceImpl goodService;

    @PostMapping("/create")
    public ResponseEntity<?> createGood(@RequestBody GoodRequest goodRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(goodService.createGood(goodRequest));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateGood(@PathVariable Integer id, @RequestBody GoodRequest goodRequest){
        return ResponseEntity.status(HttpStatus.OK).body(goodService.updateGood(id, goodRequest));
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getAllGoods(){
        return ResponseEntity.status(HttpStatus.OK).body(goodService.getAll());
    }
}
