import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AddNewAccountPage from "../components/Add-new-account.jsx";

// ------------ TEST 1: LOAD PAGE --------- //
test("renders add new account form correctly", async () => {
    render(<AddNewAccountPage />, { wrapper: MemoryRouter });

    expect(screen.getByText("Add New Account")).toBeInTheDocument();
    expect(screen.getByText("Type:")).toBeInTheDocument();
    expect(screen.getByText("Set Balance:")).toBeInTheDocument();
    expect(screen.getByText("Set Interest Rate:")).toBeInTheDocument();
    
});

// ---------- TEST 2: USER INPUTS IN FORM FIELDS -------- //
test("allows user inputs in fields", () => {
    render(<AddNewAccountPage />, { wrapper: MemoryRouter });

    const balance = screen.getByLabelText("Set Balance: ");
    fireEvent.change(balance, { target: { value: "200" } });
    expect(balance.value).toBe("200");
});

// ----------- TEST 3: ERROR DISPLAY ----------- //
test("errors display when field is empty", async () => {
    global.alert = jest.fn();
    render(<AddNewAccountPage />, { wrapper: MemoryRouter });

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    expect(global.alert).toHaveBeenCalledTimes(1);
})
