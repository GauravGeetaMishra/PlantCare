package com.pcp.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pcp.dto.ReportDto;
import com.pcp.dto.ReportRequest;
import com.pcp.entities.Plant;
import com.pcp.entities.Report;
import com.pcp.entities.Task;
import com.pcp.repositories.PlantRepository;
import com.pcp.repositories.ReportRepository;
import com.pcp.repositories.TaskRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepo;
    private final PlantRepository plantRepo;
    private final TaskRepository taskRepo;
    private final EmailService emailService;

    @Override
    public ReportDto create(ReportRequest req) {

        Plant plant = plantRepo.findById(req.getPlantId())
                .orElseThrow(() -> new RuntimeException("Plant not found"));

        Report report = Report.builder()
                .userId(req.getUserId())
                .taskName(req.getTaskName())
                .plant(plant)
                .build();

        reportRepo.save(report);
        return new ReportDto(report);
    }

    @Override
    public List<ReportDto> getByPlant(Long plantId) {
        return reportRepo.findAllByPlantId(plantId)
                .stream()
                .map(ReportDto::new)
                .toList();
    }

    @Override
    public void delete(Long id) {
        reportRepo.deleteById(id);
    }

    public void sendMail(Long plantId, String email) {

        List<Task> tasks = taskRepo.findByPlantId(plantId);
        List<Report> reports = reportRepo.findAllByPlantId(plantId);

        StringBuilder msg = new StringBuilder();

        msg.append("Plant Summary Report\n\n");

        msg.append("Pending Tasks:\n");
        tasks.forEach(t -> msg.append("- " + t.getTitle() + " (Pending)\n"));

     

        msg.append("\nWe hope you are doing well.");
        msg.append("\nPlease remember to check your plant regularly to keep it healthy.");
        msg.append("\n\nRegards,\nPlantCare Team");

        emailService.sendSimpleMail(email, "Plant Health Summary", msg.toString());
    }

}
