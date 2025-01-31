package com.fdmgroup.restapirepository.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class CustomerFailedToUpdateException extends RuntimeException {
	
	public CustomerFailedToUpdateException(String message) {
		super(message);
	}
}
