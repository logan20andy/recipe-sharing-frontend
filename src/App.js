import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddRecipePage from './pages/AddRecipePage';

function App() {
    return (
        <Router>
            <div className="App">
                <NavBar />
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/add-recipe" component={AddRecipePage} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
