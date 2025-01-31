import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/styles.css";

const Layout = ({ children }) => {
  return (
    <div>
      {/* Navigation Bar */}
      <ul className="nav-bar">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="customers-dropdown-menu">
          <Link to="/customers">Customers &#9658;</Link>
          <ul className="customers-dropdown-content">
            <li className="show-customers">
              <Link to="/customers">Show Customers &#9658;</Link>
              <ul className="find-customer-by">
                <li>
                  <Link to="/find-customer-by-id">Find by ID</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/add-new-customer">Add New Customer</Link>
            </li>
            <li>
              <Link to="/update-customer">Update Existing Customer</Link>
            </li>
            <li>
              <Link to="/delete-customer">Delete Customer</Link>
            </li>
          </ul>
        </li>
        <li className="accounts-dropdown-menu">
          <Link to="/accounts">Accounts &#9658;</Link>
          <ul className="accounts-dropdown-content">
            <li className="show-accounts">
              <Link to="/accounts">Show Accounts &#9658;</Link>
              <ul className="find-account-by">
                <li>
                  <Link to="/find-account-by-id">Find by ID</Link>
                </li>
                <li>
                  <Link to="/find-account-by-balance">Find by Balance</Link>
                              </li>
                              <li>
                                  <Link to="/find-accounts-by-customer-id">Find by Customer ID</Link>
                              </li>
              </ul>
            </li>
            <li>
              <Link to="/add-new-account">Add New Account</Link>
            </li>
            <li>
              <Link to="/update-account">Update Existing Account</Link>
            </li>
            <li>
              <Link to="/delete-account">Delete Existing Account</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>

      {/* Overlay */}
        <div className="overlay"></div>
                
        {/* Header */}
        <header>
          <h1>Customer and Account Management Web App</h1>
            </header>

      {/* Main Page Content */}
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
