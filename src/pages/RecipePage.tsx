import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardMedia, Button, TextField } from '@mui/material';
import { Recipe } from '../types';
import './RecipePage.css'; // Importa el archivo CSS

interface Comment {
    _id: string;
    content: string;
    author: string;
    date: string;
}

const RecipePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [comment, setComment] = useState("");

    useEffect(() => {
        axios.get(`/api/recipes/${id}`)
            .then(response => {
                setRecipe(response.data);
            })
            .catch(console.error);

        axios.get(`/api/recipes/${id}/comments`)
            .then(response => {
                setComments(response.data);
            })
            .catch(console.error);
    }, [id]);

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        axios.delete(`/api/recipes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            navigate('/');
        })
        .catch(console.error);
    };

    const handleCommentSubmit = () => {
        const token = localStorage.getItem('token');
        axios.post(`/api/recipes/${id}/comments`, { content: comment }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setComments([...comments, response.data]);
            setComment("");
        })
        .catch(console.error);
    };

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Card>
                <CardMedia
                    component="img"
                    alt={recipe.title}
                    height="400"
                    image={recipe.image}
                    title={recipe.title}
                />
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {recipe.title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                        {recipe.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <strong>Ingredients:</strong> {recipe.ingredients}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <strong>Steps:</strong> {recipe.steps}
                    </Typography>
                    <Button variant="contained" color="primary" component={Link} to={`/edit-recipe/${recipe._id}`}>
                        Edit Recipe
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleDelete} style={{ marginLeft: '10px' }}>
                        Delete Recipe
                    </Button>
                </CardContent>
            </Card>
            <div className="comments-section">
                <Typography variant="h6" gutterBottom>Comments</Typography>
                {comments.map(comment => (
                    <Card key={comment._id} className="comment-card">
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                {comment.author} - {new Date(comment.date).toLocaleString()}
                            </Typography>
                            <Typography variant="body1">{comment.content}</Typography>
                        </CardContent>
                    </Card>
                ))}
                <TextField
                    label="Add a comment"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
                    Submit
                </Button>
            </div>
        </Container>
    );
};

export default RecipePage;
