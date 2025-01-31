import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/styles.css";

const LoginPage = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    const handleLogin = (e) => {
      e.preventDefault();

      if ((!username && !password)) {
        alert("All fields are required.");
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.find(user => user.username === username && user.password === password);

      if (userExists) {
        console.log("User exists: ", userExists);
        setIsLogged(true);
        navigate("/");
      } else {
        console.log("Incorrect credentials or user not found.");
        alert("Incorrect credentials or user not found.");
      }

    };
  
    return (
      <div>
  
        {/* Main Content */}
        <main>
            <h2 className="login-header">Login</h2>
            <form className="login" onSubmit={handleLogin}>
                <span
                >Good to see you back! Please login below with your company
              credentials.</span>
            
                <label htmlFor="username">Username: </label>
                <input
                type="text"
                name="username"
                required
                placeholder="Ex: caleb.mcintyre"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
            
                <label name="password">Password: </label>
                <input
                type="password"
                name="password"
                required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
                />
                <button type="login" className="btn btn-info">Login</button>
            </form>

        </main>
      </div>
    );
  };
  
  export default LoginPage;