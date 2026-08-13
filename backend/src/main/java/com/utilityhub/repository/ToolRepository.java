
package com.utilityhub.repository;

import com.utilityhub.entity.Tool;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ToolRepository
        extends JpaRepository<Tool, Long> {

    // =========================================================
    // FIND BY TOOL ID
    // =========================================================

    Optional<Tool> findByToolId(
            String toolId
    );


    // =========================================================
    // CHECK TOOL ID
    // =========================================================

    boolean existsByToolId(
            String toolId
    );


    // =========================================================
    // CHECK TOOL NAME
    // =========================================================

    boolean existsByNameIgnoreCase(
            String name
    );


    // =========================================================
    // CHECK ROUTE
    // =========================================================

    boolean existsByRoute(
            String route
    );


    // =========================================================
    // GET ACTIVE TOOLS
    // =========================================================

    List<Tool> findByActiveTrue();
}

