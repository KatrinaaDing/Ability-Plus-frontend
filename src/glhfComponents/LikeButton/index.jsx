/**
 * Author: Ziqi Ding
 * Created At: 06 Jul 2022
 * Discription: A Like button with number
 */
import MKButton from 'components/MKButton';
import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const LikeButton = ({ originLike, originNumLike }) => {
    const [like, setLike] = React.useState(originLike);
    const [numLike, setNumLike] = React.useState(originNumLike);

    const toggleLike = (e) => {
        // cancel like
        if (like) 
            setNumLike(numLike - 1)
        
        // perform like
        else 
            setNumLike(numLike + 1)
            
        setLike(!like)
    }

    return (
        <MKButton 
            variant='outlined' 
            color='primary'
            startIcon={ 
                like 
                    ? <FavoriteIcon /> 
                    : <FavoriteBorderIcon /> 
            }
            onClick={toggleLike}
        >
            {numLike}
        </MKButton>
    );
};

export default LikeButton;