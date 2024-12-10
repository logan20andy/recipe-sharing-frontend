import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const Comment = ({ comment, rating, user }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body2" color="textSecondary">{comment}</Typography>
                <Typography variant="body2" color="textSecondary">Rating: {rating}</Typography>
            </CardContent>
        </Card>
    );
};

export default Comment;
