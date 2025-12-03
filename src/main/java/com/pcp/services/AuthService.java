package com.pcp.services;

import com.pcp.dto.ApiResponse;
import com.pcp.dto.AuthRequest;
import com.pcp.dto.AuthResponse;
import com.pcp.dto.RegisterRequest;

public interface AuthService {
    AuthResponse login(AuthRequest dto);
    AuthResponse verifyOtp(Long userId, int otp);
    ApiResponse registerUser(RegisterRequest dto);
    ApiResponse createAdmin(RegisterRequest req);

}
