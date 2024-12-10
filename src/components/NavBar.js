import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Recipe Sharing
                    </Link>
                </Typography>
                <Button color="inherit">
                    <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Login
                    </Link>
                </Button>
                <Button color="inherit">
                    <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Register
                    </Link>
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
