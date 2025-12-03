package com.pcp.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pcp.dto.TaskDto;
import com.pcp.entities.Plant;
import com.pcp.entities.Task;
import com.pcp.exception_handler.ResourceNotFoundException;
import com.pcp.repositories.PlantRepository;
import com.pcp.repositories.TaskRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final PlantRepository plantRepository;
    private final ModelMapper mapper;

    @Override
    public TaskDto createTask(TaskDto dto) {
        Plant plant = plantRepository.findById(dto.getPlantId())
                .orElseThrow(() -> new ResourceNotFoundException("Plant not found"));

        Task task = mapper.map(dto, Task.class);
        task.setPlant(plant);

        Task saved = taskRepository.save(task);
        TaskDto res = mapper.map(saved, TaskDto.class);
        res.setPlantId(plant.getId());
        return res;
    }

    @Override
    public TaskDto getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        TaskDto dto = mapper.map(task, TaskDto.class);
        dto.setPlantId(task.getPlant().getId());
        return dto;
    }

    @Override
    public List<TaskDto> getTasksByPlant(Long plantId) {
        Plant plant = plantRepository.findById(plantId)
                .orElseThrow(() -> new ResourceNotFoundException("Plant not found"));

        return taskRepository.findByPlant(plant)
                .stream()
                .map(t -> {
                    TaskDto dto = mapper.map(t, TaskDto.class);
                    dto.setPlantId(plantId);
                    return dto;
                }).toList();
    }

    @Override
    public TaskDto updateTask(Long id, TaskDto dto) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        mapper.map(dto, task);

        if (dto.getPlantId() != null) {
            Plant plant = plantRepository.findById(dto.getPlantId())
                    .orElseThrow(() -> new ResourceNotFoundException("Plant not found"));
            task.setPlant(plant);
        }

        Task updated = taskRepository.save(task);
        TaskDto res = mapper.map(updated, TaskDto.class);
        res.setPlantId(updated.getPlant().getId());
        return res;
    }

    @Override
    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id))
            throw new ResourceNotFoundException("Task not found");
        taskRepository.deleteById(id);
    }
}
