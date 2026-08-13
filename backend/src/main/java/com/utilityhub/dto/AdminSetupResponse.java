package com.utilityhub.dto;

public class AdminSetupResponse {

    private String message;
    private String adminId;
    private String name;
    private String email;

    public AdminSetupResponse(
            String message,
            String adminId,
            String name,
            String email
    ) {
        this.message = message;
        this.adminId = adminId;
        this.name = name;
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public String getAdminId() {
        return adminId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}