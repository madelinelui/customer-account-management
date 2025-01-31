package com.fdmgroup.restapirepository.model;

import jakarta.persistence.InheritanceType;
import jakarta.persistence.Inheritance;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "ACCOUNT")
public abstract class Account {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ACCOUNT_ID", nullable = false)
	private long accountId;
	
	@Column(name="ACCOUNT_TYPE", nullable = false)
	private String type;
	
	@Column(name="BALANCE", nullable = false)
	private double balance;
	
	@ManyToOne
	@JoinColumn(name = "FK_CUST_ID", nullable = false)
	@JsonBackReference
	private Customer customer;
	
	Account(){}

	public Account(String type, double balance, Customer customer) {
		this.type = type;
		this.balance = balance;
		this.customer = customer;
	}

	public long getAccountId() {
		return accountId;
	}

	public void setAccountId(long accountId) {
		this.accountId = accountId;
	}
	
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public double getBalance() {
		return balance;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	@Override
	public String toString() {
		return "Account [accountId=" + accountId + ", type=" + type + ", balance=" + balance + ", customer=" + customer
				+ "]";
	}

	
}
