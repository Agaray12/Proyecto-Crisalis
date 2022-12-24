package com.crisalis.project.models.dto.response.jwt;

import lombok.Data;

@Data
public class JwtResponse {
    private String accessToken;
    private String tokenType = "Bearer";

    public JwtResponse(String accessToken){
        this.accessToken = accessToken;
    }

    public JwtResponse(String accessToken, String tokenType){
        this.accessToken = accessToken;
        this.tokenType = tokenType;
    }
}
