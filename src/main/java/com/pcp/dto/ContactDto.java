package com.pcp.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Data
@Getter
@Setter
@ToString
public class ContactDto {
	   private int id;
		private String name;
		private String email;
		private String subject;
		private String message;


}
