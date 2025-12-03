package com.pcp.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String taskName;       
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "plant_id")
    private Plant plant;
}
