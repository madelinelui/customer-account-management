import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import DeleteCustomerPage from "../components/Delete-customer.jsx";

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

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: jest.fn(() => ({ pathname: "/delete-customer" })),
  useParams: jest.fn(() => ({ id: "1001" })),
}));

// ---------- TEST 1: LOAD PAGE --------- //
test("renders delete customer form correctly", () => {
  render(<DeleteCustomerPage />);

  expect(screen.getByText("Delete Existing Customer")).toBeInTheDocument();
  expect(screen.getByLabelText("Enter existing customer ID:")).toBeInTheDocument();
  expect(screen.getByText("Delete Customer")).toBeInTheDocument();
});

// -------------- TEST 2: HANDLE USER INPUT ----------- //
test("updates customer ID input correctly", () => {
  render(<DeleteCustomerPage />);

  const input = screen.getByLabelText("Enter existing customer ID:");
  fireEvent.change(input, { target: { value: "123" } });

  expect(input.value).toBe("123");
});

// ---------------- TEST 3: ERROR HANDLING ------------- //
test("shows error if no customer ID is entered", async() => {
  render(<DeleteCustomerPage />);

  window.alert = jest.fn(); // Mock alert function

  const button = screen.getByText("Delete Customer");
  await waitFor(() => {
    fireEvent.click(button);
  });

  expect(window.alert).toHaveBeenCalledWith("Please enter a customer ID.");
});

// --------------- TEST 4: API REQUEST ------------ //
test("handles successful customer deletion", async () => {
  axios.delete.mockResolvedValueOnce({ data: {} });

  render(<DeleteCustomerPage />);
  
  const input = screen.getByLabelText("Enter existing customer ID:");
  fireEvent.change(input, { target: { value: "123" } });

  const button = screen.getByText("Delete Customer");
  await waitFor(() => {
    fireEvent.click(button);
  });

  expect(screen.getByText("Customer deleted successfully!")).toBeInTheDocument();
});

// --------------- TEST 5: FAILED DELETE REQUEST ------------ //
test("handles failed deletion request", async () => {
  axios.delete.mockRejectedValueOnce(new Error("Failed to delete customer."));

  render(<DeleteCustomerPage />);

  const input = screen.getByLabelText("Enter existing customer ID:");
  fireEvent.change(input, { target: { value: "999" } });

  const button = screen.getByText("Delete Customer");
  await waitFor(() => {
    fireEvent.click(button);
  });

  expect(screen.getByText("Failed to delete customer.")).toBeInTheDocument();
});
