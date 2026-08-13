package com.utilityhub.repository;

import com.utilityhub.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    Optional<Admin> findByAdminId(String adminId);

    Optional<Admin> findByEmail(String email);

    boolean existsByAdminId(String adminId);

    boolean existsByEmail(String email);
}