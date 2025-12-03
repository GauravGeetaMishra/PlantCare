package com.pcp.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pcp.dto.ApiResponse;
import com.pcp.dto.PlantDto;
import com.pcp.services.PlantService;

import lombok.RequiredArgsConstructor;
@CrossOrigin(origins = "http://localhost:5173")

@RestController
@RequestMapping("/plants")
@RequiredArgsConstructor
public class PlantController {

    private final PlantService plantService;

    @PostMapping
    public ResponseEntity<PlantDto> create(@RequestBody PlantDto dto) {
        return ResponseEntity.ok(plantService.createPlant(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlantDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(plantService.getPlantById(id));
    }

    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<PlantDto>> getByOwner(@PathVariable Long ownerId) {
        return ResponseEntity.ok(plantService.getPlantsByOwner(ownerId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlantDto> update(@PathVariable Long id, @RequestBody PlantDto dto) {
        return ResponseEntity.ok(plantService.updatePlant(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        plantService.deletePlant(id);
        return ResponseEntity.ok(new ApiResponse("Plant deleted", "Success"));
    }
}
