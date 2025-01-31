package com.fdmgroup.restapirepository.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fdmgroup.restapirepository.model.Account;

public interface AccountRepository extends JpaRepository<Account, Long>{

	@Query("SELECT a FROM Account a WHERE a.customer.address.city = :city")
	List<Account> findAccountsInCity(String city);
	
	@Query("SELECT a FROM Account a WHERE a.balance >= :minBalance AND a.balance <= :maxBalance")
	List<Account> findAccountByBalance(@Param("minBalance") Long minBalance, @Param("maxBalance") Long maxBalance);
}
