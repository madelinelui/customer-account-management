import { render, screen } from '@testing-library/react';
import App from '../App.js';
import axios from 'axios';

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



test('renders home page', () => {
  render(

      <App />

    );
  expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
});
