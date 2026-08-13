



package com.utilityhub.service;

import com.utilityhub.dto.AdminLoginRequest;
import com.utilityhub.dto.AdminLoginResponse;
import com.utilityhub.dto.AdminResponse;
import com.utilityhub.dto.AdminSetupRequest;
import com.utilityhub.dto.AdminSetupResponse;
import com.utilityhub.dto.CreateAdminRequest;
import com.utilityhub.dto.UpdateAdminRequest;
import com.utilityhub.entity.Admin;
import com.utilityhub.repository.AdminRepository;
import com.utilityhub.security.JwtService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AdminService(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // ==========================================
    // FIRST ADMIN SETUP
    // ==========================================

    @Transactional
    public AdminSetupResponse createFirstAdmin(
            AdminSetupRequest request
    ) {

        if (adminRepository.count() > 0) {
            throw new IllegalStateException(
                    "First admin has already been created."
            );
        }

        if (!request.getPassword()
                .equals(request.getConfirmPassword())) {

            throw new IllegalArgumentException(
                    "Passwords do not match."
            );
        }

        if (adminRepository.existsByEmail(
                request.getEmail()
        )) {

            throw new IllegalArgumentException(
                    "Email is already registered."
            );
        }

        String adminId = "ADM-000001";

        Admin admin = new Admin();

        admin.setAdminId(adminId);
        admin.setName(request.getName());
        admin.setEmail(request.getEmail());

        admin.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        admin.setRole("SUPER_ADMIN");
        admin.setActive(true);

        adminRepository.save(admin);

        return new AdminSetupResponse(
                "First admin created successfully.",
                admin.getAdminId(),
                admin.getName(),
                admin.getEmail()
        );
    }


    // ==========================================
    // ADMIN LOGIN
    // ==========================================

    public AdminLoginResponse login(
            AdminLoginRequest request
    ) {

        Admin admin = adminRepository
                .findByAdminId(request.getAdminId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Invalid Admin ID or password."
                        )
                );

        if (!admin.isActive()) {
            throw new IllegalStateException(
                    "Admin account is not active."
            );
        }

        boolean passwordMatches =
                passwordEncoder.matches(
                        request.getPassword(),
                        admin.getPassword()
                );

        if (!passwordMatches) {
            throw new IllegalArgumentException(
                    "Invalid Admin ID or password."
            );
        }

        String token = jwtService.generateToken(
                admin.getAdminId(),
                admin.getRole()
        );

        return new AdminLoginResponse(
                "Login successful.",
                token,
                admin.getAdminId(),
                admin.getName(),
                admin.getRole()
        );
    }


    // ==========================================
    // CREATE ADDITIONAL ADMIN
    // ==========================================

    @Transactional
    public AdminSetupResponse createAdmin(
            CreateAdminRequest request
    ) {

        if (adminRepository.existsByEmail(
                request.getEmail()
        )) {

            throw new IllegalArgumentException(
                    "Email is already registered."
            );
        }

        long nextNumber =
                adminRepository.count() + 1;

        String adminId = String.format(
                "ADM-%06d",
                nextNumber
        );

        while (adminRepository.existsByAdminId(adminId)) {

            nextNumber++;

            adminId = String.format(
                    "ADM-%06d",
                    nextNumber
            );
        }

        Admin admin = new Admin();

        admin.setAdminId(adminId);
        admin.setName(request.getName());
        admin.setEmail(request.getEmail());

        admin.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        admin.setRole(request.getRole());
        admin.setActive(true);

        adminRepository.save(admin);

        return new AdminSetupResponse(
                "Admin created successfully.",
                admin.getAdminId(),
                admin.getName(),
                admin.getEmail()
        );
    }


    // ==========================================
    // GET ALL ADMINS
    // ==========================================

    public List<AdminResponse> getAllAdmins() {

        return adminRepository.findAll()
                .stream()
                .map(admin -> new AdminResponse(
                        admin.getAdminId(),
                        admin.getName(),
                        admin.getEmail(),
                        admin.getRole(),
                        admin.isActive()
                ))
                .toList();
    }


    // ==========================================
    // UPDATE ADMIN
    // ==========================================

    @Transactional
    public AdminResponse updateAdmin(
            String adminId,
            UpdateAdminRequest request
    ) {

        Admin admin = adminRepository
                .findByAdminId(adminId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Admin not found."
                        )
                );

        // SUPER_ADMIN cannot be edited
        if ("SUPER_ADMIN".equalsIgnoreCase(admin.getRole())) {
            throw new IllegalStateException(
                    "SUPER_ADMIN account cannot be edited."
            );
        }

        // Check duplicate email
        if (!admin.getEmail().equalsIgnoreCase(request.getEmail())
                && adminRepository.existsByEmail(request.getEmail())) {

            throw new IllegalArgumentException(
                    "Email is already registered."
            );
        }

        admin.setName(request.getName());
        admin.setEmail(request.getEmail());
        admin.setRole(request.getRole());
        admin.setActive(request.isActive());

        // Password is optional during update
        if (request.getPassword() != null
                && !request.getPassword().isBlank()) {

            admin.setPassword(
                    passwordEncoder.encode(
                            request.getPassword()
                    )
            );
        }

        Admin savedAdmin =
                adminRepository.save(admin);

        return new AdminResponse(
                savedAdmin.getAdminId(),
                savedAdmin.getName(),
                savedAdmin.getEmail(),
                savedAdmin.getRole(),
                savedAdmin.isActive()
        );
    }


    // ==========================================
    // DELETE ADMIN
    // ==========================================

    @Transactional
    public void deleteAdmin(String adminId) {

        Admin admin = adminRepository
                .findByAdminId(adminId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Admin not found."
                        )
                );

        // SUPER_ADMIN cannot be deleted
        if ("SUPER_ADMIN".equalsIgnoreCase(admin.getRole())) {
            throw new IllegalStateException(
                    "SUPER_ADMIN account cannot be deleted."
            );
        }

        adminRepository.delete(admin);
    }
}