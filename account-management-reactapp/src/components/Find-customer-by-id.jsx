import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/styles.css";

const FindCustomerByIdPage = () => {
    const [customerId, setCustomerId] = useState('');
    const [customer, setCustomer] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!customerId) {
            alert('Please enter a customer ID.');
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const response = await axios.get(`http://localhost:8090/sprint4-api/customers/${customerId}`);
            setCustomer(response.data);
        } catch (err) {
            setError('Customer not found or error occurred. Please try again.');
            console.error("Error fetching customer: ", err);
        } finally {
            setIsLoading(false);
        }
    };
  
    return (
      <div>
  
        {/* Main Content */}
        <main>
            <form className="find-customer-by-id-form" onSubmit={handleSubmit}>
                <h2>Find customer by ID</h2>
                <label htmlFor="custId">Enter customer ID: </label>
                <input id="custId" type="value" name="custId" value={customerId}
                onChange={(e) => setCustomerId(e.target.value)} />
                <button type="submit" className="btn btn-info">Search</button>
            </form>

                
            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {customer && (
                <div className="customer-details">
                    <h3>Customer Details</h3>
                    <p><strong>ID:</strong> {customer.customerId}</p>
                    <p><strong>Name:</strong> {customer.name}</p>
                    <p><strong>Address:</strong></p>
                    {customer.address ? (
                        <ul>
                            <li><strong>Street Number:</strong> {customer.address.streetNumber}</li>
                            <li><strong>City:</strong> {customer.address.city}</li>
                            <li><strong>Province:</strong> {customer.address.province}</li>
                            <li><strong>Postal Code:</strong> {customer.address.postalCode}</li>
                        </ul>
                    ) : (
                        <p>No address available</p>
                    )}
                </div>
            )}
        </main>
      </div>
    );
  };
  
  export default FindCustomerByIdPage;