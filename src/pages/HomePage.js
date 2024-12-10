import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

const HomePage = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get('/api/recipes')
            .then(response => setRecipes(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Recipes</h1>
            <div>
                {recipes.map(recipe => (
                    <Link key={recipe._id} to={`/recipe/${recipe._id}`}>
                        <RecipeCard
                            title={recipe.title}
                            description={recipe.description}
                            image={recipe.image}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
