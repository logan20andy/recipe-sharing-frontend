import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RecipeSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    ingredients: Yup.string().required('Required'),
    steps: Yup.string().required('Required'),
    image: Yup.mixed().required('Required')
});

const CreateRecipePage: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files) {
            setImageFile(event.currentTarget.files[0]);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Create Recipe
            </Typography>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <Formik
                initialValues={{ title: '', description: '', ingredients: '', steps: '', image: null }}
                validationSchema={RecipeSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    const formData = new FormData();
                    formData.append('title', values.title);
                    formData.append('description', values.description);
                    formData.append('ingredients', values.ingredients);
                    formData.append('steps', values.steps);
                    if (imageFile) {
                        formData.append('image', imageFile);
                    }

                    axios.post('/api/recipes', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                        .then(() => {
                            setErrorMessage(null);
                            resetForm();
                            navigate('/recipes'); // Redirigir a la página de recetas
                        })
                        .catch(error => {
                            if (error.response) {
                                setErrorMessage(error.response.data.message || 'An error occurred');
                            } else if (error.request) {
                                setErrorMessage('No response from the server. Please try again later.');
                            } else {
                                setErrorMessage('An error occurred. Please try again.');
                            }
                            setSubmitting(false);
                        });
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field name="title" as={TextField} label="Title" variant="outlined" fullWidth margin="normal" />
                        <Field name="description" as={TextField} label="Description" variant="outlined" fullWidth margin="normal" />
                        <Field name="ingredients" as={TextField} label="Ingredients" variant="outlined" fullWidth margin="normal" multiline />
                        <Field name="steps" as={TextField} label="Steps" variant="outlined" fullWidth margin="normal" multiline />
                        
                        <label htmlFor="image">Image:</label>
                        <input
                            id="image"
                            name="image"
                            type="file"
                            onChange={handleFileChange}
                            title="Choose an image for the recipe"
                        />
                        
                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} fullWidth>
                            Create Recipe
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default CreateRecipePage;
