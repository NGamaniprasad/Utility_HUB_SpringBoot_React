

package com.utilityhub.controller;

import com.utilityhub.dto.ToolResponse;
import com.utilityhub.service.ToolService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tools")
@CrossOrigin(origins = "http://localhost:5173")
public class ToolController {

    private final ToolService toolService;

    public ToolController(ToolService toolService) {
        this.toolService = toolService;
    }

    // =========================================================
    // GET ACTIVE TOOLS
    // GET /api/tools
    // =========================================================

    @GetMapping
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
    // AUTHENTICATION CHECK
    // =========================================================

    private boolean isAuthenticated(
            Authentication authentication
    ) {

        return authentication != null
                && authentication.isAuthenticated();
    }
}
