import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress } from '@mui/material';

const ActivateAccount: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        axios.get(`/api/users/activate/${token}`)
            .then(response => {
                setMessage(response.data.message);
                setTimeout(() => navigate('/login'), 5173); // Redirigir a login después de 3 segundos
            })
            .catch(err => {
                setMessage(err.response.data.error || 'Error activating account');
            });
    }, [token, navigate]);

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Activating Account...
            </Typography>
            {message ? <Typography variant="body1">{message}</Typography> : <CircularProgress />}
        </Container>
    );
};

export default ActivateAccount; 


