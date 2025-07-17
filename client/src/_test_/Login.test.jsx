import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../pages/Login';
import { AuthProvider } from '../context/AuthProvider';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import * as api from '../services/Api';

jest.mock('../services/Api');

describe('Login Page', () => {
  test('renders email and password inputs and submit button', () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthProvider>
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('submits form with entered credentials', async () => {
    const mockLoginResponse = {
      data: {
        token: 'mockToken',
        user: { email: 'test@example.com', name: 'Test User' },
      },
    };

    api.default.post.mockResolvedValue(mockLoginResponse);

    render(
      <AuthProvider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(api.default.post).toHaveBeenCalledWith('/auth/login', {
        email: 'test@example.com',
        password: '123456',
      });
    });
  });
});
