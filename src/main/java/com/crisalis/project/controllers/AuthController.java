package com.crisalis.project.controllers;

import com.crisalis.project.enums.Role;
import com.crisalis.project.models.AppUser;
import com.crisalis.project.models.dto.request.user.UserLoginRequest;
import com.crisalis.project.models.dto.request.user.UserRegisterRequest;
import com.crisalis.project.services.impl.UserAuthServiceImpl;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
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

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestParam String token){
        return ResponseEntity.status(HttpStatus.OK).body(userAuthService.validateToken(token));

    }

    @GetMapping("/users")
    private List<AppUser> getAllUsers (){
        return userAuthService.getAllUsers();
    }
}
