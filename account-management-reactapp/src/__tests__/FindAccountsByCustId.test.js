import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom';
import FindAccountsByCustId from '../components/FindAccountsByCustId';

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

// --------------- TEST 1: LOAD PAGE -------------- //
test("page loads with input field and search button", () => {
    render(<FindAccountsByCustId />);

    expect(screen.getByLabelText(/Enter customer ID: /i)).toBeInTheDocument();
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
});

// --------------- TEST 2: SUBMIT FORM AND VALIDATION ------------- //
test("successful submission with valid input", async () => {
    axios.get.mockResolvedValueOnce({
        data: [
            { accountId: "1", type: "Checking", balance: 1000, interestRate: 1.5 },
            { accountId: "2", type: "Savings", balance: 2000, interestRate: 2.0 }
        ],
    });
      
    render(<FindAccountsByCustId />);
      
    fireEvent.change(screen.getByLabelText(/Enter customer ID/i), { target: { value: "123" } });
    fireEvent.click(screen.getByText(/Search/i));
      
    await waitFor(() => {
        expect(screen.getByText("Account Details")).toBeInTheDocument();
        expect(screen.getByText("Account ID")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getAllByText("2")).toBeInTheDocument();
    });
});

// ----------------- TEST 3: HANDLE USER INPUT --------------- //
test("updates customerId state on user input", () => {
    render(<FindAccountsByCustId />);
    
    fireEvent.change(screen.getByLabelText(/Enter customer ID/i), { target: { value: "123" } });
    
    expect(screen.getByLabelText(/Enter customer ID/i).value).toBe("123");
  });

// ---------------- TEST 4: MISSING INPUT VALUE ------------- //
test("shows alert when customer ID is missing", () => {
    render(<FindAccountsByCustId />);
    
    window.alert = jest.fn();
    fireEvent.click(screen.getByText(/Search/i));
    
    expect(window.alert).toHaveBeenCalledWith("Please enter a customer ID.");
  });

// ----------------- TEST 5: ERROR HANDLING -------------- //
test("displays error message when accounts are not found", async () => {
    axios.get.mockRejectedValueOnce(new Error("Accounts not found"));
    
    render(<FindAccountsByCustId />);
    
    fireEvent.change(screen.getByLabelText(/Enter customer ID/i), { target: { value: "999" } });
    fireEvent.click(screen.getByText(/Search/i));
    
    await waitFor(async () => {
      expect(await screen.findByText("Accounts not found, please try again.")).toBeInTheDocument();
    });
    
  });


// ------------- TEST 6: LOADING STATE ---------- //
test("displays loading state during API request", async () => {
    axios.get.mockResolvedValueOnce({ data: [{ accountId: "123", type: "Checking", balance: 1000, interestRate: 1.5 }] });
    
    render(<FindAccountsByCustId />);
    
    fireEvent.change(screen.getByLabelText(/Enter customer ID/i), { target: { value: "123" } });
    fireEvent.click(screen.getByText(/Search/i));
    
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });
  