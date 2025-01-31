import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/styles.css";

const FindAccountByIdPage = () => {
  const [accountId, setAccountId] = useState("");
  const [account, setAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!accountId) {
        alert("Please enter an account ID.");
      }

      try {
        setIsLoading(true);
        
        const response = await axios.get(`http://localhost:8090/sprint4-api/accounts/${accountId}`);
        setAccount(response.data);
      } catch (error) {
        setError("Account not found, please try again.");
        console.error("Error fetching account: ", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div>
  
        {/* Main Content */}
        <main>
            <form className="find-account-by-id-form" onSubmit={handleSubmit}>
                <h2 className="find-account-by-id-header">Find account by ID</h2>
                <label htmlFor="accId">Enter account ID: </label>
            <input type="value" name="accId" value={accountId} onChange={ (e)=>setAccountId(e.target.value)} />
                <button type="submit" className="btn btn-info">Search</button>
            </form>

          {isLoading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {account && (
            <div className="account-details">
              <h3>Account Details</h3>
              <p>ID: {account.accountId}</p>
              <p>Type: {account.type}</p>
              <p>Balance: {account.balance}</p>
              <p>Interest rate: { account.interestRate ? account.interestRate : "N/A"}</p>
            </div>
          )}

        </main>
      </div>
    );
  };
  
  export default FindAccountByIdPage;