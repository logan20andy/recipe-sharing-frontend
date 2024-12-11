import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles'; 
import { Link } from 'react-router-dom';

const Root = styled('div')(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(1),
}));

const Title = styled(Link)(({ theme }) => ({
    flexGrow: 1,
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
}));

const NavButton = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
}));

const NavBar: React.FC = () => {
    return (
        <Root>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Title to="/">Recipe Sharing</Title>
                    </Typography>
                    <Button color="inherit" component={NavButton} to="/login">
                        Login
                    </Button>
                    <Button color="inherit" component={NavButton} to="/register">
                        Register
                    </Button>
                </Toolbar>
            </AppBar>
        </Root>
    );
};

export default NavBar;
