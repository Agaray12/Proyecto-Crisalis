package com.crisalis.project.services;

import com.crisalis.project.models.AppUser;
import com.crisalis.project.models.dto.request.user.UserLoginRequest;
import com.crisalis.project.models.dto.request.user.UserRegisterRequest;
import com.crisalis.project.models.dto.response.jwt.JwtResponse;

import java.util.List;

public interface UserAuthService {

    public List<AppUser>getAllUsers();

    public AppUser register(UserRegisterRequest userRequest);

    public JwtResponse loginUser(UserLoginRequest userRequest);

    public Boolean validateToken(String token);

}
