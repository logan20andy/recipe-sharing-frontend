import React, { useEffect, useState } from 'react';
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
                    <RecipeCard
                        key={recipe._id}
                        title={recipe.title}
                        description={recipe.description}
                        image={recipe.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
