package com.fdmgroup.restapirepository.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;

@Entity
public class CheckingAccount extends Account {

//	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "check_number_seq")
//    @SequenceGenerator(name = "check_number_seq", sequenceName = "check_number_seq", allocationSize = 1)
    @Column(name = "NEXT_CHECK_NUMBER", nullable = false)
	private int nextCheckNumber = 0;
	
	public CheckingAccount(){}

	public CheckingAccount(String type, double balance, Customer customer) {
		super(type, balance, customer);
		this.nextCheckNumber = nextCheckNumber + 1;
	}

	
}
