import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import HomePage from './HomePage';

jest.mock('axios');

test('renders HomePage with recipes', async () => {
    const mockRecipes = [
        { _id: '1', title: 'Recipe 1', description: 'Description 1', image: 'image1.jpg' },
        { _id: '2', title: 'Recipe 2', description: 'Description 2', image: 'image2.jpg' }
    ];

    axios.get.mockResolvedValue({ data: mockRecipes });

    render(<HomePage />);

    const recipeTitles = await screen.findAllByText(/Recipe/);
    expect(recipeTitles).toHaveLength(2);
});
