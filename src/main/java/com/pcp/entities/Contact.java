package com.pcp.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Setter
@Getter
@ToString
public class Contact {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
private String name;
private String email;
private String subject;
private String message;
}
