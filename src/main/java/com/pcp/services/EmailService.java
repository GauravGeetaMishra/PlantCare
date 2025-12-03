package com.pcp.services;

public interface EmailService {
    void sendSimpleMail(String to, String subject, String body);
}
