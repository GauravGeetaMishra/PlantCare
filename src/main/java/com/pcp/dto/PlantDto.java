package com.pcp.dto;

import lombok.Data;

@Data
public class PlantDto {
    private Long id;
    private String name;
    private String species;
    private String notes;
    private String imageUrl;
    private Long ownerId;
}
