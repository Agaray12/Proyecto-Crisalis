package com.crisalis.project.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorMessage extends RuntimeException{
    private int statusCode;
    private String exception;
    private String message;
    private String path;


    public ErrorMessage (Exception exception, String path, int statusCode){
        this.statusCode = statusCode;
        this.exception = exception.getClass().getSimpleName();
        this.message = exception.getMessage();
        this.path = path;
    }
}
