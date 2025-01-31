package com.fdmgroup.restapirepository.model;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
public class SavingsAccount extends Account {

	@Column(name="INTEREST_RATE", nullable = false)
	private double interestRate;
	
	public SavingsAccount(){}

	public SavingsAccount(String type, double balance, double interestRate, Customer customer) {
		super(type, balance, customer);
		this.interestRate = interestRate;
	}

	public double getInterestRate() {
		return interestRate;
	}

	public void setInterestRate(double interestRate) {
		this.interestRate = interestRate;
	}
	
}
