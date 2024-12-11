import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Collection {
    _id: string;
    name: string;
    recipes: string[];
}

const FavoriteCollections: React.FC = () => {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [open, setOpen] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddCollection = () => {
        const newCollection = { _id: Date.now().toString(), name: newCollectionName, recipes: [] };
        setCollections([...collections, newCollection]);
        setNewCollectionName("");
        handleClose();
    };

    const handleDeleteCollection = (id: string) => {
        setCollections(collections.filter(collection => collection._id !== id));
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Add New Collection
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Collection</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Collection Name"
                        type="text"
                        fullWidth
                        value={newCollectionName}
                        onChange={(e) => setNewCollectionName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddCollection} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            <List>
                {collections.map((collection) => (
                    <ListItem key={collection._id}>
                        <ListItemText primary={collection.name} />
                        <IconButton onClick={() => handleDeleteCollection(collection._id)} color="secondary">
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default FavoriteCollections;
