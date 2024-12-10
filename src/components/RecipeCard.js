import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';

const RecipeCard = ({ title, description, image }) => {
    return (
        <Card>
            <CardMedia
                style={{ height: 0, paddingTop: '56.25%' }}
                image={image}
                title={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default RecipeCard;
