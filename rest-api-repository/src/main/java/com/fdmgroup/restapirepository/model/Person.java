package com.fdmgroup.restapirepository.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("PERSON")
public class Person extends Customer {

	public Person(){}

	public Person(String type, String name, Address address) {
		super(type, name, address);
	}

}
