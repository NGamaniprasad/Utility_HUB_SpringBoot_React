package com.utilityhub.dto;

public class AdminResponse {

    private String adminId;
    private String name;
    private String email;
    private String role;
    private boolean active;

    public AdminResponse(
            String adminId,
            String name,
            String email,
            String role,
            boolean active
    ) {
        this.adminId = adminId;
        this.name = name;
        this.email = email;
        this.role = role;
        this.active = active;
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

    public String getRole() {
        return role;
    }

    public boolean isActive() {
        return active;
    }
}