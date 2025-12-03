package com.pcp.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pcp.dto.ApiResponse;
import com.pcp.dto.TaskDto;
import com.pcp.services.TaskService;

import lombok.RequiredArgsConstructor;
@CrossOrigin(origins = "http://localhost:5173")

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskDto> create(@RequestBody TaskDto dto) {
        return ResponseEntity.ok(taskService.createTask(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    @GetMapping("/plant/{plantId}")
    public ResponseEntity<List<TaskDto>> getByPlant(@PathVariable Long plantId) {
        return ResponseEntity.ok(taskService.getTasksByPlant(plantId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDto> update(@PathVariable Long id, @RequestBody TaskDto dto) {
        return ResponseEntity.ok(taskService.updateTask(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok(new ApiResponse("Task deleted", "Success"));
    }
}
