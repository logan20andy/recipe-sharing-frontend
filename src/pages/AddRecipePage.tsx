import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

const RecipeSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    image: Yup.string().url('Invalid URL').required('Required'),
    ingredients: Yup.string().required('Required'),
    steps: Yup.string().required('Required')
});

const AddRecipePage: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Add Recipe
            </Typography>
            <Formik
                initialValues={{ title: '', description: '', image: '', ingredients: '', steps: '' }}
                validationSchema={RecipeSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const token = localStorage.getItem('token');
                    axios.post('/api/recipes', values, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then((response) => {
                        if (response.status === 201) {
                            navigate('/');
                        }
                    })
                    .catch((error) => {
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
                            Add Recipe
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default AddRecipePage;
