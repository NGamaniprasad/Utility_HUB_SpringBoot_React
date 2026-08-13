package com.utilityhub.dto;

import jakarta.validation.constraints.NotBlank;

public class AdminLoginRequest {

    @NotBlank(message = "Admin ID is required")
    private String adminId;

    @NotBlank(message = "Password is required")
    private String password;


    public String getAdminId() {
        return adminId;
    }

    public void setAdminId(String adminId) {
        this.adminId = adminId;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}