import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

interface Activity {
    _id: string;
    type: string; // 'recipe_added', 'recipe_edited', 'comment_added', etc.
    date: string;
    details: string;
}

const ActivityPage: React.FC = () => {
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('/api/users/activity', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setActivities(response.data);
        })
        .catch(console.error);
    }, []);

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                My Activity
            </Typography>
            <List>
                {activities.map((activity, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={activity.details}
                            secondary={new Date(activity.date).toLocaleString()}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default ActivityPage;
