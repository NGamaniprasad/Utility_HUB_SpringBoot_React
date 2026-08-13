package com.utilityhub.service;

import com.utilityhub.dto.CreateToolRequest;
import com.utilityhub.dto.ToolResponse;
import com.utilityhub.dto.UpdateToolRequest;
import com.utilityhub.entity.Tool;
import com.utilityhub.repository.ToolRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ToolService {

    private final ToolRepository toolRepository;

    public ToolService(
            ToolRepository toolRepository
    ) {
        this.toolRepository = toolRepository;
    }


    // =========================================================
    // GET ALL TOOLS - ADMIN
    // =========================================================

    public List<ToolResponse> getAllTools() {

        return toolRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }


    // =========================================================
    // GET ACTIVE TOOLS - USER
    // =========================================================

    public List<ToolResponse> getActiveTools() {

        return toolRepository
                .findByActiveTrue()
                .stream()
                .map(this::toResponse)
                .toList();
    }


    // =========================================================
    // GET ONE TOOL
    // =========================================================

    public ToolResponse getTool(
            String toolId
    ) {

        Tool tool =
                toolRepository
                        .findByToolId(toolId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Tool not found."
                                )
                        );

        return toResponse(tool);
    }


    // =========================================================
    // CREATE TOOL
    // =========================================================

    @Transactional
    public ToolResponse createTool(
            CreateToolRequest request
    ) {

        if (request == null) {
            throw new IllegalArgumentException(
                    "Tool request is required."
            );
        }

        String name =
                request.getName()
                        .trim();

        String category =
                request.getCategory()
                        .trim();

        String route =
                request.getRoute()
                        .trim();


        // -----------------------------------------------------
        // DUPLICATE TOOL NAME
        // -----------------------------------------------------

        if (toolRepository.existsByNameIgnoreCase(name)) {

            throw new IllegalArgumentException(
                    "A tool with this name already exists."
            );
        }


        // -----------------------------------------------------
        // DUPLICATE ROUTE
        // -----------------------------------------------------

        if (toolRepository.existsByRoute(route)) {

            throw new IllegalArgumentException(
                    "A tool with this route already exists."
            );
        }


        // -----------------------------------------------------
        // GENERATE TOOL ID
        // -----------------------------------------------------

        long nextNumber =
                toolRepository.count() + 1;

        String toolId =
                String.format(
                        "UH-TOL-%06d",
                        nextNumber
                );

        while (
                toolRepository.existsByToolId(toolId)
        ) {

            nextNumber++;

            toolId =
                    String.format(
                            "UH-TOL-%06d",
                            nextNumber
                    );
        }


        // -----------------------------------------------------
        // CREATE ENTITY
        // -----------------------------------------------------

        Tool tool = new Tool();

        tool.setToolId(toolId);
        tool.setName(name);
        tool.setDescription(
                clean(request.getDescription())
        );
        tool.setCategory(category);
        tool.setRoute(route);
        tool.setIcon(
                clean(request.getIcon())
        );

        // New tools are active by default.
        tool.setActive(true);


        Tool savedTool =
                toolRepository.save(tool);


        return toResponse(savedTool);
    }


    // =========================================================
    // UPDATE TOOL
    // =========================================================

    @Transactional
    public ToolResponse updateTool(
            String toolId,
            UpdateToolRequest request
    ) {

        if (request == null) {
            throw new IllegalArgumentException(
                    "Tool request is required."
            );
        }


        Tool tool =
                toolRepository
                        .findByToolId(toolId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Tool not found."
                                )
                        );


        String name =
                request.getName()
                        .trim();

        String category =
                request.getCategory()
                        .trim();

        String route =
                request.getRoute()
                        .trim();


        // -----------------------------------------------------
        // DUPLICATE NAME
        // -----------------------------------------------------

        if (!tool.getName()
                .equalsIgnoreCase(name)) {

            if (toolRepository
                    .existsByNameIgnoreCase(name)) {

                throw new IllegalArgumentException(
                        "A tool with this name already exists."
                );
            }
        }


        // -----------------------------------------------------
        // DUPLICATE ROUTE
        // -----------------------------------------------------

        if (!tool.getRoute()
                .equals(route)) {

            if (toolRepository.existsByRoute(route)) {

                throw new IllegalArgumentException(
                        "A tool with this route already exists."
                );
            }
        }


        // -----------------------------------------------------
        // UPDATE
        // -----------------------------------------------------

        tool.setName(name);

        tool.setDescription(
                clean(request.getDescription())
        );

        tool.setCategory(category);

        tool.setRoute(route);

        tool.setIcon(
                clean(request.getIcon())
        );

        tool.setActive(
                request.isActive()
        );


        Tool savedTool =
                toolRepository.save(tool);


        return toResponse(savedTool);
    }


    // =========================================================
    // ACTIVATE TOOL
    // =========================================================

    @Transactional
    public ToolResponse activateTool(
            String toolId
    ) {

        Tool tool =
                findTool(toolId);

        tool.setActive(true);

        return toResponse(
                toolRepository.save(tool)
        );
    }


    // =========================================================
    // DEACTIVATE TOOL
    // =========================================================

    @Transactional
    public ToolResponse deactivateTool(
            String toolId
    ) {

        Tool tool =
                findTool(toolId);

        tool.setActive(false);

        return toResponse(
                toolRepository.save(tool)
        );
    }


    // =========================================================
    // DELETE TOOL
    // =========================================================

    @Transactional
    public void deleteTool(
            String toolId
    ) {

        Tool tool =
                findTool(toolId);

        toolRepository.delete(tool);
    }


    // =========================================================
    // FIND TOOL
    // =========================================================

    private Tool findTool(
            String toolId
    ) {

        return toolRepository
                .findByToolId(toolId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Tool not found."
                        )
                );
    }


    // =========================================================
    // ENTITY -> RESPONSE
    // =========================================================

    private ToolResponse toResponse(
            Tool tool
    ) {

        return new ToolResponse(
                tool.getToolId(),
                tool.getName(),
                tool.getDescription(),
                tool.getCategory(),
                tool.getRoute(),
                tool.getIcon(),
                tool.isActive()
        );
    }


    // =========================================================
    // CLEAN OPTIONAL STRING
    // =========================================================

    private String clean(
            String value
    ) {

        if (value == null) {
            return null;
        }

        String trimmed =
                value.trim();

        return trimmed.isEmpty()
                ? null
                : trimmed;
    }
}