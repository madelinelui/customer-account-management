import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import FindAccountByIdPage from '../components/Find-account-by-id.jsx';

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

// ------------------ TEST 1: LOAD PAGE --------------- //
test("field labels and search button loads", () => {
    render(<FindAccountByIdPage />);

    expect(screen.getByLabelText(/Enter account ID/i)).toBeInTheDocument();
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
});

// ------------------ TEST 2: HANDLE USER INPUT --------------- //
test("accountId state updates with user input", () => {
    render(<FindAccountByIdPage />);

    fireEvent.change(screen.getByLabelText(/Enter account ID/i)
    , { target: { value: "1" } });

    expect(screen.getByLabelText(/Enter account ID/i).value).toBe("1");
});

// ------------------ TEST 3: SUBMIT FORM AND VALIDATION ------------- //
test("account details display with valid input", async () => {
    axios.get.mockResolvedValueOnce({
        data: [
            { accountId: "1", type: "Savings", balance: 200, interestRate: 3 },
        ],
    });
    
    render(<FindAccountByIdPage />);

    fireEvent.change(screen.getByLabelText(/Enter account ID/i), { target: { value: "1" } });

    expect(screen.getByLabelText(/Enter account ID/i).value).toBe("1");

    await waitFor(() => {
        expect(screen.getByText(/Account Details/i)).toBeInTheDocument();
        expect(screen.getByText("ID: 1")).toBeInTheDocument();
        expect(screen.getByText("Type: Savings")).toBeInTheDocument();
        expect(screen.getByText("Balance: 200")).toBeInTheDocument();
        expect(screen.getByText("Interest rate: 3")).toBeInTheDocument();
    });
    

});

// ----------------- TEST 4: MISSING INPUT ALERT ------------ //
test("shows alert if account ID is missing", () => {
    render(<FindAccountByIdPage />);
    
    window.alert = jest.fn();
    fireEvent.click(screen.getByText(/Search/i));
    
    expect(window.alert).toHaveBeenCalledWith("Please enter an account ID.");
  });

// --------------- TEST 5: API ERROR HANDLING --------------- //
test("displays error message when account is not found", async () => {
    axios.get.mockRejectedValueOnce(new Error("Account not found"));
    
    render(<FindAccountByIdPage />);
    
    fireEvent.change(screen.getByLabelText(/Enter account ID/i), { target: { value: "999" } });
    fireEvent.click(screen.getByText(/Search/i));
    
    await waitFor(() => {
      expect(screen.getByText(/Account not found, please try again/i)).toBeInTheDocument();
    });
  });
  
// ------------ TEST 6: LOADING STATE ------------ //
test("displays loading state during API call", async () => {
    axios.get.mockResolvedValueOnce({ data: { accountId: "123", type: "Checking", balance: 1000, interestRate: 1.5 } });
    
    render(<FindAccountByIdPage />);
    
    fireEvent.change(screen.getByLabelText(/Enter account ID/i), { target: { value: "123" } });
    fireEvent.click(screen.getByText(/Search/i));
    
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
  });
  