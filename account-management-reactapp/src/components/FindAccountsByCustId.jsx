import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/styles.css";

const FindAccountsByCustId = () => {
  const [customerId, setCustomerId] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!customerId) {
          alert("Please enter a customer ID.");
          return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:8090/sprint4-api/customers/${customerId}/get-all-accounts`);
        setAccounts(response.data);

          console.log("Fetched accounts:", response.data);
          

      } catch (error) {
        setError("Accounts not found, please try again.");
        console.error("Error fetching account: ", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div>
  
        {/* Main Content */}
        <main>
            <form className="find-account-by-custid-form" onSubmit={handleSubmit}>
                <h2>Find accounts by Customer ID</h2>
                <label htmlFor="custId">Enter customer ID: </label>
            <input id="custId" type="value" name="custId" value={customerId} onChange={ (e)=>setCustomerId(e.target.value)} />
                <button type="submit" className="btn btn-info">Search</button>
            </form>



          {isLoading && <p>Loading...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                
          {accounts.length>0 && (
            <div className="account-details">
              <h3>Account Details</h3>
              <table className="table accounts-by-custId-table" style={{width:"80%"}}>
              <thead>
                <tr>
                  <th>Account ID</th>
                  <th>Type</th>
                  <th>Balance</th>
                  <th>Interest Rate</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.accountId}>
                    <td>{account.accountId}</td>
                    <td>{account.type}</td>
                    <td>{account.balance}</td>
                    <td>{account.interestRate ? account.interestRate : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        </main>
      </div>
    );
  };
  
  export default FindAccountsByCustId;