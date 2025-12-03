package com.pcp.repositories;

import com.pcp.entities.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findAllByPlantId(Long plantId);
}
