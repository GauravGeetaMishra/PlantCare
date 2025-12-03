package com.pcp.services;

import java.util.List;

import com.pcp.dto.TaskDto;

public interface TaskService {
    TaskDto createTask(TaskDto dto);
    TaskDto getTaskById(Long id);
    List<TaskDto> getTasksByPlant(Long plantId);
    TaskDto updateTask(Long id, TaskDto dto);
    void deleteTask(Long id);
}
