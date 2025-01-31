package com.fdmgroup.rest_api_repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import com.fdmgroup.restapirepository.repository.CustomerRepo;
import com.fdmgroup.restapirepository.service.AccountService;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import com.fdmgroup.restapirepository.RestApiRepositoryApplication;
import com.fdmgroup.restapirepository.model.Customer;
import com.fdmgroup.restapirepository.model.Person;
import com.fdmgroup.restapirepository.model.SavingsAccount;
import com.fdmgroup.restapirepository.model.Address;
import com.fdmgroup.restapirepository.model.CheckingAccount;
import com.fdmgroup.restapirepository.model.Company;
import com.fdmgroup.restapirepository.model.Account;

@SpringBootTest(
		  webEnvironment = SpringBootTest.WebEnvironment.MOCK,
		  classes = RestApiRepositoryApplication.class)
		@AutoConfigureMockMvc
		@TestPropertySource(
		  locations = "classpath:application-integrationtest.properties")
@Transactional
class RestApiRepositoryApplicationTests {

	@Autowired
    private MockMvc mvc;
	
	@Autowired
	private CustomerRepo customerRepo;
	
	@Mock
	private AccountService accService;
	
	private Customer customer3;
	private Address address3;
	private Account account4;
	private Account account5;
	
	@BeforeEach
    void setUp() {
        address3 = new Address("13", "G3 8PX", "Glasgow", "Lanarkshire");
        customer3 = new Company("Winergy Ltd", address3);
        account4 = new SavingsAccount(500, 4.5, customer3);
        account5 = new CheckingAccount(500, customer3);

        customer3.addAddress(address3);
        customer3.addAccount(account4);
        customer3.addAccount(account5);

        customerRepo.save(customer3);
	}
	
	@Test
	void mainMethod_loadsApplicationAndDatabaseIsInitialised() {
		
		RestApiRepositoryApplication.main(new String[] {});
		
		assertThat(customerRepo.findAll()).hasSize(5);
	}
	
	@Test
	void testGetMapping_getAllCustomers_returnAllCustomers200() throws Exception {
		
		mvc.perform(get("/sprint4-api/customers")
		        .contentType(MediaType.APPLICATION_JSON))
		    .andExpect(status().isOk())
		    .andExpect(jsonPath("$.length()").value(5));
		
	}
	
	@Test
	void testGetMapping_getCustomer_returnCustomer200() throws Exception {
		
		mvc.perform(get("/sprint4-api/customers/"+1001)
		        .contentType(MediaType.APPLICATION_JSON))
		    .andExpect(status().isOk())
		    .andExpect(jsonPath("$.name").value("FDM"));
	}
	
	
	@Test
	void testGetMappingException_getCustomer_customerNotFound404() throws Exception {
		
		long invalidId = 999;
		
		mvc.perform(get("/sprint4-api/customers/"+invalidId)
		        .contentType(MediaType.APPLICATION_JSON))
		    .andExpect(status().isNotFound())
		    .andExpect(content().string("Customer with ID "+invalidId+" not found."));
		
	}
	

	@Test
	void testGetMapping_getAllAccounts_returnAllAccounts200() throws Exception {
		mvc.perform(get("/sprint4-api/accounts")
		        .contentType(MediaType.APPLICATION_JSON))
		    .andExpect(status().isOk());
	}
	
	@Test
	void testGetMapping_getAccount_returnAccount200() throws Exception {
		mvc.perform(get("/sprint4-api/accounts/"+account4.getAccountId())
		        .contentType(MediaType.APPLICATION_JSON))
		    .andExpect(status().isOk())
		    .andExpect(jsonPath("$.balance").value(500));
	}
	
	@Test
	void testGetMappingException_getAccount_accountNotFound404() throws Exception {
		long invalidId = 999;
		
		mvc.perform(get("/sprint4-api/accounts/"+invalidId)
		        .contentType(MediaType.APPLICATION_JSON))
		    .andExpect(status().isNotFound())
		    .andExpect(content().string("Account not found for id = "+invalidId));
		
	}
	
	@Test
	void test_PutMapping_updateCustomer_return200() throws Exception {
		
		String updatedCustomerJson = """
				{
			    "name": "Winergy Ltd"
			 
				}
				""";
		
		mvc.perform(put("/sprint4-api/customers/"+customer3.getCustomerId())
	            .contentType(MediaType.APPLICATION_JSON)
				.content(updatedCustomerJson))
	            .andExpect(status().isOk());
	}

	@Test
	void test_PutMapping_updateCustomer_BadRequest_return400() throws Exception {
		String updatedCustomerJson = """
				{
			    "name": ""
			    
				}
				""";
		mvc.perform(put("/sprint4-api/customers/"+customer3.getCustomerId())
	            .contentType(MediaType.APPLICATION_JSON)
				.content(updatedCustomerJson))
	            .andExpect(status().isBadRequest())
	            .andExpect(content().string("Name cannot be empty."));
	}

	@Test
	void test_PutMapping_updateAddress_return200() throws Exception {
		
		String updatedAddressJson = """
				{
			        "streetNumber": "14",
			        "postalCode": "G3 8PX",
			        "city": "Glasgow",
			        "province": "Lanarkshire"
				}
				""";
		
		mvc.perform(put("/sprint4-api/customers/"+customer3.getCustomerId()+"/address")
	            .contentType(MediaType.APPLICATION_JSON)
				.content(updatedAddressJson))
	            .andExpect(status().isOk());
		
	}
	
	@Test
	void test_PutMapping_updateAddress_fail_return400() throws Exception {
		String updatedAddressJson = """
				{
			        "streetNumber": "14",
			        "postalCode": "",
			        "city": "Glasgow",
			        "province": "Lanarkshire"
				}
				""";
		
		mvc.perform(put("/sprint4-api/customers/"+customer3.getCustomerId()+"/address")
	            .contentType(MediaType.APPLICATION_JSON)
				.content(updatedAddressJson))
	            .andExpect(status().isBadRequest())
	            .andExpect(content().string("Postal code cannot be empty."));
	}
	
	@Test
	void test_PutMapping_updateSavingsAccount_return200() throws Exception {
		String updateSavings = """
				{
				  "balance": 200.0,
				  "interestRate": 1.3
				}
				""";
		mvc.perform(put("/sprint4-api/accounts/savings/"+account4.getAccountId())
	            .contentType(MediaType.APPLICATION_JSON)
				.content(updateSavings))
	            .andExpect(status().isOk());
		
	}
	
	@Test
	void test_PutMapping_updateCheckingAccount_return200() throws Exception {
		
		String updateChecking = """
				{
				  "balance": 300.0
				}
				""";
		mvc.perform(put("/sprint4-api/accounts/checking/"+account5.getAccountId())
	            .contentType(MediaType.APPLICATION_JSON)
				.content(updateChecking))
	            .andExpect(status().isOk());
	}
	
	@Test
	void test_PutMapping_updateSavingsAccount_fail_return404() throws Exception {
		
		String updateSavings = """
				{
				  "balance": 300.0,
				  "interestRate": 1.3
				}
				""";
		mvc.perform(put("/sprint4-api/accounts/savings/"+999)
	            .contentType(MediaType.APPLICATION_JSON)
				.content(updateSavings))
	            .andExpect(status().isNotFound())
	            .andExpect(content().string("Account not found for id = "+999));
	}
	
	@Test
	void test_PutMapping_updateCheckingAccount_fail_return404() throws Exception {
		
		String updateChecking = """
				{
				  "balance": 200
				}
				""";
		mvc.perform(put("/sprint4-api/accounts/checking/"+999)
	            .contentType(MediaType.APPLICATION_JSON)
				.content(updateChecking))
	            .andExpect(status().isNotFound())
	            .andExpect(content().string("Account not found for id = "+999));
	}
	
	@Test
	void test_DeleteMapping_deleteCustomer_return200() throws Exception {
		
		mvc.perform(delete("/sprint4-api/customers/"+customer3.getCustomerId())
	            .contentType(MediaType.APPLICATION_JSON))
	            .andExpect(status().isOk());
	}
	
	@Test
	void test_DeleteMapping_deleteCustomer_fail_return404() throws Exception {
		mvc.perform(delete("/sprint4-api/customers/"+999)
	            .contentType(MediaType.APPLICATION_JSON))
	            .andExpect(status().isNotFound())
	            .andExpect(content().string("Customer not found for id = "+999));
	}
	
	@Test
	void test_DeleteMapping_deleteAccount_return200() throws Exception {
		mvc.perform(delete("/sprint4-api/accounts/"+account4.getAccountId())
	            .contentType(MediaType.APPLICATION_JSON))
	            .andExpect(status().isOk());
	}
	
	@Test
	void test_DeleteMapping_deleteAccount_fail_return404() throws Exception {
		mvc.perform(delete("/sprint4-api/accounts/"+999)
	            .contentType(MediaType.APPLICATION_JSON))
	            .andExpect(status().isNotFound())
	            .andExpect(content().string("Account not found for id = "+999));
	}
	
	@Test
    void testGetAccountsInCity_returnAccounts() throws Exception {
        // Arrange
        String city = "Glasgow";

        // Act & Assert
        mvc.perform(get("/sprint4-api/accounts/find-by-city/"+city)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
        }

    @Test
    void testGetAccountsInCity_returnNull() throws Exception {
        // Arrange
        String city = "NonExistentCity";

        // Act & Assert
        mvc.perform(get("/sprint4-api/accounts/find-by-city/"+city)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").doesNotExist());
    }


}
