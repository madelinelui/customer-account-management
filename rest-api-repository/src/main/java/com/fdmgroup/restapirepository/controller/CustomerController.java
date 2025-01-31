package com.fdmgroup.restapirepository.controller;

import java.net.URI;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fdmgroup.restapirepository.exception.AddressNotFoundException;
import com.fdmgroup.restapirepository.exception.CustomerFailedToUpdateException;
import com.fdmgroup.restapirepository.exception.CustomerNotFoundException;
import com.fdmgroup.restapirepository.model.Account;
import com.fdmgroup.restapirepository.model.Address;
import com.fdmgroup.restapirepository.model.Company;
import com.fdmgroup.restapirepository.model.Customer;
import com.fdmgroup.restapirepository.model.Person;
import com.fdmgroup.restapirepository.repository.CustomerRepo;
import com.fdmgroup.restapirepository.service.CustomerDTO;
import com.fdmgroup.restapirepository.service.CustomerService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/sprint4-api/customers")
public class CustomerController {
	private CustomerService customerService;
	private CustomerRepo customerRepo;
	
	@Autowired
	public CustomerController(CustomerService customerService) {
		this.customerService = customerService;
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Customer> getCustomer(@PathVariable long id) {
	    Customer customer = customerService.getCustomer(id);
	    return ResponseEntity.ok(customer);
	}
	
	@GetMapping("/{id}/get-all-accounts")
	public ResponseEntity<List<Account>> getAllAccountsByCustomerId(@PathVariable long id){
		List<Account> accountsOfCustomer = customerService.getAllAccountsByCustomerId(id);
		return ResponseEntity.ok(accountsOfCustomer);
	}
	
	@PostMapping("/add-new")
    public ResponseEntity<?> addCustomer(@RequestBody CustomerDTO newCustomer) {
        try {
        	if (newCustomer == null || newCustomer.getType() == null || newCustomer.getName() == null || newCustomer.getAddress() == null) {
                return ResponseEntity.badRequest().body("Customer type, name, and address cannot be null.");
            }
        	
        	Customer customer;

            if ("Person".equalsIgnoreCase(newCustomer.getType())) {
                customer = new Person();
            } else if ("Company".equalsIgnoreCase(newCustomer.getType())) {
                customer = new Company();
            } else {
                return ResponseEntity.badRequest().body("Invalid customer type: " + newCustomer.getType());
            }
        	
            customer.setType(newCustomer.getType());
            customer.setName(newCustomer.getName());

            Address address = new Address(
                    newCustomer.getAddress().getStreetNumber(),
                    newCustomer.getAddress().getPostalCode(),
                    newCustomer.getAddress().getCity(),
                    newCustomer.getAddress().getProvince()
                );

            customer.setAddress(address);
                
            Customer savedCustomer = customerService.addCustomer(customer);
            return ResponseEntity.ok(savedCustomer);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (CustomerNotFoundException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
	
	@PutMapping("/{id}")
	public ResponseEntity<Customer> updateCustomer(@PathVariable long id, @Valid @RequestBody CustomerDTO updatedCustomerDetails){
		Customer existingCustomer = customerService.getCustomer(id);
		
		if(existingCustomer != null) {
			existingCustomer.setName(updatedCustomerDetails.getName());
			existingCustomer.setAddress(updatedCustomerDetails.getAddress());
		}
		Customer updatedCustomer = customerService.updateCustomer(existingCustomer);
		
		if(updatedCustomer != null) {
			return ResponseEntity.ok(updatedCustomer);
		}
		throw new CustomerNotFoundException("Customer not found for id = "+id);
	}
	
	@PutMapping("/{id}/address")
    public ResponseEntity<Address> updateAddress(@PathVariable long id, @Valid @RequestBody Address newAddress) {
        Address updatedAddress = customerService.updateAddress(id, newAddress);
        return ResponseEntity.ok(updatedAddress);
    }
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteCustomer(@PathVariable long id){
		if(customerService.deleteCustomer(id)) {
			return ResponseEntity.status(HttpStatus.OK).build();
		}
		
		throw new CustomerNotFoundException("Customer not found for id = "+id);
	}
	
	@GetMapping
	public ResponseEntity<List<Customer>> getCustomers(){
		List<Customer> customers = customerService.listAllCustomers();
		
		return ResponseEntity.ok(customers);
	}
	
	

}
