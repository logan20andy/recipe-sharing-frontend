import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './NavBar';

test('renders NavBar with links', () => {
    render(
        <Router>
            <NavBar />
        </Router>
    );

    expect(screen.getByText('Recipe Sharing')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
});
