package com.pcp.controllers;

import com.pcp.dto.ReportDto;
import com.pcp.dto.ReportRequest;
import com.pcp.services.ReportService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/reports")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {

    private final ReportService reportService;

    @PostMapping("/create")
    public ResponseEntity<ReportDto> create(@RequestBody ReportRequest req){
        return ResponseEntity.ok(reportService.create(req));
    }

    @GetMapping("/plant/{plantId}")
    public ResponseEntity<List<ReportDto>> getReports(@PathVariable Long plantId){
        return ResponseEntity.ok(reportService.getByPlant(plantId));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        reportService.delete(id);
    }

    // 🟢 Send Report + Tasks email
    @PostMapping("/send")
    public ResponseEntity<String> sendMail(
            @RequestParam Long plantId,
            @RequestParam String email
    ){
        reportService.sendMail(plantId,email);
        return ResponseEntity.ok("Email Sent Successfully!");
    }
}
