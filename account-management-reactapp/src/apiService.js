import axios from 'axios';

const API_BASE_URL = 'http://localhost:8090/sprint4-api';

// Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Error:', error.response || error.message);
      return Promise.reject(error);
    }
  );

// ----------------------- Customers API ------------------------- //
export const getCustomers = async () => {
  const response = await apiClient.get('/customers');
  return response.data;
};

export const getCustomerById = async (id) => {
  const response = await apiClient.get(`/customers/${id}`);
  return response.data;
};

export const updateCustomer = async (id, customerData) => {
  const response = await apiClient.put(`/customers/${id}`, customerData);
  return response.data;
};

export const deleteCustomer = async (id) => {
    const response = await apiClient.delete(`/customers/${id}`);
    return response.data;
}

export const addCustomer = async (customerData) => {
    const response = await apiClient.post(`/customers/add-new`, customerData);
    return response.data;
}

// ---------------------- ACCOUNTS API ------------------- //

export const getAccounts = async () => {
    const response = await apiClient.get('/accounts');
    return response.data;
}

export const getAccountById = async (id) => {
    const response = await apiClient.get(`/accounts/${id}`);
    return response.data;
}

export const getAccountByBalance = async (minBalance, maxBalance) => {
    const response = await apiClient.get(`accounts/find-by-balance`);
    return response.data;
}

export const updateSavingsAccount = async (id, accountData) => {
    const response = await apiClient.put(`/accounts/savings/${id}`, accountData);
    return response.data;
}

export const updateCheckingAccount = async (id, accountData) => {
    const response = await apiClient.put(`/accounts/checking/${id}`, accountData);
    return response.data;
}

export const deleteAccount = async (id) => {
    const response = await apiClient.delete(`/accounts/${id}`);
    return response.data;
}

export const addSavingsAccount = async (accountData) => {
    const response = await apiClient.post(`/accounts/add-new-savings-account`, accountData);
    return response.data;
}

export const addCheckingAccount = async (accountData) => {
    const response = await apiClient.post(`/accounts/add-new-checking-account`, accountData);
    return response.data;
}

export default apiClient;
