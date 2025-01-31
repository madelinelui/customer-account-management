import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AddNewCustomerPage from "../components/Add-new-customer.jsx";

// ------------ TEST 1: LOAD PAGE --------- //
test("renders add new customer form correctly", async () => {
    render(<AddNewCustomerPage />, { wrapper: MemoryRouter });

    expect(screen.getByText("Add New Customer")).toBeInTheDocument();
    expect(screen.getByText("Type:")).toBeInTheDocument();
    expect(screen.getByText("Name:")).toBeInTheDocument();
    expect(screen.getByText("Street Number:")).toBeInTheDocument();
    expect(screen.getByText("Postal Code:")).toBeInTheDocument();
});

// ---------- TEST 2: USER INPUTS IN FORM FIELDS -------- //
test("allows user inputs in fields", () => {
    render(<AddNewCustomerPage />, { wrapper: MemoryRouter });

    const name = screen.getByLabelText("Name: ");
    fireEvent.change(name, { target: { value: "Anna Fedorova" } });
    expect(name.value).toBe("Anna Fedorova");

    const city = screen.getByLabelText("City:");
    fireEvent.change(city, { target: { value: "Glasgow" } });
    expect(city.value).toBe("Glasgow");
});

// ----------- TEST 3: ERROR DISPLAY ----------- //
test("errors display when field is empty", async () => {
    global.alert = jest.fn();
    render(<AddNewCustomerPage />, { wrapper: MemoryRouter });

    const submitButton = screen.getByText("Add Customer");
    fireEvent.click(submitButton);

    expect(global.alert).toHaveBeenCalledTimes(1);
})
