package com.pcp.dto;

import com.pcp.entities.Role;
import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private boolean disabled;
}
