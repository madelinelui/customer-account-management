import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/styles.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {

    if ((!username && !password)) {
      alert("All fields are required.");
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = { username, password };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("User registered successfully!")
    navigate("/users");
  }
  
    return (
      <div>
  
        {/* Main Content */}
        <main>
            <h2 className="register-header">Register</h2>
            <form className="register" onSubmit={handleRegister}>
            <span>Don't have an account? Register below.</span>
            
                <label htmlFor="username">Create a username: </label>
                <input
                type="text"
                name="username"
                required
                placeholder="Ex: caleb.mcintyre"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
            
                <label htmlFor="password">Create your password: </label>
                <input
                type="password"
                name="password"
                pattern=".{8,}"
                required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
                />
                <button type="submit" className="btn btn-info">Register</button>
            </form>

        </main>
      </div>
    );
  };
  
  export default RegisterPage;