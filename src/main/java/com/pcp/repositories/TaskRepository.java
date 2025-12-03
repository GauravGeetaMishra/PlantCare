package com.pcp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pcp.entities.Task;
import com.pcp.entities.Plant;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByPlant(Plant plant);
    List<Task> findByPlantId(Long plantId);
}
