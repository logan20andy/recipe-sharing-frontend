import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

interface FollowButtonProps {
    userId: string;
    isFollowing: boolean;
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId, isFollowing }) => {
    const [following, setFollowing] = useState(isFollowing);

    const handleFollowToggle = () => {
        const token = localStorage.getItem('token');
        const url = following ? `/api/users/unfollow/${userId}` : `/api/users/follow/${userId}`;
        axios.post(url, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            setFollowing(!following);
        })
        .catch(console.error);
    };

    return (
        <Button variant="contained" color="primary" onClick={handleFollowToggle}>
            {following ? 'Unfollow' : 'Follow'}
        </Button>
    );
};

export default FollowButton;
