import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, CardMedia, CircularProgress } from '@mui/material';
import { Recipe } from '../types';

const FavoritesPage: React.FC = () => {
    const [favorites, setFavorites] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('/api/users/favorites', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            const data = Array.isArray(response.data) ? response.data : [];
            setFavorites(data);
            setLoading(false);
        })
        .catch(console.error);
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                My Favorite Recipes
            </Typography>
            <Grid container spacing={4}>
                {favorites.map((recipe) => (
                    <Grid item key={recipe._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                alt={recipe.title}
                                height="140"
                                image={recipe.image}
                                title={recipe.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {recipe.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {recipe.description}
                                </Typography>
                                <Link to={`/recipe/${recipe._id}`}>Read More</Link>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default FavoritesPage;
