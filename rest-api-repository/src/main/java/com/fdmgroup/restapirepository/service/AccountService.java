package com.fdmgroup.restapirepository.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fdmgroup.restapirepository.exception.AccountNotFoundException;
import com.fdmgroup.restapirepository.model.Account;
import com.fdmgroup.restapirepository.model.CheckingAccount;
import com.fdmgroup.restapirepository.model.Customer;
import com.fdmgroup.restapirepository.model.SavingsAccount;
import com.fdmgroup.restapirepository.repository.AccountRepository;
import com.fdmgroup.restapirepository.repository.CustomerRepo;

@Service
public class AccountService {
	private AccountRepository accRepo;
	
	@Autowired
	private CustomerRepo customerRepo;

	@Autowired
	public AccountService(AccountRepository accRepo) {
		super();
		this.accRepo = accRepo;
	}
	
	public Account getAccount(long id) {
		return accRepo.findById(id).orElse(null);
	}

	public Account updateAccount(Account account) {
		if(accRepo.existsById(account.getAccountId())) {
			return accRepo.save(account); 
		}
		return null;
	}
	
	public boolean deleteAccount(long id) {
		if(accRepo.existsById(id)) {
			accRepo.deleteById(id);
			return true;
		} 
		return false;
	}
	
//	public Account addAccount(Account account) {
//		if (accRepo.existsById(account.getAccountId())) {
//			throw new AccountNotFoundException("Account not found for id: "+account.getAccountId());
//		}
//		
//		if (account.getType() == null) {
//			throw new IllegalArgumentException("Account type cannot be null.");
//		}
//		
//		Account newAccount = createAccount(account);
//		return accRepo.save(newAccount);
//	}
	
	public Account addCheckingAccount(CheckingCreationDTO checkingDetails) {
	    Customer customer = customerRepo.findById(checkingDetails.getCustomerId())
	            .orElseThrow(() -> new IllegalArgumentException("Customer not found for ID: " + checkingDetails.getCustomerId()));

	    CheckingAccount checkingAccount = new CheckingAccount();
	    checkingAccount.setType("Checking");
	    checkingAccount.setBalance(checkingDetails.getBalance());
	    checkingAccount.setCustomer(customer);

	    return accRepo.save(checkingAccount);
	}
	
	public Account addSavingsAccount(SavingsCreationDTO savingsDetails) {
	    Customer customer = customerRepo.findById(savingsDetails.getCustomerId())
	            .orElseThrow(() -> new IllegalArgumentException("Customer not found for ID: " + savingsDetails.getCustomerId()));

	    SavingsAccount savingsAccount = new SavingsAccount();
	    savingsAccount.setType("Savings");
	    savingsAccount.setBalance(savingsDetails.getBalance());
	    savingsAccount.setInterestRate(savingsDetails.getInterestRate());
	    savingsAccount.setCustomer(customer);

	    return accRepo.save(savingsAccount);
	}
	
//	private Account createAccount(Account account) {
//		switch (account.getType().toLowerCase()) {
//		case "savings":
//			if(!(account instanceof SavingsAccount)) {
//				throw new IllegalArgumentException("A savings account requires an interest rate.");
//			}
//			SavingsAccount saving = new SavingsAccount();
//			saving.setType("Savings");
//			saving.setBalance(account.getBalance());
//			saving.setInterestRate(((SavingsAccount) account).getInterestRate());
//			saving.setCustomer(account.getCustomer());
//			return saving;
//			
//		case "checkings":
//			CheckingAccount checking = new CheckingAccount();
//			checking.setType("Checkings");
//			checking.setBalance(account.getBalance());
//			checking.setCustomer(account.getCustomer());
//			return checking;
//			
//		default:
//			throw new IllegalArgumentException("invalid account type: "+account.getType());
//		}
//	}
	
	public List<Account> findAccountsInCity(String city) {
        List<Account> accountsInCity = accRepo.findAccountsInCity(city);
        if (!accountsInCity.isEmpty()) {
        	return accountsInCity;
        }
        return null;
    }
	
	public List<Account> findAccountByBalance(long minBalance, long maxBalance) {
		List<Account> accounts = accRepo.findAccountByBalance(minBalance, maxBalance);
		if(!accounts.isEmpty()) {
			return accounts;
		}
		return null;
	}
	
	public List<Account> listAllAccounts(){
		return accRepo.findAll();
	}
	
}
