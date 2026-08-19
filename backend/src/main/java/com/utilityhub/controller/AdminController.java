

package com.utilityhub.controller;

import com.utilityhub.dto.AdminLoginRequest;
import com.utilityhub.dto.AdminLoginResponse;
import com.utilityhub.dto.AdminResponse;
import com.utilityhub.dto.AdminSetupRequest;
import com.utilityhub.dto.AdminSetupResponse;
import com.utilityhub.dto.CreateAdminRequest;
import com.utilityhub.dto.UpdateAdminRequest;
import com.utilityhub.service.AdminService;
import com.utilityhub.service.UserService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AdminService adminService;
    private final UserService userService;

    public AdminController(
            AdminService adminService,
            UserService userService
    ) {
        this.adminService = adminService;
        this.userService = userService;
    }

    // =========================================================
    // FIRST ADMIN SETUP
    // =========================================================

    @PostMapping("/setup")
    public ResponseEntity<AdminSetupResponse> setupFirstAdmin(
            @Valid @RequestBody AdminSetupRequest request
    ) {

        AdminSetupResponse response =
                adminService.createFirstAdmin(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // =========================================================
    // ADMIN LOGIN
    // =========================================================

    @PostMapping("/login")
    public ResponseEntity<AdminLoginResponse> login(
            @Valid @RequestBody AdminLoginRequest request
    ) {

        AdminLoginResponse response =
                adminService.login(request);

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // CREATE ADMIN
    // =========================================================

    @PostMapping("/create")
    public ResponseEntity<AdminSetupResponse> createAdmin(
            @Valid @RequestBody CreateAdminRequest request,
            Authentication authentication
    ) {

        if (!isSuperAdmin(authentication)) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .build();
        }

        AdminSetupResponse response =
                adminService.createAdmin(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // =========================================================
    // GET ALL ADMINS
    // =========================================================

    @GetMapping("/all")
    public ResponseEntity<List<AdminResponse>> getAllAdmins(
            Authentication authentication
    ) {

        if (!isSuperAdmin(authentication)) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .build();
        }

        return ResponseEntity.ok(
                adminService.getAllAdmins()
        );
    }

    // =========================================================
    // UPDATE ADMIN
    // =========================================================

    @PutMapping("/{adminId}")
    public ResponseEntity<AdminResponse> updateAdmin(
            @PathVariable String adminId,
            @Valid @RequestBody UpdateAdminRequest request,
            Authentication authentication
    ) {

        if (!isSuperAdmin(authentication)) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .build();
        }

        return ResponseEntity.ok(
                adminService.updateAdmin(
                        adminId,
                        request
                )
        );
    }

    // =========================================================
    // DELETE ADMIN
    // =========================================================

    @DeleteMapping("/{adminId}")
    public ResponseEntity<Void> deleteAdmin(
            @PathVariable String adminId,
            Authentication authentication
    ) {

        if (!isSuperAdmin(authentication)) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .build();
        }

        adminService.deleteAdmin(adminId);

        return ResponseEntity
                .noContent()
                .build();
    }

    // =========================================================
    // USER MANAGEMENT
    // =========================================================

    @GetMapping("/users")
    public ResponseEntity<List<UserService.UserManagementResponse>> getAllUsers(
            Authentication authentication
    ) {

        if (!isAdmin(authentication)) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .build();
        }

        return ResponseEntity.ok(
                userService.getAllUsers()
        );
    }

    // =========================================================
    // GET ONE USER
    // =========================================================

    @GetMapping("/users/{userId}")
    public ResponseEntity<UserService.UserManagementResponse> getUser(
            @PathVariable String userId,
            Authentication authentication
    ) {

        if (!isAdmin(authentication)) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .build();
        }

        return ResponseEntity.ok(
                userService.getUserForAdmin(userId)
        );
    }

    // =========================================================
    // UPDATE USER
    // =========================================================

    @PutMapping("/users/{userId}")
    public ResponseEntity<UserService.UserManagementResponse> updateUser(
            @PathVariable String userId,
            @RequestBody UserService.AdminUpdateUserRequest request,
            Authentication authentication
    ) {

        if (!isAdmin(authentication)) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .build();
        }

        return ResponseEntity.ok(
                userService.adminUpdateUser(
                        userId,
                        request
                )
        );
    }

    // =========================================================
    // ACTIVATE USER
    // =========================================================

    @PatchMapping("/users/{userId}/activate")
    public ResponseEntity<UserService.UserManagementResponse> activateUser(
            @PathVariable String userId,
            Authentication authentication
    ) {

        if (!isAdmin(authentication)) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .build();
        }

        return ResponseEntity.ok(
                userService.activateUser(userId)
        );
    }

    // =========================================================
    // DEACTIVATE USER
    // =========================================================

    @PatchMapping("/users/{userId}/deactivate")
    public ResponseEntity<UserService.UserManagementResponse> deactivateUser(
            @PathVariable String userId,
            Authentication authentication
    ) {

        if (!isAdmin(authentication)) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .build();
        }

        return ResponseEntity.ok(
                userService.deactivateUser(userId)
        );
    }

    // =========================================================
    // DELETE USER
    // =========================================================

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> deleteUser(
            @PathVariable String userId,
            Authentication authentication
    ) {

        if (!isAdmin(authentication)) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .build();
        }

        userService.deleteUser(userId);

        return ResponseEntity
                .noContent()
                .build();
    }

    // =========================================================
    // SUPER ADMIN CHECK
    // =========================================================

    private boolean isSuperAdmin(
            Authentication authentication
    ) {

        if (authentication == null ||
                !authentication.isAuthenticated()) {

            return false;
        }

        return authentication
                .getAuthorities()
                .stream()
                .anyMatch(authority ->
                        "ROLE_SUPER_ADMIN".equals(
                                authority.getAuthority()
                        )
                );
    }

    // =========================================================
    // ADMIN OR SUPER ADMIN CHECK
    // =========================================================

    private boolean isAdmin(
            Authentication authentication
    ) {

        if (authentication == null ||
                !authentication.isAuthenticated()) {

            return false;
        }

        return authentication
                .getAuthorities()
                .stream()
                .anyMatch(authority -> {

                    String role =
                            authority.getAuthority();

                    return "ROLE_ADMIN".equals(role)
                            || "ROLE_SUPER_ADMIN".equals(role);
                });
    }
}
