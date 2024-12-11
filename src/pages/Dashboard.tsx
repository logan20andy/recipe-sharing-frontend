import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, CircularProgress, TextField, InputAdornment, IconButton, Pagination } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { Recipe } from '../types';

const Dashboard: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const recipesPerPage = 6;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/recipes')
            .then(response => {
                const data = Array.isArray(response.data) ? response.data : [];
                setRecipes(data);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const toggleFavorite = (recipeId: string) => {
        // Lógica para marcar o desmarcar la receta como favorita
        console.log('Toggling favorite status for recipe ID:', recipeId);
    };

    const filteredRecipes = recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedRecipes = filteredRecipes.slice((page - 1) * recipesPerPage, page * recipesPerPage);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Dashboard
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/create-recipe')}>
                Create Recipe
            </Button>
            <TextField 
                label="Search Recipes" 
                variant="outlined" 
                fullWidth 
                margin="normal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            <Grid container spacing={4}>
                {paginatedRecipes.map((recipe) => (
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
                                    <IconButton onClick={() => toggleFavorite(recipe._id)}>
                                        {recipe.isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                                    </IconButton>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {recipe.description}
                                </Typography>
                                <Button variant="contained" color="primary" component={Link} to={`/recipe/${recipe._id}`}>
                                    Read More
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Pagination 
                count={Math.ceil(filteredRecipes.length / recipesPerPage)} 
                page={page} 
                onChange={handlePageChange} 
                color="primary" 
                style={{ marginTop: '20px' }}
            />
        </Container>
    );
};

export default Dashboard;
