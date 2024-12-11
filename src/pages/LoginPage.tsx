import React from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
});

const LoginPage: React.FC = () => {
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Login
            </Typography>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={(values, { setSubmitting }) => {
                    axios.post('/api/users/login', values)
                        .then(response => {
                            // Guardar token y redirigir al usuario después del inicio de sesión exitoso
                            console.log(response.data.token);
                            setErrorMessage(null);
                            navigate('/dashboard'); // Redirigir al dashboard o página principal
                        })
                        .catch(error => {
                            setErrorMessage(error.response?.data?.message || 'An error occurred');
                            setSubmitting(false);
                        });
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field name="email" as={TextField} label="Email" variant="outlined" fullWidth margin="normal" />
                        <Field name="password" as={TextField} label="Password" type="password" variant="outlined" fullWidth margin="normal" />
                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} fullWidth>
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default LoginPage;
