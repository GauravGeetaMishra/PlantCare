package com.pcp.services;

import org.springframework.stereotype.Service;

import com.pcp.dto.ApiResponse;
import com.pcp.entities.User;
import com.pcp.exception_handler.ResourceNotFoundException;
import com.pcp.repositories.UserRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
	private final UserRepository userRepository;
	

	@Override
	public ApiResponse deleteUserById(Long userId) {
		// TODO Auto-generated method stub
		User user = userRepository.findById(userId)
				.orElseThrow(()-> new ResourceNotFoundException("No user Exist"));
		userRepository.delete(user);
		return null;
	}

}
