import React from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

const RegisterPage: React.FC = () => {
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Register
            </Typography>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <Formik
                initialValues={{ name: '', email: '', password: '' }}
                validationSchema={RegisterSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    axios.post('/api/users/register', values)
                        .then(() => {
                            setErrorMessage(null);
                            resetForm();
                            navigate('/login'); // Redirigir a la página de inicio de sesión
                        })
                        .catch(error => {
                            if (error.response) {
                                // Errores de respuesta del servidor
                                setErrorMessage(error.response.data.message || 'An error occurred');
                            } else if (error.request) {
                                // Errores de solicitud
                                setErrorMessage('No response from the server. Please try again later.');
                            } else {
                                // Otros errores
                                setErrorMessage('An error occurred. Please try again.');
                            }
                            setSubmitting(false);
                        });
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field name="name" as={TextField} label="Name" variant="outlined" fullWidth margin="normal" />
                        <Field name="email" as={TextField} label="Email" variant="outlined" fullWidth margin="normal" />
                        <Field name="password" as={TextField} label="Password" type="password" variant="outlined" fullWidth margin="normal" />
                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} fullWidth>
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default RegisterPage;
