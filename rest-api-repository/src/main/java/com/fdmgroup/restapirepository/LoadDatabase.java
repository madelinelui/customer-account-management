package com.fdmgroup.restapirepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fdmgroup.restapirepository.model.Address;
import com.fdmgroup.restapirepository.model.Company;
import com.fdmgroup.restapirepository.model.Customer;
import com.fdmgroup.restapirepository.model.Person;
import com.fdmgroup.restapirepository.model.Account;
import com.fdmgroup.restapirepository.model.SavingsAccount;
import com.fdmgroup.restapirepository.model.CheckingAccount;

import com.fdmgroup.restapirepository.repository.CustomerRepo;

@Configuration
public class LoadDatabase {

	@Bean
	CommandLineRunner initDatabase(CustomerRepo customerRepo) {
		return args -> {
			
			Address address1 = new Address("13 Kenworth Street", "T3R 3E3", "Toronto", "Ontario");
			Customer customer1 = new Company("company" ,"FDM", address1);
			Account savings1 = new SavingsAccount("Savings", 2300.0, 4.5, customer1);
			customer1.addAddress(address1);
			customer1.addAccount(savings1);
			
			Address address2 = new Address("2 Queen Street", "R43 6Y6", "Caledon", "Ontario");
			Customer customer2 = new Person("person","John", address2);
			Account savings2 = new SavingsAccount("Savings", 45000.0, 5.0, customer2);
			Account checking1 = new CheckingAccount("Checking", 120.0, customer2);
			customer2.addAddress(address2);
			customer2.addAccount(savings2);
			customer2.addAccount(checking1);
			
			customerRepo.save(customer1);
			customerRepo.save(customer2);
			
			
		};
	}
}
