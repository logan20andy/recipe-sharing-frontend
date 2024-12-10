import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('full app rendering/navigating', async () => {
    render(
        <Router>
            <App />
        </Router>
    );

    // verifica que la página de inicio se renderice
    expect(screen.getByText(/Recipe Sharing/i)).toBeInTheDocument();

    // verifica que el enlace de inicio de sesión funcione
    const loginLink = screen.getByText(/Login/i);
    loginLink.click();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();

    // verifica que el enlace de registro funcione
    const registerLink = screen.getByText(/Register/i);
    registerLink.click();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
});
