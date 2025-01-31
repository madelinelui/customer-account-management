import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import DeleteAccountPage from "../components/Delete-account.jsx";


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


// ---------- TEST 1: LOAD PAGE --------- //
test("renders delete accoount form correctly", () => {
  render(<DeleteAccountPage />);

  expect(screen.getByText("Delete Existing Account")).toBeInTheDocument();
  expect(screen.getByLabelText("Enter existing account ID:")).toBeInTheDocument();
  expect(screen.getByText("Delete Account")).toBeInTheDocument();
});

// -------------- TEST 2: HANDLE USER INPUT ----------- //
test("updates customer ID input correctly", () => {
    render(<DeleteAccountPage />);

  const input = screen.getByLabelText("Enter existing account ID:");
  fireEvent.change(input, { target: { value: "123" } });

  expect(input.value).toBe("123");
});

// ---------------- TEST 3: ERROR HANDLING ------------- //
test("shows error if no accoount ID is entered", async() => {
    render(<DeleteAccountPage />);

  window.alert = jest.fn(); // Mock alert function

  const button = screen.getByText("Delete Account");
  await waitFor(() => {
    fireEvent.click(button);
  });

  expect(window.alert).toHaveBeenCalledWith("Please enter an account ID.");
});

// --------------- TEST 4: API REQUEST ------------ //
test("handles successful accoount deletion", async () => {
  axios.delete.mockResolvedValueOnce({ data: {} });

  render(<DeleteAccountPage />);
  
  const input = screen.getByLabelText("Enter existing account ID:");
  fireEvent.change(input, { target: { value: "123" } });

  const button = screen.getByText("Delete Account");
  await waitFor(() => {
    fireEvent.click(button);
  });

  expect(screen.getByText("Account deleted successfully!")).toBeInTheDocument();
});

// --------------- TEST 5: FAILED DELETE REQUEST ------------ //
test("handles failed deletion request", async () => {
  axios.delete.mockRejectedValueOnce(new Error("Failed to delete customer."));

  render(<DeleteAccountPage />);

  const input = screen.getByLabelText("Enter existing account ID:");
  fireEvent.change(input, { target: { value: "999" } });

  const button = screen.getByText("Delete Account");
  await waitFor(() => {
    fireEvent.click(button);
  });

  expect(screen.getByText("Failed to delete account. ")).toBeInTheDocument();
});
