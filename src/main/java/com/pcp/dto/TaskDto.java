package com.pcp.dto;

import java.time.Instant;
import lombok.Data;

@Data
public class TaskDto {
    private Long id;
    private String title;
    private String description;
    private Instant dueAt;
    private boolean completed;
    private Long plantId;
}
