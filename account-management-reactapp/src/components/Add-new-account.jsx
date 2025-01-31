import React, { Component, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.css';

const AddNewAccountPage = () => {
  const navigate = useNavigate();

  const [type, setType] = useState("");
  const [balance, setBalance] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [customerId, setCustomerId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "Checking") {
      handleSubmitChecking(e);
    } else if (type === "Savings") {
      handleSubmitSavings(e);
    } else {
      alert("Please select an account type.");
    }

    
  }

  const handleSubmitChecking = async (e) => {
    e.preventDefault();

    const checkingPayLoad = {
      type,
      balance,
      customerId,
    };

    try {
      const response = await fetch("http://localhost:8090/sprint4-api/accounts/add-new-checking-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkingPayLoad),
      });

      if (response.ok) {
        alert("Account added successfully!");
        navigate("/accounts");
      } else {
        alert("Failed to add account.");
      }
    } catch (error) {
      console.error("Error adding account: ", error);
      alert("An error occured while adding the account.");
    }
  };

  const handleSubmitSavings = async (e) => {
      e.preventDefault();
    
      const savingsPayLoad = {
        type,
        balance,
        interestRate,
        customerId,
      };

      try {
        const response = await fetch("http://localhost:8090/sprint4-api/accounts/add-new-savings-account", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(savingsPayLoad),
        });

        if (response.ok) {
          alert("Account added successfully!");
          navigate("/accounts");
        } else {
          alert("Failed to add account.");
        }
      } catch (error) {
        console.error("Error adding account: ", error);
        alert("An error occured while adding the account.");
      }
    }

    return (
      <div>

        {/* Main Content */}
        <main>
          
          <form className="new-account-form" onSubmit={handleSubmit}>
          <h2>Add New Account</h2>
            <label htmlFor="customerId">Enter customer ID: </label>
            <input type="text" name="customerId" value={customerId} onChange={(e) => setCustomerId(e.target.value)} required></input>
            
            <label htmlFor="type">Account Type: </label>
            <select value={type} onChange={(e) => setType(e.target.value)} required>
              <option value="">Select Type</option>
              <option value="Checking">Checking</option>
              <option value="Savings">Savings</option>
            </select>
            
            
            <label htmlFor="balance">Set Balance: </label>
            <input type="text" name="balance" value={balance} onChange={(e) => setBalance(e.target.value)}></input>

            <label htmlFor="interestRate">Set Interest Rate: </label>
            <input
              type="text"
              name="interestRate"
              placeholder="If applicable"
              value={interestRate}
              onChange={(e)=>setInterestRate(e.target.value)}
            />
            <button type="submit" className="btn btn-info">Submit</button>
          </form>
        </main>
      </div>
    );
  };

  export default AddNewAccountPage;
