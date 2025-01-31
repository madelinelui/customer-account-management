import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/styles.css";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers(storedUsers);
    }, []);

    return (
        <div>

          <h2>Registered Users</h2>
          {users.length > 0 ? (
          <table className="table users-table" style={{ width: "80 %"}}>
                  <thead>
                      <tr>
                          <th>User  ID</th>
                          <th>Username</th>
                      </tr>
                  </thead>
                  <tbody>
                      {users.map((user, index) => (
                          <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{user.username}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
) : (
    <p>No users registered yet.</p>
)}

        </div>
    );
}

export default Users;

