import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/styles.css";

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("http://localhost:8090/sprint4-api/customers");
            setCustomers(response.data);
        } catch (error) {
            console.error("Error fetching customers: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    const navigateToUpdateCustPage = (customer) => {
        localStorage.setItem('customer', JSON.stringify(customer));

        navigate('/update-customer');
    };

    const navigateToAddCustPage = () => {
        navigate('/add-new-customer');
    };

    return (
        <div>

        {/* Main Content */}
        <main>
            <h2 className="customers-table-title">All Customers</h2>
            <table className="table customers-table" style={{ width: '80%' }}>
          <thead>
            <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th colSpan="4">Address</th>
                <th>Actions</th>
            </tr>
                        <tr>
                            <th></th>
                            <th></th>
                            <th><small>Street</small></th>
                            <th><small>City</small></th>
                            <th><small>Province</small></th>
                            <th><small>Postal code</small></th>   
                            <th></th>
                        </tr>
                        
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              customers.map(customer => (
                <tr key={customer.customerId}>
                  <td>{customer.customerId}</td>
                  <td>{customer.name}</td>
                    <td>{customer.address ? customer.address.streetNumber : "No Street Number"}</td>
                    <td>{customer.address ? customer.address.city : "No City"}</td>
                    <td>{customer.address ? customer.address.province : "No Province"}</td>
                    <td>{customer.address ? customer.address.postalCode : "No Postal Code"}</td>
                      
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => navigateToUpdateCustPage(customer)}
                    >
                      Update
                    </button>

                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <button
          className="btn btn-info add-customer-quickaction-btn"
          onClick={navigateToAddCustPage}
        >
          Add Customer
        </button>
        </main>
        </div>
    );
    };

    export default Customers;
