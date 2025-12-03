package com.pcp.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pcp.dto.UserDto;
import com.pcp.entities.User;
import com.pcp.exception_handler.ResourceNotFoundException;
import com.pcp.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper mapper;

    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(u -> mapper.map(u, UserDto.class))
                .toList();
    }

    @Override
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
        return mapper.map(user, UserDto.class);
    }

    @Override
    public UserDto updateUser(Long id, UserDto dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));

        mapper.map(dto, user);  
        return mapper.map(userRepository.save(user), UserDto.class);
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id))
            throw new ResourceNotFoundException("User not found with id " + id);
        userRepository.deleteById(id);
    }
}
