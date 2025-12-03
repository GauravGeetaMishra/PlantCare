package com.pcp.services;

import java.util.List;

import com.pcp.dto.UserDto;

public interface UserService {
    List<UserDto> getAllUsers();
    UserDto getUserById(Long id);
    UserDto updateUser(Long id, UserDto dto);
    void deleteUser(Long id);
}
