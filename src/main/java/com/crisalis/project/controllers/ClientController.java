package com.crisalis.project.controllers;

import com.crisalis.project.models.dto.request.client.ClientRequest;
import com.crisalis.project.services.impl.ClientServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/client")
public class ClientController {

    @Autowired
    private ClientServiceImpl clientService;

    @GetMapping("/get-all")
    public ResponseEntity<?> getAllClientsByType(@RequestParam String clientType){
        return ResponseEntity.status(HttpStatus.OK).body(clientService.getAllByType(clientType));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createClient(@RequestBody ClientRequest clientRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(clientService.createClient(clientRequest));
    }
}
