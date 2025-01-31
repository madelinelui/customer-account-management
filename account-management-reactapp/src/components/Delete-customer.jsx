import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/styles.css";

const DeleteCustomerPage = () => {
  const [customerId, setCustomerId] = useState("");
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [error, setError] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!customerId) {
        alert("Please enter a customer ID.")
      }

      try {
        setIsLoading(true);
        const response = await axios.delete(`http://localhost:8090/sprint4-api/customers/${customerId}`);
        setCustomer(response.data);
        setDeleteStatus(true);
      } catch (error){
        setError("Failed to delete customer. ", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div>
  
        {/* Main Content */}
        <main>
          <form className="delete-customer-form" onSubmit={handleSubmit}>
            <h2>Delete Existing Customer</h2>
            <label htmlFor="custId">Enter existing customer ID: </label>
            <input type="text" id="custId" name="custId" value={customerId} onChange={(e) => setCustomerId(e.target.value)} /><br />
            <button type="submit" className="btn btn-danger">Delete Customer</button>
          </form>

          {isLoading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {deleteStatus && <p>Customer deleted successfully!</p>}

        </main>
      </div>
    );
  };
  
  export default DeleteCustomerPage;