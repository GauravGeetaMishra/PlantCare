package com.pcp.services;

import java.util.HashMap;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pcp.dto.ApiResponse;
import com.pcp.dto.AuthRequest;
import com.pcp.dto.AuthResponse;
import com.pcp.dto.RegisterRequest;
import com.pcp.entities.Role;
import com.pcp.entities.User;
import com.pcp.exception_handler.AuthenticationException;
import com.pcp.exception_handler.ResourceNotFoundException;
import com.pcp.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final ModelMapper mapper;
    private final Map<Long, Integer> otpStore = new HashMap<>();
    private final EmailService emailService;

    @Override
    public ApiResponse registerUser(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail()))
            throw new RuntimeException("Email already Exist");

        User user = mapper.map(request, User.class);
        user.setRole(Role.USER);

        User saved = userRepository.save(user);

        return new ApiResponse("User Registered Successfully " + saved.getId(), "Success");
    }
    @Override // not for frontend only for backend
    public ApiResponse createAdmin(RegisterRequest req) {

        if (userRepository.existsByEmail(req.getEmail()))
            throw new RuntimeException("Admin email already exists");

        User admin = mapper.map(req, User.class);
        admin.setRole(Role.ADMIN); //  force role = ADMIN
        userRepository.save(admin);

        return new ApiResponse("Admin Created Successfully", "Success");
    }

    @Override
    public AuthResponse login(AuthRequest request) {

        User user = userRepository.findByEmail(request.getEmail());

        if (user == null) {
            throw new AuthenticationException("User not found");
        }

        boolean passwordMatch = user.getPassword().trim().equals(request.getPassword().trim());

        if (!passwordMatch) {
            throw new AuthenticationException("Incorrect password");
        }

        // OTP Generate
        
        int otp = (int) (Math.random() * 900000) + 100000;
        emailService.sendSimpleMail(
                user.getEmail(),
                "PlantCare Login OTP",
                "Dear " + user.getName() + ",\n\nYour OTP for login is: " + otp
                        + "\n\nValid for 5 minutes.\n\nRegards,\nPlantCare Team"
        );
        otpStore.put(user.getId(), otp);

        // Print OTP in console if mail fails (for testing)
        System.out.println("OTP for login: " + otp);
        
        // Response
        AuthResponse response = mapper.map(user, AuthResponse.class);
        response.setMessage("OTP sent successfully");

        return response;
    }



    @Override
    public AuthResponse verifyOtp(Long id, int otp) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid User ID"));

        Integer storedOtp = otpStore.get(id);
        if (storedOtp == null)
            throw new RuntimeException("OTP not requested or already verified!");

        if (!storedOtp.equals(otp))
            throw new RuntimeException("Invalid OTP!");

        otpStore.remove(id);

        AuthResponse rsp = mapper.map(user, AuthResponse.class);
        rsp.setMessage("OTP verification successful");
        return rsp;
    }
}
