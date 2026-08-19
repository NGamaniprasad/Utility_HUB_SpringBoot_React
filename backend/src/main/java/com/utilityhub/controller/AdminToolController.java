



package com.utilityhub.controller;

import com.utilityhub.dto.CreateToolRequest;
import com.utilityhub.dto.ToolResponse;
import com.utilityhub.dto.UpdateToolRequest;
import com.utilityhub.service.ToolService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/tools")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminToolController {

    private final ToolService toolService;

    public AdminToolController(ToolService toolService) {
        this.toolService = toolService;
    }

    // =========================================================
    // GET ALL TOOLS
    // GET /api/admin/tools
    // =========================================================

    @GetMapping
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

    // =========================================================
    // GET ONE TOOL
    // GET /api/admin/tools/{toolId}
    // =========================================================

    @GetMapping("/{toolId}")
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

    // =========================================================
    // CREATE TOOL
    // POST /api/admin/tools
    // =========================================================

    @PostMapping
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

    // =========================================================
    // UPDATE TOOL
    // PUT /api/admin/tools/{toolId}
    // =========================================================

    @PutMapping("/{toolId}")
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

    // =========================================================
    // ACTIVATE TOOL
    // PATCH /api/admin/tools/{toolId}/activate
    // =========================================================

    @PatchMapping("/{toolId}/activate")
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

    // =========================================================
    // DEACTIVATE TOOL
    // PATCH /api/admin/tools/{toolId}/deactivate
    // =========================================================

    @PatchMapping("/{toolId}/deactivate")
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

    // =========================================================
    // DELETE TOOL
    // DELETE /api/admin/tools/{toolId}
    // =========================================================

    @DeleteMapping("/{toolId}")
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
    // ADMIN CHECK
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
