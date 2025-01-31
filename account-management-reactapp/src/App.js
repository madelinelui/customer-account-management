import './App.css';
import Layout from "./components/Layout"; 
import Home from './components/Home';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import Accounts from './components/Accounts';
import AddNewAccountPage from './components/Add-new-account';
import AddNewCustomerPage from './components/Add-new-customer';
import Customers from './components/Customers';
import DeleteAccountPage from './components/Delete-account';
import DeleteCustomerPage from './components/Delete-customer';
import FindAccountByBalancePage from './components/Find-account-by-balance';
import FindAccountByIdPage from './components/Find-account-by-id';
import FindAccountsByCustId from './components/FindAccountsByCustId';
import FindCustomerById from './components/Find-customer-by-id';
import UpdateAccountPage from './components/Update-account';
import UpdateCustomerPage from './components/Update-customer';
import Users from './components/Users';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/add-new-account" element={<AddNewAccountPage />} />
          <Route path="/add-new-customer" element={<AddNewCustomerPage />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/delete-account" element={<DeleteAccountPage />} />
          <Route path="/delete-customer" element={<DeleteCustomerPage />} />
          <Route path="/find-account-by-balance" element={<FindAccountByBalancePage/>}/>
          <Route path="/find-account-by-id" element={<FindAccountByIdPage />} />
          <Route path="/find-accounts-by-customer-id" element={<FindAccountsByCustId/>}/>
          <Route path="/find-customer-by-id" element={<FindCustomerById/>}/>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/update-account" element={<UpdateAccountPage/>}></Route>
          <Route path="/update-customer" element={<UpdateCustomerPage />} />
          <Route path="/users" element={<Users/>}/>
          </Routes>
          </Layout>
      </Router>
    </div>
  );
}

export default App;
