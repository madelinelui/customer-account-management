import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/styles.css";


const Home = () => {
    return (
      <div>
  
        {/* Main Content */}
        <main className="home">
          <h2>Welcome to the Customer and Account Management Web App!</h2>
          <h3>Manage your customers by navigating through the side-bar.</h3>
        </main>
      </div>
    );
  };
  
  export default Home;