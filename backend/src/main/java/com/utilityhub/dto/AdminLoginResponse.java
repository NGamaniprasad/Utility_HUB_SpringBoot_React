package com.utilityhub.dto;

public class AdminLoginResponse {

    private String message;
    private String token;
    private String adminId;
    private String name;
    private String role;

    public AdminLoginResponse(
            String message,
            String token,
            String adminId,
            String name,
            String role
    ) {
        this.message = message;
        this.token = token;
        this.adminId = adminId;
        this.name = name;
        this.role = role;
    }

    public String getMessage() {
        return message;
    }

    public String getToken() {
        return token;
    }

    public String getAdminId() {
        return adminId;
    }

    public String getName() {
        return name;
    }

    public String getRole() {
        return role;
    }
}