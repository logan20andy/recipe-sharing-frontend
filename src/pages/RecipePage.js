import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comment from '../components/Comment';

const RecipePage = ({ match }) => {
    const [recipe, setRecipe] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`/api/recipes/${match.params.id}`)
            .then(response => setRecipe(response.data))
            .catch(error => console.error(error));

        axios.get(`/api/comments/${match.params.id}`)
            .then(response => setComments(response.data))
            .catch(error => console.error(error));
    }, [match.params.id]);

    return (
        <div>
            {recipe && (
                <div>
                    <h1>{recipe.title}</h1>
                    <p>{recipe.description}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <h2>Comments</h2>
                    {comments.map(comment => (
                        <Comment
                            key={comment._id}
                            comment={comment.comment}
                            rating={comment.rating}
                            user={comment.userId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecipePage;
