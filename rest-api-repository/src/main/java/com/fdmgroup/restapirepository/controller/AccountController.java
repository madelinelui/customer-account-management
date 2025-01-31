package com.fdmgroup.restapirepository.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fdmgroup.restapirepository.exception.AccountNotFoundException;
import com.fdmgroup.restapirepository.model.Account;
import com.fdmgroup.restapirepository.model.CheckingAccount;
import com.fdmgroup.restapirepository.model.Customer;
import com.fdmgroup.restapirepository.model.SavingsAccount;
import com.fdmgroup.restapirepository.service.AccountService;
import com.fdmgroup.restapirepository.service.CheckingCreationDTO;
import com.fdmgroup.restapirepository.service.CheckingDTO;
import com.fdmgroup.restapirepository.service.SavingsCreationDTO;
import com.fdmgroup.restapirepository.service.SavingsDTO;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/sprint4-api/accounts")
public class AccountController {
	private AccountService accService;

	@Autowired
	public AccountController(AccountService accService) {
		this.accService = accService;
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Account> getAccount(@PathVariable long id) {
		Account account = accService.getAccount(id);
		if(account!=null) {
			return ResponseEntity.ok(account);
		}
	    throw new AccountNotFoundException("Account not found for id = "+id);
	}
	
	@PostMapping("/add-new-savings-account")
	public ResponseEntity<?> addSavingsAccount(@RequestBody SavingsCreationDTO savingsDetails) {
	    try {
	        if (savingsDetails == null) {
	            return ResponseEntity.badRequest().body("Account details cannot be null.");
	        }

	        Account savedAccount = accService.addSavingsAccount(savingsDetails);
	        return ResponseEntity.ok(savedAccount);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	    }
	}
	
	@PostMapping("/add-new-checking-account")
	public ResponseEntity<?> addCheckingAccount(@RequestBody CheckingCreationDTO checkingDetails) {
	    try {
	        if (checkingDetails == null) {
	            return ResponseEntity.badRequest().body("Account details cannot be null.");
	        }

	        Account savedAccount = accService.addCheckingAccount(checkingDetails);
	        return ResponseEntity.ok(savedAccount);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	    }
	}
	
	@PutMapping("/savings/{id}")
	public ResponseEntity<Account> updateSavings(@PathVariable long id, @Valid @RequestBody SavingsDTO updatedAccountDetails){
		SavingsAccount existingAccount = (SavingsAccount) accService.getAccount(id);
		
		if(existingAccount != null) {
			existingAccount.setBalance(updatedAccountDetails.getBalance());
			existingAccount.setInterestRate(updatedAccountDetails.getInterestRate());
			
			Account updatedAccount = accService.updateAccount(existingAccount);
			
			if(updatedAccount != null) {
				return ResponseEntity.ok(updatedAccount);
			}
		}
		throw new AccountNotFoundException("Account not found for id = "+id);
	}
	
	@PutMapping("/checking/{id}")
	public ResponseEntity<Account> updateChecking(@PathVariable long id, @Valid @RequestBody CheckingDTO updatedAccountDetails){
		Account existingAccount = accService.getAccount(id);
		
		if(existingAccount != null) {
			existingAccount.setBalance(updatedAccountDetails.getBalance());
			Account updatedAccount = accService.updateAccount(existingAccount);
			
			if(updatedAccount != null) {
				return ResponseEntity.ok(updatedAccount);
			}
		}
		throw new AccountNotFoundException("Account not found for id = "+id);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteAccount(@PathVariable long id){
		if(accService.deleteAccount(id)) {
			return ResponseEntity.status(HttpStatus.OK).build();
		}
		
		throw new AccountNotFoundException("Account not found for id = "+id);
	}
	
	@GetMapping("/find-by-city/{city}")
	    public ResponseEntity<List<Account>> getAccountsInCity(@PathVariable String city) {
	        List<Account> accounts = accService.findAccountsInCity(city);
	        return ResponseEntity.ok(accounts);
	}
	 
	@GetMapping("/find-by-balance")
	public ResponseEntity<List<Account>> getAccountsByBalance(@RequestParam long minBalance, @RequestParam long maxBalance){
		List<Account> accounts = accService.findAccountByBalance(minBalance, maxBalance);
		return ResponseEntity.ok(accounts);
	}
	
	@GetMapping
	public ResponseEntity<List<Account>> getAccounts(){
		List<Account> accounts = accService.listAllAccounts();
		
		return ResponseEntity.ok(accounts);
	}
	
	
	
}
