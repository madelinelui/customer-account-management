import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/styles.css";

const Accounts = () => {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchAccounts();
    }, []);
        
    const fetchAccounts = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("http://localhost:8090/sprint4-api/accounts");
            setAccounts(response.data);
        } catch (error) {
            console.error("Error fetching accounts: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    const navigateToUpdatePage = (account) => {
        localStorage.setItem("account", JSON.stringify(account));
        navigate(`/update-account`);
    };

    const navigateToAddAccPage = (account) => {
        navigate(`/add-new-account`);
    };

    return (
        <div>

        {/* Main Content */}
        <main>
            <h2 className="accounts-table-title">All Accounts</h2>
            <table className="table accounts-table" style={{ width: "80%" }}>
            <thead>
                <tr>
                            <th>Account ID</th>
                            <th>Account type</th>
                <th>Account balance / £</th>
                <th>Interest rate / %</th>
                <th>Actions</th>
                </tr>
            </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                                accounts.map(account => (
                                    <tr key={account.accountId}>
                                        <td>{account.accountId}</td>
                                        <td>{account.type}</td>
                                        <td>{account.balance}</td>
                                        <td>{account.interestRate ? account.interestRate : "n/a"}</td>
                                        <td>
                                            <button className="btn btn-warning" onClick={() => navigateToUpdatePage(account)}>
                                                Update
                                            </button>
                                        </td>
                                    </tr>
                                ))
                        )}
                        
                    </tbody>
            </table>
            <button
          className="btn btn-info add-account-quickaction-btn"
          onClick={navigateToAddAccPage}
        >
          Add Account
        </button>
        </main>
        </div>
    );
    };

    export default Accounts;
