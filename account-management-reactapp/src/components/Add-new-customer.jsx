import React, { Component,  useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.css';

const AddNewCustomerPage = () => {
    const navigate = useNavigate();

    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [streetNumber, setStreetNumber] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payLoad = {
            type,
            name,
            address: {
                streetNumber,
                postalCode,
                city,
                province,
            },
        };

        try {
            const response = await fetch("http://localhost:8090/sprint4-api/customers/add-new", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payLoad),
            });
      
            if (response.ok) {
              alert("Customer added successfully!");
              navigate("/customers");
            } else {
              alert("Failed to add customer.");
            }
          } catch (error) {
            console.error("Error adding customer:", error);
            alert("An error occurred while adding the customer.");
          }

    };

    return (
        <div>

        {/* Main Content */}
        <main>
          <form className="new-customer-form" onSubmit={handleSubmit}>
            <h2>Add New Customer</h2>

                <label>Type:</label>
                    <select value={type} onChange={(e) => setType(e.target.value)} required>
                        <option value="">Select Type</option>
                        <option value="Person">Person</option>
                        <option value="Company">Company</option>
                </select>
               

                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
               
                {/* Address Fields */}
                <h3>Address</h3>
                    <label>Street Number:</label>
                    <input
                        type="text"
                        value={streetNumber}
                        onChange={(e) => setStreetNumber(e.target.value)}
                        required
                    />

                    <label>Postal Code:</label>
                    <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    />

                    <label>City:</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />

                    <label>Province:</label>
                    <input
                        type="text"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        required
                    />


                <button type="submit">Add Customer</button>
            </form>
        </main>
        </div>
    );
};

export default AddNewCustomerPage;

