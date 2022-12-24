package com.crisalis.project.controllers;

import com.crisalis.project.enums.Role;
import com.crisalis.project.models.AppUser;
import com.crisalis.project.models.dto.request.user.UserLoginRequest;
import com.crisalis.project.models.dto.request.user.UserRegisterRequest;
import com.crisalis.project.services.impl.UserAuthServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:8080")
public class AuthController {

    @Autowired
    private UserAuthServiceImpl userAuthService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequest userRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(userAuthService.loginUser(userRequest));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegisterRequest userRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userAuthService.register(userRequest));
    }

    @GetMapping("/users")
    private List<AppUser> getAllUsers (){
        return userAuthService.getAllUsers();
    }
}
