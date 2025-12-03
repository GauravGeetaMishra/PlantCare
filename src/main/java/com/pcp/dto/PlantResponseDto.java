package com.pcp.dto;

import java.util.List;

import lombok.Data;

@Data
public class PlantResponseDto {

	 private Long id;
	 private String name;
	 private String species;
	 private String notes;
	private String imageUrl;
   private List<TaskDto> tasks;
	 private List<ReportDto> reports;
	 private String ownerName;   
	
	
}
