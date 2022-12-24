package com.crisalis.project.models.dto.request.user;

import lombok.Data;

@Data
public class UserRegisterRequest {
    private String firstName;
    private String lastName;
    private String username;
    private String password;
}
