import React, { useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/styles.css";

const DeleteAccountPage = () => {
  const [accountId, setAccountId] = useState("");
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [error, setError] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!accountId) {
        alert("Please enter an account ID.")
      }

      try {
        setIsLoading(true);
        const response = await axios.delete(`http://localhost:8090/sprint4-api/accounts/${accountId}`);
        setAccount(response.data);
        setDeleteStatus(true);
      } catch (error){
        setError("Failed to delete account. ", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div>
  
        {/* Main Content */}
        <main>
          <form className="delete-account-form" onSubmit={handleSubmit}>
            <h2>Delete Existing Account</h2>
            <label htmlFor="accId">Enter existing account ID: </label>
            <input type="text" id="accId" name="accId" value={accountId} onChange={ (e) => setAccountId(e.target.value)} /><br />
            <button type="submit" className="btn btn-danger">Delete Account</button>
          </form>

          {isLoading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          { deleteStatus && <p>Account deleted successfully!</p>}
        </main>
      </div>
    );
  };
  
  export default DeleteAccountPage;