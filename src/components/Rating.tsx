import React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

interface RatingProps {
    value: number;
    onChange: (event: React.ChangeEvent<unknown>, newValue: number | null) => void;
}

const RecipeRating: React.FC<RatingProps> = ({ value, onChange }) => {
    return (
        <Box component="fieldset" mb={3} borderColor="transparent">
            <Rating
                name="recipe-rating"
                value={value}
                onChange={onChange}
            />
        </Box>
    );
};

export default RecipeRating;
