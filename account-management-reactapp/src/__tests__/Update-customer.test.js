import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import UpdateCustomerPage from '../components/Update-customer';
import { updateCustomer } from '../apiService';

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

jest.mock('../apiService');

// ------------ TEST 1: LOAD PAGE ------------- //
test("input fields and submit button display on page", () => {
    render(<UpdateCustomerPage />);

    expect(screen.getTextByLabel(/Enter current customer ID: /i)).toBeInTheDocument();
    expect(screen.getTextByLabel(/Edit customer name: /i)).toBeInTheDocument();
    expect(screen.getTextByLabel(/Edit customer address: /i)).toBeInTheDocument();
    expect(screen.getTextByLabel(/Street number: /i)).toBeInTheDocument();
    expect(screen.getTextByLabel(/Postal code: /i)).toBeInTheDocument();
    expect(screen.getTextByLabel(/City: /i)).toBeInTheDocument();
    expect(screen.getTextByLabel(/Province: /i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
});

// ------------ TEST 2: HANDLE USER INPUT ------------ //
test("updates state on user input", () => {
    render(<UpdateCustomerPage />);
    
    fireEvent.change(screen.getByLabelText(/Street number: /i), { target: { value: "13" } });
    fireEvent.change(screen.getByLabelText(/Edit customer name: /i), { target: { value: "Theodore" } });
  
    expect(screen.getByLabelText(/Street number: /i).value).toBe("13");
    expect(screen.getByLabelText(/Edit customer name: /i).value).toBe("Theodore");
  });

// ----------- TEST 3: LOCAL STORAGE --------------- //
test("loads customer details from localStorage on mount", () => {
    const customer = {
        customerId: "1001", name: "Anna",
        address: {
            streetNumber: "13",
            postalCode: "123456",
            city: "city",
            province: "province",
        }
        };
    localStorage.setItem("customer", JSON.stringify(customer));
  
    render(<UpdateCustomerPage />);
  
    expect(screen.getByLabelText(/Enter current customer ID/i).value).toBe("1001");
    expect(screen.getByLabelText(/Street number: /i).value).toBe("13");
    expect(screen.getByLabelText(/City: /i).value).toBe("city");
  });

  // ------------ TEST 4: CALLS UPDATESAVINGSACCOUNT METHOD ------------- //
test("calls updateCustomer with correct data on submit", async () => {
    updateCustomer.mockResolvedValueOnce({
        data: [
            {
                customerId: "1001",
                name: "Anna",
                address:
                {
                    streetNumber: "13",
                    postalCode: "123456",
                    city: "St Andrews",
                    province: "Fife",
                    },
            },
        ],

    
    });
    
    render(<UpdateCustomerPage />);
    
    fireEvent.change(screen.getByLabelText(/City: /i), { target: { value: "Glasgow" } });
    fireEvent.change(screen.getByLabelText(/Province: /i), { target: { value: "Lanarkshire" } });
  
    fireEvent.click(screen.getByText(/Submit/i));
  
    await waitFor(() => expect(updateSavingsAccount).toHaveBeenCalledWith("1001", {
      name: "Anna",
        address: {
            streetNumber: "13",
            postalCode: "123456",
            city: "Glasgow",
            province: "Lanarkshire",
        }
    }));
  
    expect(window.alert).toHaveBeenCalledWith("Customer updated successfully!");
  });
  
// ------------- TEST 6: ERROR ALERT ---------- //

  test("shows error alert when update fails", async () => {
    updateCustomer.mockRejectedValueOnce(new Error("Failed to update"));
    render(<UpdateCustomerPage />);
  
    fireEvent.change(screen.getByLabelText(/City: /i), { target: { value: "Dundee" } });
    fireEvent.click(screen.getByText(/Submit/i));
  
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith("Could not update customer. Please try again."));
  });

  