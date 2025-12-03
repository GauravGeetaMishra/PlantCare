package com.pcp.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pcp.dto.PlantDto;
import com.pcp.entities.Plant;
import com.pcp.entities.User;
import com.pcp.exception_handler.ResourceNotFoundException;
import com.pcp.repositories.PlantRepository;
import com.pcp.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PlantServiceImpl implements PlantService {

    private final PlantRepository plantRepository;
    private final UserRepository userRepository;
    private final ModelMapper mapper;

    @Override
    public PlantDto createPlant(PlantDto dto) {
        User owner = userRepository.findById(dto.getOwnerId())
                .orElseThrow(() -> new ResourceNotFoundException("Owner not found"));

        Plant plant = mapper.map(dto, Plant.class);
        plant.setOwner(owner);

        return mapper.map(plantRepository.save(plant), PlantDto.class);
    }

    @Override
    public PlantDto getPlantById(Long id) {
        Plant plant = plantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Plant not found with id " + id));
        PlantDto dto = mapper.map(plant, PlantDto.class);
        dto.setOwnerId(plant.getOwner().getId());
        return dto;
    }

    @Override
    public List<PlantDto> getPlantsByOwner(Long ownerId) {
        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new ResourceNotFoundException("Owner not found"));

        return plantRepository.findByOwner(owner)
                .stream()
                .map(p -> {
                    PlantDto dto = mapper.map(p, PlantDto.class);
                    dto.setOwnerId(ownerId);
                    return dto;
                }).toList();
    }

    @Override
    public PlantDto updatePlant(Long id, PlantDto dto) {
        Plant plant = plantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Plant not found with id " + id));

        mapper.map(dto, plant);
        if (dto.getOwnerId() != null) {
            User owner = userRepository.findById(dto.getOwnerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Owner not found"));
            plant.setOwner(owner);
        }

        Plant updated = plantRepository.save(plant);
        PlantDto res = mapper.map(updated, PlantDto.class);
        res.setOwnerId(updated.getOwner().getId());
        return res;
    }

    @Override
    public void deletePlant(Long id) {
        if (!plantRepository.existsById(id))
            throw new ResourceNotFoundException("Plant not found with id " + id);
        plantRepository.deleteById(id);
    }
}
