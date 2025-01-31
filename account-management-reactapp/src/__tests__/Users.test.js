import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Users from '../components/Users.jsx';


test('renders users page', () => {
    render(
        <BrowserRouter>
            <Users />
        </BrowserRouter>);

    expect(screen.getByText(/Registered Users/i)).toBeInTheDocument();
});