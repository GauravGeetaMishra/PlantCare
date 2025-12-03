package com.pcp.services;

import java.util.List;

import com.pcp.dto.PlantDto;

public interface PlantService {
    PlantDto createPlant(PlantDto dto);
    PlantDto getPlantById(Long id);
    List<PlantDto> getPlantsByOwner(Long ownerId);
    PlantDto updatePlant(Long id, PlantDto dto);
    void deletePlant(Long id);
}
