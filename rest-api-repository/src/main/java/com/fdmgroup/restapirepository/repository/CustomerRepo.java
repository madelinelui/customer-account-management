package com.fdmgroup.restapirepository.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.fdmgroup.restapirepository.model.Account;
import com.fdmgroup.restapirepository.model.Customer;

import jakarta.transaction.Transactional;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, Long>{

	@Query("SELECT a FROM Account a WHERE a.customer.customerId = :id")
	List<Account> findAllAccountsByCustomerId(long id);
}
