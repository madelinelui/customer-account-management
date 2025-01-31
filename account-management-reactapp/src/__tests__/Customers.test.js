import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Customers from "../components/Customers";

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

const mockCustomers = [
    {
        customerId: 1001,
        name: "Anna Fedorova",
        address: {
            streetNumber: "24 Lindhurst Terrace",
            city: "Glasgow",
            province: "Lanarkshire",
            postalCode: "G12 6UW",
        },
    },
    {
        customerId: 1002,
        name: "Ian Grant",
        address: {
            streetNumber: "13 White Street",
            city: "Glasgow",
            province: "Lanarkshire",
            postalCode: "G12 8PQ",
        },
    },
];
// ---------- TEST 1: LOAD PAGE ------------ //
test("renders customers page correctly", async () => {
    axios.get.mockResolvedValue({ data: mockCustomers });

    render(
        < BrowserRouter >
            <Customers />
        </BrowserRouter >
    );

    expect(screen.getByText("All Customers")).toBeInTheDocument();
    expect(Screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.getByText("Anna Fedorova")).toBeInTheDocument();
        expect(screen.getByText("Ian Grant")).toBeInTheDocument();
    });

});

// ---------- TEST 2: DEFAULT DISPLAY -------------- //
test("displays default text when no address present", async () => {
    const mockCustomersWithoutAddress = [
        { customerId: 1003, name: "Kevin Magnussen" },
    ];
    axios.get.mockResolvedValue({ data: mockCustomersWithoutAddress });

    render(
        <BrowserRouter>
            <Customers />
        </BrowserRouter>
    );

    await waitFor(() => {
        expect(screen.getByText("Kevin Magnussen")).toBeInTheDocument();
        expect(screen.getByText("No Street Number")).toBeInTheDocument();
        expect(screen.getByText("No City")).toBeInTheDocument();
        expect(screen.getByText("No Province")).toBeInTheDocument();
        expect(screen.getByText("No Postal Code")).toBeInTheDocument();
    });
});

// ------------ TEST 3: NAVIGATE: ADD CUSTOMER PAGE ----------- //
test("button navigates to add customer page", () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useNavigate: () => mockNavigate,
    }));

    render(
        <BrowserRouter>
            <Customers />
        </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Add Customer"));

    expect(mockNavigate).toHaveBeenCalledWith("/add-new-customer");
});

// ------------- TEST 4: NAVIGATE: UPDATE CUSTOMER ----------- //
test("button navigates to update customer page", async () => {
    axios.get.mockResolvedValue({ data: mockCustomers });

    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useNavigate: () => mockNavigate,
    }));

    render(
        <BrowserRouter>
            <Customers />
        </BrowserRouter>
    );

    await waitFor(() => screen.getByText("Anna Fedorova"));

    fireEvent.click(screen.getAllByText("Update")[0]);

    expect(mockNavigate).toHaveBeenCalledWith("/update-customer");
});