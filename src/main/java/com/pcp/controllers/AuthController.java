package com.pcp.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pcp.dto.ApiResponse;
import com.pcp.dto.AuthRequest;
import com.pcp.dto.AuthResponse;
import com.pcp.dto.OTPVerifyRequest;
import com.pcp.dto.RegisterRequest;
import com.pcp.services.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
@CrossOrigin(origins = "http://localhost:5173")

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    
    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@RequestBody @Valid RegisterRequest request) {
        return ResponseEntity.ok(authService.registerUser(request));
    }
    @PostMapping("/admin/create")  // don't show this in UI
    public ResponseEntity<ApiResponse> createAdmin(@RequestBody @Valid RegisterRequest req) {
        return ResponseEntity.ok(authService.createAdmin(req));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthRequest dto) {
        return ResponseEntity.ok(authService.login(dto));
    }

    @PostMapping("/verifyOtp")
    public ResponseEntity<AuthResponse> verifyOtp(@RequestBody @Valid OTPVerifyRequest req) {
        return ResponseEntity.ok(authService.verifyOtp(req.getUserId(), req.getOtp()));
    }
}
