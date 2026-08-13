//package com.utilityhub.controller;
//
//import com.utilityhub.dto.ToolResponse;
//import com.utilityhub.service.ToolService;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/tools")
//@CrossOrigin(origins = "http://localhost:5173")
//public class ToolController {
//
//    private final ToolService toolService;
//
//    public ToolController(
//            ToolService toolService
//    ) {
//        this.toolService = toolService;
//    }
//
//
//    // =========================================================
//    // GET ACTIVE TOOLS FOR USER DASHBOARD
//    // =========================================================
//
//    @GetMapping
//    public ResponseEntity<List<ToolResponse>> getActiveTools(
//            Authentication authentication
//    ) {
//
//        if (!isAuthenticated(authentication)) {
//
//            return ResponseEntity
//                    .status(HttpStatus.UNAUTHORIZED)
//                    .build();
//        }
//
//        return ResponseEntity.ok(
//                toolService.getActiveTools()
//        );
//    }
//
//
//    // =========================================================
//    // AUTHENTICATION CHECK
//    // =========================================================
//
//    private boolean isAuthenticated(
//            Authentication authentication
//    ) {
//
//        return authentication != null
//                && authentication.isAuthenticated();
//    }
//}


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
@CrossOrigin(origins = "http://localhost:5173")
public class ToolController {

    private final ToolService toolService;

    public ToolController(
            ToolService toolService
    ) {
        this.toolService = toolService;
    }


    // =========================================================
    // USER
    // GET ACTIVE TOOLS
    // GET /api/tools
    // =========================================================

    @GetMapping("/api/tools")
    public ResponseEntity<List<ToolResponse>> getActiveTools(
            Authentication authentication
    ) {

        if (!isAuthenticated(authentication)) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .build();
        }

        return ResponseEntity.ok(
                toolService.getActiveTools()
        );
    }


    // =========================================================
    // ADMIN
    // GET ALL TOOLS
    // GET /api/admin/tools
    // =========================================================

    @GetMapping("/api/admin/tools")
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
    // ADMIN
    // GET ONE TOOL
    // GET /api/admin/tools/{toolId}
    // =========================================================

    @GetMapping("/api/admin/tools/{toolId}")
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
    // ADMIN
    // CREATE TOOL
    // POST /api/admin/tools
    // =========================================================

    @PostMapping("/api/admin/tools")
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
    // ADMIN
    // UPDATE TOOL
    // PUT /api/admin/tools/{toolId}
    // =========================================================

    @PutMapping("/api/admin/tools/{toolId}")
    public ResponseEntity<ToolResponse> updateTool(
            @PathVariable String toolId,

            @Valid
            @RequestBody
            UpdateToolRequest request,

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
    // ADMIN
    // ACTIVATE TOOL
    // PATCH /api/admin/tools/{toolId}/activate
    // =========================================================

    @PatchMapping(
            "/api/admin/tools/{toolId}/activate"
    )
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
    // ADMIN
    // DEACTIVATE TOOL
    // PATCH /api/admin/tools/{toolId}/deactivate
    // =========================================================

    @PatchMapping(
            "/api/admin/tools/{toolId}/deactivate"
    )
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
    // ADMIN
    // DELETE TOOL
    // DELETE /api/admin/tools/{toolId}
    // =========================================================

    @DeleteMapping(
            "/api/admin/tools/{toolId}"
    )
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

        if (!isAuthenticated(authentication)) {
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


    // =========================================================
    // AUTHENTICATION CHECK
    // =========================================================

    private boolean isAuthenticated(
            Authentication authentication
    ) {

        return authentication != null
                && authentication.isAuthenticated();
    }
}

