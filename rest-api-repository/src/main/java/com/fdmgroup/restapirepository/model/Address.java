package com.fdmgroup.restapirepository.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name="ADDRESS")
public class Address {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ADDRESS_ID")
	private long addressId;
	
	@Column(name = "STREET_NUMBER", nullable = false)
	@NotBlank(message="Street number cannot be empty.")
	private String streetNumber;
	
	@Column(name = "POSTAL_CODE", nullable = false)
	@NotBlank(message="Postal code cannot be empty.")
	private String postalCode;
	
	@Column(name = "CITY", nullable = false)
	@NotBlank(message="City cannot be empty.")
	private String city;
	
	@Column(name = "PROVINCE", nullable = false)
	@NotBlank(message="Province cannot be empty.")
	private String province;
	
	Address(){}
	
	public Address(String streetNumber, String postalCode, String city, String province) {
		super();
		this.streetNumber = streetNumber;
		this.postalCode = postalCode;
		this.city = city;
		this.province = province;
	}

	public long getAddressId() {
		return addressId;
	}

	public void setAddressId(long addressId) {
		this.addressId = addressId;
	}

	public String getStreetNumber() {
		return streetNumber;
	}

	public void setStreetNumber(String streetNumber) {
		this.streetNumber = streetNumber;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	@Override
	public String toString() {
		return "Address [addressId=" + addressId + ", streetNumber=" + streetNumber + ", postalCode=" + postalCode
				+ ", city=" + city + ", province=" + province + "]";
	}
	
	
}
