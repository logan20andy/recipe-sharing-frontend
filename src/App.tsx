import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import NavBar from './components/NavBar';
// import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AddRecipePage from './pages/AddRecipePage';
import RecipePage from './pages/RecipePage';
import EditRecipePage from './pages/EditRecipePage';
import ProfilePage from './pages/ProfilePage';
import FavoritesPage from './pages/FavoritesPage';
import MessagePage from './pages/MessagePage';
import ActivityPage from './pages/ActivityPage';
import ActivateAccount from './pages/ActivateAccount'; // Nueva página para activar cuenta
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import CreateRecipePage from './pages/CreateRecipePage';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/create-recipe" element={<CreateRecipePage />} />
                    <Route path="/add-recipe" element={<PrivateRoute component={AddRecipePage} />} />
                    <Route path="/recipe/:id" element={<RecipePage />} />
                    <Route path="/edit-recipe/:id" element={<PrivateRoute component={EditRecipePage} />} />
                    <Route path="/profile" element={<PrivateRoute component={ProfilePage} />} />
                    <Route path="/favorites" element={<PrivateRoute component={FavoritesPage} />} />
                    <Route path="/messages" element={<PrivateRoute component={MessagePage} />} />
                    <Route path="/activity" element={<PrivateRoute component={ActivityPage} />} />
                    <Route path="/activate/:token" element={<ActivateAccount />} /> {/* Nueva ruta para activar cuenta */}
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
