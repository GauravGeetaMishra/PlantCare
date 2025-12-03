package com.pcp.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pcp.services.AdminService;

import lombok.RequiredArgsConstructor;
@CrossOrigin(origins = "http://localhost:5173")

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
private final AdminService adminService;



@DeleteMapping("/{userId}/delete")
public ResponseEntity<?> deleteUserById(@PathVariable Long userId){
	return ResponseEntity.ok(deleteUserById(userId));
}
}
