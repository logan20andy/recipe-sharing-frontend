import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, List, ListItem, ListItemText } from '@mui/material';

interface Message {
    sender: string;
    content: string;
    date: string;
}

const MessagePage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('/api/messages', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setMessages(response.data);
        })
        .catch(console.error);
    }, []);

    const handleSendMessage = () => {
        const token = localStorage.getItem('token');
        axios.post('/api/messages', { content: newMessage }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setMessages([...messages, response.data]);
            setNewMessage("");
        })
        .catch(console.error);
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Messages
            </Typography>
            <List>
                {messages.map((message, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={`${message.sender} - ${new Date(message.date).toLocaleString()}`}
                            secondary={message.content}
                        />
                    </ListItem>
                ))}
            </List>
            <TextField
                label="New Message"
                variant="outlined"
                fullWidth
                margin="normal"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSendMessage}>
                Send
            </Button>
        </Container>
    );
};

export default MessagePage;
