package com.crisalis.project.mappers;

import com.crisalis.project.models.AppUser;
import com.crisalis.project.models.dto.request.user.UserRegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AppUser userRegisterToUser(UserRegisterRequest userRequest){
        AppUser user = new AppUser();
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setUsername(userRequest.getUsername());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        return user;
    }
}
