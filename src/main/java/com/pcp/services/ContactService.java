package com.pcp.services;

import java.util.List;

import com.pcp.dto.ApiResponse;
import com.pcp.dto.ContactDto;

public interface ContactService {


	ApiResponse contactForm(ContactDto dto);
	List<ContactDto> getAllForm();
	ApiResponse deleteForm(int id);

}
