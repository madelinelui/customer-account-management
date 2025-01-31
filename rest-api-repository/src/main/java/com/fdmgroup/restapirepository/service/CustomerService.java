package com.fdmgroup.restapirepository.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fdmgroup.restapirepository.exception.AccountNotFoundException;
import com.fdmgroup.restapirepository.exception.AddressNotFoundException;
import com.fdmgroup.restapirepository.exception.CustomerFailedToUpdateException;
import com.fdmgroup.restapirepository.exception.CustomerNotFoundException;
import com.fdmgroup.restapirepository.model.Account;
import com.fdmgroup.restapirepository.model.Address;
import com.fdmgroup.restapirepository.model.Company;
import com.fdmgroup.restapirepository.model.Customer;
import com.fdmgroup.restapirepository.model.Person;
import com.fdmgroup.restapirepository.repository.CustomerRepo;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

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
	
	public List<Account> getAllAccountsByCustomerId(long id){
		List<Account> accounts = customerRepo.findAllAccountsByCustomerId(id);
		if(accounts.isEmpty()) {
			throw new AccountNotFoundException("No accounts associated with this customer: "+id);
		}
		return accounts;
	}
	
	public Customer addCustomer(Customer customer) {
	    if (customerRepo.existsById(customer.getCustomerId())) {
	        throw new CustomerNotFoundException("Customer with ID " + customer.getCustomerId() + " already exists.");
	    }

	    if (customer.getType() == null || customer.getName() == null || customer.getAddress() == null) {
	        throw new IllegalArgumentException("Customer type, name, and address cannot be null.");
	    }

	    if ("Person".equalsIgnoreCase(customer.getType())) {
	        Customer person = new Person();
	        person.setType("Person");
	        person.setName(customer.getName());
	        person.setAddress(customer.getAddress());
	        return customerRepo.save(person);
	    } else if ("Company".equalsIgnoreCase(customer.getType())) {
	        Customer company = new Company();
	        company.setType("Company");
	        company.setName(customer.getName());
	        company.setAddress(customer.getAddress());
	        return customerRepo.save(company);
	    } else {
	        throw new IllegalArgumentException("Invalid customer type: " + customer.getType());
	    }
	}

	
	public Customer updateCustomer(Customer customer) {
		if(customerRepo.existsById(customer.getCustomerId())) {
			return customerRepo.save(customer);
		}
		throw new CustomerNotFoundException(
				"Failed to update customer details, id = " + customer.getCustomerId() + " . New customer details not found.");
	}
	
	public Address updateAddress(long customerId, Address newAddress) {
        if(newAddress!=null) {
        	Customer customer = getCustomer(customerId);
        customer.setAddress(newAddress);
        customerRepo.save(customer); 
        return newAddress;
        }
		throw new AddressNotFoundException(
				"Failed to update address details, customerId = " + customerId + " . New address details not found.");
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
