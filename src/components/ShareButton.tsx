import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

interface ShareButtonProps {
    recipeId: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ recipeId }) => {
    const handleShare = () => {
        const url = `${window.location.origin}/recipe/${recipeId}`;
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    };

    return (
        <Tooltip title="Share">
            <IconButton onClick={handleShare}>
                <ShareIcon />
            </IconButton>
        </Tooltip>
    );
};

export default ShareButton;
