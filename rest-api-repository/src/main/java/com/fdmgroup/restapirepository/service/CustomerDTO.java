package com.fdmgroup.restapirepository.service;

import com.fdmgroup.restapirepository.model.Address;

public class CustomerDTO {

	private String type;
	private String name;
	private Address address;
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
	
	
}
