import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Accounts from "../components/Accounts.jsx";

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

const mockAccounts = [
    {
        accountId: 1,
        type: "Savings",
        balance: "20000",
        interestRate: "4.6",
    },
    {
        accountId: 2,
        type: "Checking",
        balance: "500",
    },
];
// ---------- TEST 1: LOAD PAGE ------------ //
test("renders accounts page correctly", async () => {
    axios.get.mockResolvedValue({ data: mockAccounts });

    render(
        < BrowserRouter >
            <Accounts />
        </BrowserRouter >
    );

    expect(screen.getByText("All Accounts")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.getByText("Savings")).toBeInTheDocument();
        expect(screen.getByText("Checking")).toBeInTheDocument();
    });

});

// ------------- TEST 2: NAVIGATE: UPDATE ACCOUNT ----------- //
test("button navigates to update account page", async () => {
    axios.get.mockResolvedValue({ data: mockAccounts });

    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useNavigate: () => mockNavigate,
    }));

    render(
        <BrowserRouter>
            <Accounts />
        </BrowserRouter>
    );

    await waitFor(() => screen.getByText("Savings"));

    fireEvent.click(screen.getAllByText("Update")[0]);

    expect(mockNavigate).toHaveBeenCalledWith("/update-account");
});