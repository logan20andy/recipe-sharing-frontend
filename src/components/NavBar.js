import React from 'react';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        textDecoration: 'none',
        color: 'inherit'
    },
    button: {
        color: 'inherit',
        textDecoration: 'none'
    }
}));

const NavBar = () => {
    const classes = useStyles();
    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Link to="/" className={classes.title}>
                        Recipe Sharing
                    </Link>
                </Typography>
                <Button color="inherit">
                    <Link to="/login" className={classes.button}>
                        Login
                    </Link>
                </Button>
                <Button color="inherit">
                    <Link to="/register" className={classes.button}>
                        Register
                    </Link>
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
