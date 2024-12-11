import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';
import { Recipe } from '../types';

const RecipeSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    image: Yup.string().url('Invalid URL').required('Required'),
    ingredients: Yup.string().required('Required'),
    steps: Yup.string().required('Required')
});

const EditRecipePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        axios.get(`/api/recipes/${id}`)
            .then(response => {
                setRecipe(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Edit Recipe
            </Typography>
            <Formik
                initialValues={{ 
                    title: recipe.title, 
                    description: recipe.description, 
                    image: recipe.image, 
                    ingredients: recipe.ingredients, 
                    steps: recipe.steps 
                }}
                validationSchema={RecipeSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const token = localStorage.getItem('token');
                    axios.put(`/api/recipes/${id}`, values, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then(() => {
                        navigate(`/recipe/${id}`);
                    })
                    .catch(error => {
                        console.error(error);
                        setSubmitting(false);
                    });
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field name="title" as={TextField} label="Title" variant="outlined" fullWidth margin="normal" />
                        <Field name="description" as={TextField} label="Description" variant="outlined" fullWidth margin="normal" />
                        <Field name="image" as={TextField} label="Image URL" variant="outlined" fullWidth margin="normal" />
                        <Field name="ingredients" as={TextField} label="Ingredients" variant="outlined" fullWidth margin="normal" />
                        <Field name="steps" as={TextField} label="Steps" variant="outlined" fullWidth margin="normal" />
                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} fullWidth>
                            Update Recipe
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default EditRecipePage;
