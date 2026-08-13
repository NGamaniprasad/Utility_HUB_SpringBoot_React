//
//
//package com.utilityhub.controller;
//
//import com.utilityhub.dto.AdminLoginRequest;
//import com.utilityhub.dto.AdminLoginResponse;
//import com.utilityhub.dto.AdminResponse;
//import com.utilityhub.dto.AdminSetupRequest;
//import com.utilityhub.dto.AdminSetupResponse;
//import com.utilityhub.dto.CreateAdminRequest;
//import com.utilityhub.dto.UpdateAdminRequest;
//import com.utilityhub.service.AdminService;
//
//import jakarta.validation.Valid;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/admin")
//@CrossOrigin(origins = "http://localhost:5173")
//public class AdminController {
//
//    private final AdminService adminService;
//
//    public AdminController(AdminService adminService) {
//        this.adminService = adminService;
//    }
//
//
//    // ==========================================
//    // FIRST ADMIN SETUP
//    // ==========================================
//
//    @PostMapping("/setup")
//    public ResponseEntity<AdminSetupResponse> setupFirstAdmin(
//            @Valid @RequestBody AdminSetupRequest request
//    ) {
//
//        AdminSetupResponse response =
//                adminService.createFirstAdmin(request);
//
//        return ResponseEntity
//                .status(HttpStatus.CREATED)
//                .body(response);
//    }
//
//
//    // ==========================================
//    // ADMIN LOGIN
//    // ==========================================
//
//    @PostMapping("/login")
//    public ResponseEntity<AdminLoginResponse> login(
//            @Valid @RequestBody AdminLoginRequest request
//    ) {
//
//        AdminLoginResponse response =
//                adminService.login(request);
//
//        return ResponseEntity.ok(response);
//    }
//
//
//    // ==========================================
//    // CREATE ADMIN
//    // ==========================================
//
//    @PostMapping("/create")
//    public ResponseEntity<AdminSetupResponse> createAdmin(
//            @Valid @RequestBody CreateAdminRequest request,
//            Authentication authentication
//    ) {
//
//        if (!isSuperAdmin(authentication)) {
//            return ResponseEntity
//                    .status(HttpStatus.FORBIDDEN)
//                    .build();
//        }
//
//        AdminSetupResponse response =
//                adminService.createAdmin(request);
//
//        return ResponseEntity
//                .status(HttpStatus.CREATED)
//                .body(response);
//    }
//
//
//    // ==========================================
//    // GET ALL ADMINS
//    // ==========================================
//
//    @GetMapping("/all")
//    public ResponseEntity<List<AdminResponse>> getAllAdmins(
//            Authentication authentication
//    ) {
//
//        if (!isSuperAdmin(authentication)) {
//            return ResponseEntity
//                    .status(HttpStatus.FORBIDDEN)
//                    .build();
//        }
//
//        List<AdminResponse> admins =
//                adminService.getAllAdmins();
//
//        return ResponseEntity.ok(admins);
//    }
//
//
//    // ==========================================
//    // UPDATE ADMIN
//    // ==========================================
//
//    @PutMapping("/{adminId}")
//    public ResponseEntity<AdminResponse> updateAdmin(
//            @PathVariable String adminId,
//            @Valid @RequestBody UpdateAdminRequest request,
//            Authentication authentication
//    ) {
//
//        if (!isSuperAdmin(authentication)) {
//            return ResponseEntity
//                    .status(HttpStatus.FORBIDDEN)
//                    .build();
//        }
//
//        AdminResponse response =
//                adminService.updateAdmin(
//                        adminId,
//                        request
//                );
//
//        return ResponseEntity.ok(response);
//    }
//
//
//    // ==========================================
//    // DELETE ADMIN
//    // ==========================================
//
//    @DeleteMapping("/{adminId}")
//    public ResponseEntity<Void> deleteAdmin(
//            @PathVariable String adminId,
//            Authentication authentication
//    ) {
//
//        if (!isSuperAdmin(authentication)) {
//            return ResponseEntity
//                    .status(HttpStatus.FORBIDDEN)
//                    .build();
//        }
//
//        adminService.deleteAdmin(adminId);
//
//        return ResponseEntity.noContent().build();
//    }
//
//
//    // ==========================================
//    // SUPER ADMIN CHECK
//    // ==========================================
//
//    private boolean isSuperAdmin(
//            Authentication authentication
//    ) {
//
//        if (authentication == null ||
//                !authentication.isAuthenticated()) {
//
//            return false;
//        }
//
//        return authentication
//                .getAuthorities()
//                .stream()
//                .anyMatch(authority ->
//                        "ROLE_SUPER_ADMIN".equals(
//                                authority.getAuthority()
//                        )
//                );
//    }
//}
//
//package com.utilityhub.controller;
//
//import com.utilityhub.dto.AdminLoginRequest;
//import com.utilityhub.dto.AdminLoginResponse;
//import com.utilityhub.dto.AdminResponse;
//import com.utilityhub.dto.AdminSetupRequest;
//import com.utilityhub.dto.AdminSetupResponse;
//import com.utilityhub.dto.CreateAdminRequest;
//import com.utilityhub.dto.UpdateAdminRequest;
//import com.utilityhub.service.AdminService;
//import com.utilityhub.service.UserService;
//
//import jakarta.validation.Valid;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/admin")
//@CrossOrigin(origins = "http://localhost:5173")
//public class AdminController {
//
//    private final AdminService adminService;
//    private final UserService userService;
//
//
//    public AdminController(
//            AdminService adminService,
//            UserService userService
//    ) {
//
//        this.adminService = adminService;
//        this.userService = userService;
//    }
//
//
//    // =========================================================
//    // FIRST ADMIN SETUP
//    // =========================================================
//
//    @PostMapping("/setup")
//    public ResponseEntity<AdminSetupResponse> setupFirstAdmin(
//            @Valid @RequestBody AdminSetupRequest request
//    ) {
//
//        AdminSetupResponse response =
//                adminService.createFirstAdmin(request);
//
//        return ResponseEntity
//                .status(HttpStatus.CREATED)
//                .body(response);
//    }
//
//
//    // =========================================================
//    // ADMIN LOGIN
//    // =========================================================
//
//    @PostMapping("/login")
//    public ResponseEntity<AdminLoginResponse> login(
//            @Valid @RequestBody AdminLoginRequest request
//    ) {
//
//        AdminLoginResponse response =
//                adminService.login(request);
//
//        return ResponseEntity.ok(response);
//    }
//
//
//    // =========================================================
//    // CREATE ADMIN
//    // =========================================================
//
//    @PostMapping("/create")
//    public ResponseEntity<AdminSetupResponse> createAdmin(
//            @Valid @RequestBody CreateAdminRequest request,
//            Authentication authentication
//    ) {
//
//        if (!isSuperAdmin(authentication)) {
//
//            return ResponseEntity
//                    .status(HttpStatus.FORBIDDEN)
//                    .build();
//        }
//
//        AdminSetupResponse response =
//                adminService.createAdmin(request);
//
//        return ResponseEntity
//                .status(HttpStatus.CREATED)
//                .body(response);
//    }
//
//
//    // =========================================================
//    // GET ALL ADMINS
//    // =========================================================
//
//    @GetMapping("/all")
//    public ResponseEntity<List<AdminResponse>> getAllAdmins(
//            Authentication authentication
//    ) {
//
//        if (!isSuperAdmin(authentication)) {
//
//            return ResponseEntity
//                    .status(HttpStatus.FORBIDDEN)
//                    .build();
//        }
//
//        List<AdminResponse> admins =
//                adminService.getAllAdmins();
//
//        return ResponseEntity.ok(admins);
//    }
//
//
//    // =========================================================
//    // UPDATE ADMIN
//    // =========================================================
//
//    @PutMapping("/{adminId}")
//    public ResponseEntity<AdminResponse> updateAdmin(
//            @PathVariable String adminId,
//            @Valid @RequestBody UpdateAdminRequest request,
//            Authentication authentication
//    ) {
//
//        if (!isSuperAdmin(authentication)) {
//
//            return ResponseEntity
//                    .status(HttpStatus.FORBIDDEN)
//                    .build();
//        }
//
//        AdminResponse response =
//                adminService.updateAdmin(
//                        adminId,
//                        request
//                );
//
//        return ResponseEntity.ok(response);
//    }
//
//
//    // =========================================================
//    // DELETE ADMIN
//    // =========================================================
//
//    @DeleteMapping("/{adminId}")
//    public ResponseEntity<Void> deleteAdmin(
//            @PathVariable String adminId,
//            Authentication authentication
//    ) {
//
//        if (!isSuperAdmin(authentication)) {
//
//            return ResponseEntity
//                    .status(HttpStatus.FORBIDDEN)
//                    .build();
//        }
//
//        adminService.deleteAdmin(adminId);
//
//        return ResponseEntity
//                .noContent()
//                .build();
//    }
//
//
//    // =========================================================
//    // USER MANAGEMENT
//    // =========================================================
//
//
//    // ---------------------------------------------------------
//    // GET ALL USERS
//    // ---------------------------------------------------------
//
//    @GetMapping("/users")
//    public ResponseEntity<List<UserService.UserManagementResponse>>
//    getAllUsers(
//            Authentication authentication
//    ) {
//
//        if (!isAdmin(authentication)) {
//
//            return ResponseEntity
//                    .status(HttpStatus.FORBIDDEN)
//                    .build();
//        }
//
//        return ResponseEntity.ok(
//                userService.getAllUsers()
//        );
//    }
//
//
//    // ---------------------------------------------------------
//    // GET ONE USER
//    // ---------------------------------------------------------
//
//    @GetMapping("/users/{userId}")
//    public ResponseEntity<UserService.UserManagementResponse>
//    getUser(
//            @PathVariable String userId,
//            Authentication authentication
//    ) {
//
//        if (!isAdmin(authentication)) {
//
//            return ResponseEntity
//                    .status(HttpStatus.FORBIDDEN)
//                    .build();
//        }
//
//        return ResponseEntity.ok(
//                userService.getUserForAdmin(userId)
//        );
//    }
//
//
//    // ---------------------------------------------------------
//    // EDIT USER
//    // ---------------------------------------------------------
//
//    @PutMapping("/users/{userId}")
//    public ResponseEntity<UserService.UserManagementResponse>
//    updateUser(
//            @PathVariable String userId,
//
//            @RequestBody
//            UserService.AdminUpdateUserRequest request,
//
//            Authentication authentication
//    ) {
//
//        if (!isAdmin(authentication)) {
//
//            return ResponseEntity
//                    .status(HttpStatus.FORBIDDEN)
//                    .build();
//        }
//
//        return ResponseEntity.ok(
//                userService.adminUpdateUser(
//                        userId,
//                        request
//                )
//        );
//    }
//
//
//    // ---------------------------------------------------------
//    // ACTIVATE USER
//    // ---------------------------------------------------------
//
//    @PatchMapping("/users/{userId}/activate")
//    public ResponseEntity<UserService.UserManagementResponse>
//    activateUser(
//            @PathVariable String userId,
//            Authentication authentication
//    ) {
//
//        if (!isAdmin(authentication)) {
//
//            return ResponseEntity
//                    .status(HttpStatus.FORBIDDEN)
//                    .build();
//        }
//
//        return ResponseEntity.ok(
//                userService.activateUser(userId)
//        );
//    }
//
//
//    // ---------------------------------------------------------
//    // DEACTIVATE USER
//    // ---------------------------------------------------------
//
//    @PatchMapping("/users/{userId}/deactivate")
//    public ResponseEntity<UserService.UserManagementResponse>
//    deactivateUser(
//            @PathVariable String userId,
//            Authentication authentication
//    ) {
//
//        if (!isAdmin(authentication)) {
//
//            return ResponseEntity
//                    .status(HttpStatus.FORBIDDEN)
//                    .build();
//        }
//
//        return ResponseEntity.ok(
//                userService.deactivateUser(userId)
//        );
//    }
//
//
//    // ---------------------------------------------------------
//    // DELETE USER
//    // ---------------------------------------------------------
//
//    @DeleteMapping("/users/{userId}")
//    public ResponseEntity<Void> deleteUser(
//            @PathVariable String userId,
//            Authentication authentication
//    ) {
//
//        if (!isAdmin(authentication)) {
//
//            return ResponseEntity
//                    .status(HttpStatus.FORBIDDEN)
//                    .build();
//        }
//
//        userService.deleteUser(userId);
//
//        return ResponseEntity
//                .noContent()
//                .build();
//    }
//
//
//    // =========================================================
//    // SUPER ADMIN CHECK
//    // =========================================================
//
//    private boolean isSuperAdmin(
//            Authentication authentication
//    ) {
//
//        if (authentication == null ||
//                !authentication.isAuthenticated()) {
//
//            return false;
//        }
//
//        return authentication
//                .getAuthorities()
//                .stream()
//                .anyMatch(authority ->
//                        "ROLE_SUPER_ADMIN".equals(
//                                authority.getAuthority()
//                        )
//                );
//    }
//
//
//    // =========================================================
//    // ADMIN OR SUPER ADMIN CHECK
//    // =========================================================
//
//    private boolean isAdmin(
//            Authentication authentication
//    ) {
//
//        if (authentication == null ||
//                !authentication.isAuthenticated()) {
//
//            return false;
//        }
//
//        return authentication
//                .getAuthorities()
//                .stream()
//                .anyMatch(authority -> {
//
//                    String role =
//                            authority.getAuthority();
//
//                    return "ROLE_ADMIN".equals(role)
//                            || "ROLE_SUPER_ADMIN".equals(role);
//                });
//    }
//}
//



package com.utilityhub.controller;

import com.utilityhub.dto.AdminLoginRequest;
import com.utilityhub.dto.AdminLoginResponse;
import com.utilityhub.dto.AdminResponse;
import com.utilityhub.dto.AdminSetupRequest;
import com.utilityhub.dto.AdminSetupResponse;
import com.utilityhub.dto.CreateAdminRequest;
import com.utilityhub.dto.CreateToolRequest;
import com.utilityhub.dto.ToolResponse;
import com.utilityhub.dto.UpdateAdminRequest;
import com.utilityhub.dto.UpdateToolRequest;
import com.utilityhub.service.AdminService;
import com.utilityhub.service.ToolService;
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
    private final ToolService toolService;


    public AdminController(
            AdminService adminService,
            UserService userService,
            ToolService toolService
    ) {

        this.adminService = adminService;
        this.userService = userService;
        this.toolService = toolService;
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

        List<AdminResponse> admins =
                adminService.getAllAdmins();

        return ResponseEntity.ok(admins);
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

        AdminResponse response =
                adminService.updateAdmin(
                        adminId,
                        request
                );

        return ResponseEntity.ok(response);
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


    // ---------------------------------------------------------
    // GET ALL USERS
    // ---------------------------------------------------------

    @GetMapping("/users")
    public ResponseEntity<List<UserService.UserManagementResponse>>
    getAllUsers(
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


    // ---------------------------------------------------------
    // GET ONE USER
    // ---------------------------------------------------------

    @GetMapping("/users/{userId}")
    public ResponseEntity<UserService.UserManagementResponse>
    getUser(
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


    // ---------------------------------------------------------
    // EDIT USER
    // ---------------------------------------------------------

    @PutMapping("/users/{userId}")
    public ResponseEntity<UserService.UserManagementResponse>
    updateUser(
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


    // ---------------------------------------------------------
    // ACTIVATE USER
    // ---------------------------------------------------------

    @PatchMapping("/users/{userId}/activate")
    public ResponseEntity<UserService.UserManagementResponse>
    activateUser(
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


    // ---------------------------------------------------------
    // DEACTIVATE USER
    // ---------------------------------------------------------

    @PatchMapping("/users/{userId}/deactivate")
    public ResponseEntity<UserService.UserManagementResponse>
    deactivateUser(
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


    // ---------------------------------------------------------
    // DELETE USER
    // ---------------------------------------------------------

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
    // TOOL MANAGEMENT
    // =========================================================


    // ---------------------------------------------------------
    // GET ALL TOOLS
    // ---------------------------------------------------------

    @GetMapping("/tools")
    public ResponseEntity<List<ToolResponse>> getAllTools(
            Authentication authentication
    ) {

        if (!isAdmin(authentication)) {

            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .build();
        }

        return ResponseEntity.ok(
                toolService.getAllTools()
        );
    }


    // ---------------------------------------------------------
    // GET ONE TOOL
    // ---------------------------------------------------------

    @GetMapping("/tools/{toolId}")
    public ResponseEntity<ToolResponse> getTool(
            @PathVariable String toolId,
            Authentication authentication
    ) {

        if (!isAdmin(authentication)) {

            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .build();
        }

        return ResponseEntity.ok(
                toolService.getTool(toolId)
        );
    }


    // ---------------------------------------------------------
    // CREATE TOOL
    // ---------------------------------------------------------

    @PostMapping("/tools")
    public ResponseEntity<ToolResponse> createTool(
            @Valid @RequestBody CreateToolRequest request,
            Authentication authentication
    ) {

        if (!isAdmin(authentication)) {

            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .build();
        }

        ToolResponse response =
                toolService.createTool(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    // ---------------------------------------------------------
    // UPDATE TOOL
    // ---------------------------------------------------------

    @PutMapping("/tools/{toolId}")
    public ResponseEntity<ToolResponse> updateTool(
            @PathVariable String toolId,
            @Valid @RequestBody UpdateToolRequest request,
            Authentication authentication
    ) {

        if (!isAdmin(authentication)) {

            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .build();
        }

        return ResponseEntity.ok(
                toolService.updateTool(
                        toolId,
                        request
                )
        );
    }


    // ---------------------------------------------------------
    // ACTIVATE TOOL
    // ---------------------------------------------------------

    @PatchMapping("/tools/{toolId}/activate")
    public ResponseEntity<ToolResponse> activateTool(
            @PathVariable String toolId,
            Authentication authentication
    ) {

        if (!isAdmin(authentication)) {

            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .build();
        }

        return ResponseEntity.ok(
                toolService.activateTool(toolId)
        );
    }


    // ---------------------------------------------------------
    // DEACTIVATE TOOL
    // ---------------------------------------------------------

    @PatchMapping("/tools/{toolId}/deactivate")
    public ResponseEntity<ToolResponse> deactivateTool(
            @PathVariable String toolId,
            Authentication authentication
    ) {

        if (!isAdmin(authentication)) {

            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .build();
        }

        return ResponseEntity.ok(
                toolService.deactivateTool(toolId)
        );
    }


    // ---------------------------------------------------------
    // DELETE TOOL
    // ---------------------------------------------------------

    @DeleteMapping("/tools/{toolId}")
    public ResponseEntity<Void> deleteTool(
            @PathVariable String toolId,
            Authentication authentication
    ) {

        if (!isAdmin(authentication)) {

            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .build();
        }

        toolService.deleteTool(toolId);

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


