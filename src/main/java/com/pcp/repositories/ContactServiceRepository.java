package com.pcp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pcp.entities.Contact;



public interface ContactServiceRepository extends JpaRepository<Contact, Integer> {

}
