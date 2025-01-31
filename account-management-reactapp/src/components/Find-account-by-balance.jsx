import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/styles.css";

const FindAccountByBalancePage = () => {
  const [accountId, setAccountId] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [minBalance, setMinBalance] = useState("");
  const [maxBalance, setMaxBalance] = useState("");
  const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!minBalance || !maxBalance) {
        alert("Please enter a value for the range you're looking for.");
      }

      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:8090/sprint4-api/accounts/find-by-balance`,
          {
            params: { 
              minBalance: minBalance, 
              maxBalance: maxBalance 
            }}
        );
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching account: ", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div>
  
        {/* Main Content */}
        <main>
            <form className="find-account-by-balance-form" onSubmit={handleSubmit}>
            <h2 className="find-account-by-balance-header">Find account by balance</h2>
            <label htmlFor="balance"
            >Search for accounts with a balance in range: </label><br />
            <label htmlFor="minBalance">min: </label>
            <input type="value" name="minBalance" value={minBalance} onChange={ (e)=>setMinBalance(e.target.value)} />
            <label htmlFor="maxBalance">max: </label>
            <input type="value" name="maxBalance" value={ maxBalance} onChange={(e) =>setMaxBalance(e.target.value)} />
            <button type="submit" className="btn btn-info">Search</button>
         </form>

          {isLoading && <p>Loading...</p>}
          
          {accounts.length > 0 ? (
            <div className="account-details-findbybalance">
              <h3>Accounts: </h3>
              <table className="table accounts-findbybalance-table" style={{ width: "80%" }}>
              <thead>
                <tr>
                            <th>Account ID</th>
                            <th>Account type</th>
                <th>Account balance / £</th>
                <th>Interest rate / %</th>
                </tr>
            </thead>
                <tbody>
                  {accounts.map((account => (
                    <tr key={account.accountId}>
                      <td>{account.accountId}</td>
                      <td>{account.type}</td>
                      <td>{account.balance}</td>
                      <td>{account.interestRate ? account.interestRate : "N/A"}</td>
                    </tr>
                  )))}
            </tbody>
            </table>
            </div>
          ) : accounts.length ===0 && !isLoading && (
          <p>No accounts found for given range of balance.</p>
                
          )}
        </main>
      </div>
    );
  };
  
  export default FindAccountByBalancePage;