
package com.utilityhub.dto;

public class UserResponse {

    private String userId;
    private String name;
    private String email;
    private boolean active;

    public UserResponse(
            String userId,
            String name,
            String email,
            boolean active
    ) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.active = active;
    }

    public String getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public boolean isActive() {
        return active;
    }
}
