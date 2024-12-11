import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Alert, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom'; // Importar Link
import { Recipe } from '../types';

const ProfileSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    bio: Yup.string().optional(),
});

const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<{ name: string; email: string; bio: string; recipes: Recipe[] } | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('/api/users/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setUser(response.data);
        })
        .catch(console.error);
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Profile
            </Typography>
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <Formik
                initialValues={{ name: user.name, email: user.email, bio: user.bio }}
                validationSchema={ProfileSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const token = localStorage.getItem('token');
                    axios.put('/api/users/profile', values, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        setSuccessMessage("Profile updated successfully!");
                        setErrorMessage(null);
                        setUser(response.data);
                    })
                    .catch(() => {
                        setErrorMessage("Profile update failed. Please try again.");
                        setSuccessMessage(null);
                        setSubmitting(false);
                    });
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field name="name" as={TextField} label="Name" variant="outlined" fullWidth margin="normal" />
                        <Field name="email" as={TextField} label="Email" type="email" variant="outlined" fullWidth margin="normal" />
                        <Field name="bio" as={TextField} label="Bio" variant="outlined" fullWidth margin="normal" multiline rows={4} />
                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} fullWidth>
                            Update Profile
                        </Button>
                    </Form>
                )}
            </Formik>
            <Typography variant="h6" component="h2" gutterBottom style={{ marginTop: '20px' }}>
                My Recipes
            </Typography>
            <Grid container spacing={4}>
                {user.recipes.map((recipe) => (
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
                                <Button variant="contained" color="primary" component={Link} to={`/recipe/${recipe._id}`}>
                                    View Recipe
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProfilePage;
