import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCustomerById, updateCustomer } from '../apiService';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/styles.css";

const UpdateCustomerPage = () => {
    const [customerId, setCustomerId] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [streetNumber, setStreetNumber] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
        const storedCustomer = JSON.parse(localStorage.getItem('customer'));
        if (storedCustomer) {
            setCustomerId(storedCustomer.customerId);
            setCustomerName(storedCustomer.name);
            setCustomerAddress(storedCustomer.address);
            localStorage.removeItem('customerId');
            localStorage.removeItem('customerName');
            localStorage.removeItem('customerAddress');
            fetchCustomerDetails(storedCustomer);
        }
    }, []);

    const fetchCustomerDetails = async (customer) => {
        try {
            setCustomerId(customer.customerId);
            setCustomerName(customer.name);
            setCustomerAddress(customer.address);
        } catch (error) {
          console.error('Failed to fetch customer:', error);
          alert('Could not fetch customer details. Please try again.');
        }
      };
  
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const updatedCustomer = {
                name: customerName,
                address: {
                    streetNumber: streetNumber,
                    city: city,
                    province: province,
                    postalCode: postalCode
                }
            };
        
        await updateCustomer(customerId, updatedCustomer);

        alert('Customer updated successfully!');
        navigate('/customers');
        } catch (error) {
            console.error('Failed to update customer:', error);
            alert('Could not update customer. Please try again.');
        }
};


  return (
    <div>

        {/* Main Content */}
        <main>
            <form className="update-customer-form" onSubmit={handleSubmit}>
            <h2 className="update-customer-header">Update Existing Customer</h2>
            <label htmlFor="custId">Enter current customer ID: </label>
            <input
                type="text"
                id="custId"
                name="custId"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
            />
            <br />
            <label htmlFor="name">Edit customer name: </label>
            <input
                type="text"
                id="name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
            />
            <br />
                  <label htmlFor="address">Edit customer address: </label> <br />
                  <label htmlFor="streetNumber">Street number: </label>
                  <input type="text" id="streetNumber" name="streetNumber" value={streetNumber} onChange={(e) => setStreetNumber(e.target.value)} />
                  <label htmlFor="postalCode">Postal code: </label>
                  <input type="text" id="postalCode" name="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                  <label htmlFor="city">City: </label>
                  <input type="text" id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} />
                  <label htmlFor="province">Province: </label>
                  <input type="text" id="province" name="province" value={province} onChange={(e) => setProvince(e.target.value)} />
                  
            <button type="submit" className="btn btn-info">Submit</button>
            </form>
        </main>
        </div>
    );
    };

export default UpdateCustomerPage;
