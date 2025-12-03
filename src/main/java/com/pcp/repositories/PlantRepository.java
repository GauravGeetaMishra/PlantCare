package com.pcp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pcp.entities.Plant;
import com.pcp.entities.User;

public interface PlantRepository extends JpaRepository<Plant, Long> {
    List<Plant> findByOwner(User owner);
}
