package com.pcp.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ReportRequest {
    private Long userId;
    private Long plantId;
    private String taskName;
}
