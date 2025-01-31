package com.fdmgroup.restapirepository.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.SequenceGenerator;
import jakarta.validation.constraints.NotBlank;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "TYPE_OF_CUSTOMER")
public abstract class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cust_gen")
	@SequenceGenerator(name = "cust_gen",sequenceName="CUST_GEN", allocationSize=1, initialValue=1001)
	@Column(name="CUSTOMER_ID")
	private long customerId;
	
	@Column(name="CUSTOMER_TYPE", nullable = false)
	private String type;
	
	@Column(name="CUSTOMER_NAME", nullable = false)
	@NotBlank(message="Name cannot be empty.")
	private String name;
	
	@OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER) 
    @JoinColumn(name = "FK_ADDRESS_ID")
	private Address address;
	
	@OneToMany(mappedBy = "customer", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
	@JsonManagedReference
	private List<Account> accounts = new ArrayList<>();
	
	public Customer(){}

	public Customer(String type, String name, Address address) {
		super();
		this.type = type;
		this.name = name;
		this.address = address;
	}

	public void addAccount(Account account) {
	    if (accounts == null) {
	        accounts = new ArrayList<>();
	    }
	    accounts.add(account);
	    account.setCustomer(this);
	}
	
	public void addAddress(Address address) {
		this.setAddress(address);
	}
	
	public long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(long newId) {
		this.customerId = newId;
	}
	
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

	public List<Account> getAccounts() {
		return accounts;
	}

	@Override
	public String toString() {
		return "Customer [customerId=" + customerId + ", type=" + type + ", name=" + name + ", address=" + address
				+ "]";
	}


	
	
}
