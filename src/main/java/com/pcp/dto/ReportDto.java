package com.pcp.dto;

import com.pcp.entities.Report;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ReportDto {

    private Long id;
    private Long userId;
    private Long plantId;
    private String taskName;

    public ReportDto(Report r){
        this.id = r.getId();
        this.userId = r.getUserId();
        this.plantId = r.getPlant().getId();
        this.taskName = r.getTaskName();
    }
}
