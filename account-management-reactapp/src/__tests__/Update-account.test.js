import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import UpdateAccountPage from '../components/Update-account';
import { updateSavingsAccount, updateCheckingAccount } from '../apiService';

jest.mock('../apiService');

jest.mock('axios', () => {
  return {
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
  };
});

// ------------ TEST 1: LOAD PAGE ------------- //
test("input fields and submit button display on page", () => {
    render(<UpdateAccountPage />);

    expect(screen.getTextByLabel(/Enter existing account ID: /i)).toBeInTheDocument();
    expect(screen.getTextByLabel(/Account type: /i)).toBeInTheDocument();
    expect(screen.getTextByLabel(/Balance: /i)).toBeInTheDocument();
    expect(screen.getTextByLabel(/Interest rate: /i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
});

// ------------ TEST 2: HANDLE USER INPUT ------------ //
test("updates balance and interestRate state on user input", () => {
    render(<UpdateAccountPage />);
    
    fireEvent.change(screen.getByLabelText(/Balance/i), { target: { value: "5000" } });
    fireEvent.change(screen.getByLabelText(/Interest rate/i), { target: { value: "1.5" } });
  
    expect(screen.getByLabelText(/Balance/i).value).toBe("5000");
    expect(screen.getByLabelText(/Interest rate/i).value).toBe("1.5");
  });

// ----------- TEST 3: LOCAL STORAGE --------------- //
test("loads account details from localStorage on mount", () => {
    const account = { accountId: "123", type: "Checking", balance: 2000, interestRate: null };
    localStorage.setItem("account", JSON.stringify(account));
  
    render(<UpdateAccountPage />);
  
    expect(screen.getByLabelText(/Enter existing account ID/i).value).toBe("123");
    expect(screen.getByLabelText(/Account type/i).value).toBe("Checking");
    expect(screen.getByLabelText(/Balance/i).value).toBe("2000");
  });

  // ------------ TEST 4: CALLS UPDATESAVINGSACCOUNT METHOD ------------- //
test("calls updateSavingsAccount with correct data on submit", async () => {
  updateSavingsAccount.mockResolvedValueOnce({
    data: [
      {
        type: "Savings",
        balance: "1000",
        interestRate: "1.4",
        },
      ],
    });
    
    render(<UpdateAccountPage />);
    
    fireEvent.change(screen.getByLabelText(/Balance/i), { target: { value: "5000" } });
    fireEvent.change(screen.getByLabelText(/Interest rate/i), { target: { value: "2.0" } });
  
    fireEvent.click(screen.getByText(/Submit/i));
  
    await waitFor(() => expect(updateSavingsAccount).toHaveBeenCalledWith("123", {
      type: "Savings",
      balance: "5000",
      interestRate: "2.0"
    }));
  
    expect(window.alert).toHaveBeenCalledWith("Savings account updated successfully!");
  });

// --------------- TEST 5: CALLS UPDATECHECKINGACCOUNT METHOD --------------- //
test("calls updateCheckingAccount with correct data on submit", async () => {
  updateCheckingAccount.mockResolvedValueOnce({
    data: [
      {
        type: "Checking",
        balance: "200",
        },
      ],
    });
    
    render(<UpdateAccountPage />);
    
    fireEvent.change(screen.getByLabelText(/Balance/i), { target: { value: "5000" } });  
    fireEvent.click(screen.getByText(/Submit/i));
  
    await waitFor(() => expect(updateCheckingsAccount).toHaveBeenCalledWith("123", {
      type: "Checking",
      balance: "5000",
    }));
  
    expect(window.alert).toHaveBeenCalledWith("Savings account updated successfully!");
});
  
// ------------- TEST 6: ERROR ALERT ---------- //

  test("shows error alert when update fails", async () => {
    updateSavingsAccount.mockRejectedValueOnce(new Error("Failed to update"));
  
    render(<UpdateAccountPage />);
  
    fireEvent.change(screen.getByLabelText(/Balance/i), { target: { value: "3000" } });
    fireEvent.click(screen.getByText(/Submit/i));
  
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith("Could not update account. Please try again."));
  });

  