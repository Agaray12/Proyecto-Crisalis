package com.crisalis.project.services.impl;

import com.crisalis.project.enums.Role;
import com.crisalis.project.mappers.UserMapper;
import com.crisalis.project.models.AppUser;
import com.crisalis.project.models.dto.request.user.UserLoginRequest;
import com.crisalis.project.models.dto.request.user.UserRegisterRequest;
import com.crisalis.project.models.dto.response.jwt.JwtResponse;
import com.crisalis.project.repositories.UserRepository;
import com.crisalis.project.services.UserAuthService;
import com.crisalis.project.utils.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserAuthServiceImpl implements UserAuthService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    public List<AppUser> getAllUsers(){
        return userRepo.findAll();
    }

    @Override
    public AppUser register(UserRegisterRequest userRequest) {
        AppUser user = userMapper.userRegisterToUser(userRequest);
        user.setRole(Role.USER);
        return userRepo.save(user);
    }

    @Override
    public JwtResponse loginUser(UserLoginRequest userRequest) {
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userRequest.getUsername(), userRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(auth);
        AppUser user = userRepo.findByUsername(auth.getName());
        String token = jwtUtils.generateToken(user);
        return new JwtResponse(token);
    }


}
