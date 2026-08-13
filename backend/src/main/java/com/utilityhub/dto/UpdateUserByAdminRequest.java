package com.utilityhub.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UpdateUserByAdminRequest {

    @NotBlank(message = "Name is required")
    @Size(
            max = 100,
            message = "Name must not exceed 100 characters"
    )
    private String name;


    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email address")
    @Size(
            max = 150,
            message = "Email must not exceed 150 characters"
    )
    private String email;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}