import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import FindCustomerByIdPage from '../components/Find-customer-by-id';

jest.mock('axios', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(() => ({
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      interceptors: {
        response: {
          use: jest.fn(),
        },
      },
    })),
  }));

// ---------------------- TEST 1: LOAD PAGE --------------- //
test("field labels and search button loads", () => {
    render(<FindCustomerByIdPage />);

    expect(screen.getByLabelText(/Enter customer ID: /i)).toBeInTheDocument();
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
});

// ------------------ TEST 2: HANDLE USER INPUT --------------- //
test("customerId state updates with user input", () => {
    render(<FindCustomerByIdPage />);

    fireEvent.change(screen.getByLabelText(/Enter customer ID: /i), { target: { value: "1001" } });

    expect(screen.getByLabelText(/Enter customer ID: /i).value).toBe("1001");
});

// ------------------ TEST 3: SUBMIT FORM AND VALIDATION ------------- //
test("customer details display with valid input", async () => {
    axios.get.mockResolvedValueOnce({
        data: [
            {
                customerId: "1001", name: "Anna",
                address: {
                    streetNumber: 13,
                    postalCode: "G11 8PQ",
                    city: "Glasgow",
                    province: "Lanarkshire",
                }
                
            },
        ],
    });
    
    render(<FindCustomerByIdPage />);


    fireEvent.change(screen.getByLabelText(/Enter customer ID: /i), { target: { value: "1001" } });

    expect(screen.getByLabelText(/Enter customer ID: /i).value).toBe("1001");

    await waitFor(() => {
        expect(screen.getByText(/Customer Details/i)).toBeInTheDocument();
        expect(screen.getByText("ID: 1001")).toBeInTheDocument();
        expect(screen.getByText("Name: Anna")).toBeInTheDocument();
        expect(screen.getByText("Street Number: 13")).toBeInTheDocument();
        expect(screen.getByText("City: Glasgow")).toBeInTheDocument();
        expect(screen.getByText("Province: Lanarkshire")).toBeInTheDocument();
        expect(screen.getByText("Postal Code: G11 8PQ")).toBeInTheDocument();

    });
    

});

// ----------------- TEST 4: MISSING INPUT ALERT ------------ //
test("shows alert if customer ID is missing", () => {
    render(<FindCustomerByIdPage />);
    
    window.alert = jest.fn();
    fireEvent.click(screen.getByText(/Search/i));
    
    expect(window.alert).toHaveBeenCalledWith("Please enter a customer ID.");
  });

// --------------- TEST 5: API ERROR HANDLING --------------- //
test("displays error message when customer is not found", async () => {
    axios.get.mockRejectedValueOnce(new Error("Customer not found"));
    
    render(<FindCustomerByIdPage />);
    
    fireEvent.change(screen.getByLabelText(/Enter customer ID/i), { target: { value: "999" } });
    fireEvent.click(screen.getByText(/Search/i));
    
    await waitFor(() => {
      expect(screen.getByText(/Customer not found or error occurred. Please try again/i)).toBeInTheDocument();
    });
  });
  
// ------------ TEST 6: LOADING STATE ------------ //
test("displays loading state during API call", async () => {
    axios.get.mockResolvedValueOnce({
        data: [
            {
                customerId: "1001", name: "Anna",
                address: {
                    streetNumber: 13,
                    postalCode: "G11 8PQ",
                    city: "Glasgow",
                    province: "Lanarkshire",
                }
                
            },
        ],
    });    
    render(<FindCustomerByIdPage />);
    
    fireEvent.change(screen.getByLabelText(/Enter customer ID/i), { target: { value: "1001" } });
    fireEvent.click(screen.getByText(/Search/i));
    
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  