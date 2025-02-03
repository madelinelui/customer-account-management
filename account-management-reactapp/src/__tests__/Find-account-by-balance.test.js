import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import FindAccountByBalancePage from "../components/Find-account-by-balance.jsx";

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

// ---------------- TEST 1: LOAD PAGE -------------- //
test("renders form correctly with balance range fields", () => {
    render(<FindAccountByBalancePage />);
    
    expect(screen.getByLabelText(/min/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/max/i)).toBeInTheDocument();
    expect(screen.getAllByText(/search/i)).toBeInTheDocument();
});
  
// ----------------- TEST 2: INPUT HANDLING ----------- //
test("updates state on user input", () => {
    render(<FindAccountByBalancePage />);
  
    fireEvent.change(screen.getByLabelText(/min/i), { target: { value: "100" } });
    fireEvent.change(screen.getByLabelText(/max/i), { target: { value: "1000" } });
  
    expect(screen.getByLabelText(/min/i).value).toBe("100");
    expect(screen.getByLabelText(/max/i).value).toBe("1000");
});
  
// ----------------- TEST 3: MISSING DATA --------------- //
test("shows alert if balance range is missing", () => {
    render(<FindAccountByBalancePage />);
  
    window.alert = jest.fn();
    fireEvent.click(screen.getByRole("button", { name: /search/i }));
  
    expect(window.alert).toHaveBeenCalledWith("Please enter a value for the range you're looking for.");
  });
  
// ----------------- TEST 4: API REQUEST --------- //
test("displays account data on successful API call", async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { accountId: "1", type: "Savings", balance: 200, interestRate: 3 },
        { accountId: "2", type: "Checking", balance: 500, interestRate: 2 },
      ],
    });
  
    render(<FindAccountByBalancePage />);
  
    fireEvent.change(screen.getByLabelText(/min/i), { target: { value: "100" } });
    fireEvent.change(screen.getByLabelText(/max/i), { target: { value: "600" } });
  
    fireEvent.click(screen.getByRole("button", { name: /search/i }));
  
    await waitFor(() => expect(screen.getByText(/accountId/i)).toBeInTheDocument());
    expect(screen.getByText("Savings")).toBeInTheDocument();
    expect(screen.getByText("Checking")).toBeInTheDocument();
  });

// ------------- TEST 5: LOADING STATE -------------- //
test("displays loading state during API call", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
  
    render(<FindAccountByBalancePage />);
  
    fireEvent.change(screen.getByLabelText(/min/i), { target: { value: "100" } });
    fireEvent.change(screen.getByLabelText(/max/i), { target: { value: "1000" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));
  
    expect(screen.findByText("Loading...")).toBeInTheDocument();
  });

// ------------- TEST 6: ERROR HANDLING -------------- //
test("displays error message when API call fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network error"));
  
    render(<FindAccountByBalancePage />);
  
    fireEvent.change(screen.getByLabelText(/min/i), { target: { value: "100" } });
    fireEvent.change(screen.getByLabelText(/max/i), { target: { value: "1000" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

  
    await waitFor(() => expect(screen.findByText("Failed to fetch accounts")).resolves.toBeInTheDocument());
  });
  
  