package com.utilityhub.dto;

public class ToolResponse {

    private final String toolId;
    private final String name;
    private final String description;
    private final String category;
    private final String route;
    private final String icon;
    private final boolean active;


    public ToolResponse(
            String toolId,
            String name,
            String description,
            String category,
            String route,
            String icon,
            boolean active
    ) {
        this.toolId = toolId;
        this.name = name;
        this.description = description;
        this.category = category;
        this.route = route;
        this.icon = icon;
        this.active = active;
    }


    public String getToolId() {
        return toolId;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    public String getRoute() {
        return route;
    }

    public String getIcon() {
        return icon;
    }

    public boolean isActive() {
        return active;
    }
}