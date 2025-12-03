package com.pcp.dto;

import lombok.Data;

@Data
public class OTPVerifyRequest {
    private Long userId;
    private int otp;
}
