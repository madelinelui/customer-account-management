package com.fdmgroup.restapirepository.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fdmgroup.restapirepository.exception.CustomerFailedToUpdateException;
import com.fdmgroup.restapirepository.exception.CustomerNotFoundException;
import com.fdmgroup.restapirepository.model.Address;
import com.fdmgroup.restapirepository.model.Customer;
import com.fdmgroup.restapirepository.repository.CustomerRepo;

@Qualifier("customers")
@Service
public class CustomerService {
	private CustomerRepo customerRepo;
	
	@Autowired
	public CustomerService(CustomerRepo customerRepo) {
		this.customerRepo = customerRepo;
	}
	
	public Customer getCustomer(long id) {
	    return customerRepo.findById(id)
	            .orElseThrow(() -> new CustomerNotFoundException("Customer with ID " + id + " not found."));
	}
	
	public Customer addCustomer(Customer customer) {
		if(!customerRepo.existsById(customer.getCustomerId())) {
			return customerRepo.save(customer);
		}
		throw new CustomerNotFoundException("Cannot add a customer with null value.");
	}
	
	public Customer updateCustomer(Customer customer) {
		if(customerRepo.existsById(customer.getCustomerId())) {
			customerRepo.save(customer);
			return customer;
		}
		throw new CustomerFailedToUpdateException(
				"Failed to update customer details, id = " + customer.getCustomerId() + " . New customer details not found.");
	}
	
	public boolean deleteCustomer(long id) {
		if(customerRepo.existsById(id)) {
			customerRepo.deleteById(id);
			return true;
		}
		return false;
	}
	
	public List<Customer> listAllCustomers(){
		return customerRepo.findAll();
	}
}
