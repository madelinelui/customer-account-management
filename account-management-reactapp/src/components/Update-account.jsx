import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updateCheckingAccount, updateSavingsAccount } from '../apiService';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/styles.css";

const UpdateAccountPage = () => {
  const [accountId, setAccountId] = useState('');
  const [type, setType] = useState("");
  const [balance, setBalance] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedAccount = JSON.parse(localStorage.getItem('account'));
    if (storedAccount) {
      setAccountId(storedAccount.accountId);
      setType(storedAccount.type);
      setBalance(storedAccount.balance);
      setInterestRate(storedAccount.interestRate);
      localStorage.removeItem('accountId');
      localStorage.removeItem('type');
      localStorage.removeItem('balance');
      localStorage.removeItem('interestRate');
      fetchAccountDetails(storedAccount);
    }
  }, []);

  const fetchAccountDetails = async (account) => {
    try {
      setAccountId(account.accountId);
      setType(account.type);
      setBalance(account.balance);
      setInterestRate(account.interestRate);
    } catch (error) {
      console.error("Failed to fetch account: ", error);
      alert("Could not fetch account details. Please try again.");
    }
  }

  const handleSubmitSavings = async (e) => {
    e.preventDefault();

    try {
      const updatedAccount = {
        type: type,
        balance: balance,
        interestRate: interestRate
      };

      await updateSavingsAccount(accountId, updatedAccount);

      alert("Savings account updated successfully!");
      navigate("/accounts");
    } catch (error) {
      console.error("Failed to update account: ", error);
      alert("Could not update account. Please try again.");
    }
  };

  const handleSubmitChecking = async (e) => {
    e.preventDefault();

    try {
      const updatedAccount = {
        type: type,
        balance: balance,
      };

      await updateCheckingAccount(accountId, updatedAccount);

      alert("Checking account updated successfully!");
      navigate("/accounts");
    } catch (error) {
      console.error("Failed to update account: ", error);
      alert("Could not update account. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "Savings") {
      handleSubmitSavings(e);
    } else if (type === "Checking") {
      handleSubmitChecking(e);
    } else {
      alert("Please enter a valid account type.");
    }

  };

  return (
    <div>

      {/* Main Content */}
      <main>
        <form className="update-account-form" onSubmit={handleSubmit}>
          <h2>Update Existing Account</h2>
          <label htmlFor="accId">Enter existing account ID: </label>
          <input
            type="text"
            id="accId"
            name="accId"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
          />
          
          <label htmlFor="type">Account type: </label>
          <input type="text" name="type" id="type" value={type} readonly />
          
          <label htmlFor="balance">Balance: </label>
          <input type="text" name="balance" value={balance} onChange={(e) => setBalance(e.target.value)} />
          <label htmlFor="interestRate">Interest rate: </label>
          <input type="text" name="interestRate" value={interestRate} onChange={(e)=>setInterestRate(e.target.value)} placeholder='If applicable'/>
          <button type="submit" className="btn btn-info">
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default UpdateAccountPage;
