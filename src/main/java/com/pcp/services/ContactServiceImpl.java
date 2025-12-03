package com.pcp.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.pcp.dto.ApiResponse;
import com.pcp.dto.AuthResponse;
import com.pcp.dto.ContactDto;
import com.pcp.entities.Contact;
import com.pcp.repositories.ContactServiceRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {
	private final ContactServiceRepository contactRepository;
	private final ModelMapper mapper;

	@Override
	public ApiResponse contactForm(ContactDto dto) {
	    Contact contact = mapper.map(dto, Contact.class);
	    contactRepository.save(contact);
	    return new ApiResponse("Form Submitted", "Success");
	}

	@Override
	public List<ContactDto> getAllForm() {
	    List<Contact> contacts = contactRepository.findAll();
	    System.out.println("ENTITY: " + contacts);
	    return contacts.stream()
	        .map(c -> mapper.map(c, ContactDto.class))
	        .toList();
	}

	@Override
	public ApiResponse deleteForm(int id) {
		contactRepository.deleteById(id);
		return new ApiResponse("Form Deleted Successfully","Success");
	}

}
