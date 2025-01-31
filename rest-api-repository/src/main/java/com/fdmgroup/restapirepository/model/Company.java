package com.fdmgroup.restapirepository.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("COMPANY")
public class Company extends Customer {

	public Company(){}

	public Company(String type, String name, Address address) {
		super(type, name, address);
	}
	
	
}
