package com.pcp.controllers;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pcp.dto.ContactDto;
import com.pcp.services.ContactService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/contact")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<?> contactForm(@RequestBody ContactDto dto) {
        return ResponseEntity.ok(contactService.contactForm(dto));
    }

    @GetMapping
    public ResponseEntity<?> getAllForm() {
        return ResponseEntity.ok(contactService.getAllForm());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteForm(@PathVariable int id) {
        return ResponseEntity.ok(contactService.deleteForm(id));
    }
}
