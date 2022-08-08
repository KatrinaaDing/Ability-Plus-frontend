/**
 * Author: Ziqi Ding
 * Created At: 06 Jul 2022
 * Discription: A Like button with number
 */
import MKButton from 'components/MKButton';
import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

const LikeButton = ({ originLike, originNumLike, propId }) => {
    const [like, setLike] = React.useState(originLike);
    const [numLike, setNumLike] = React.useState(originNumLike);
    const axiosPrivate = useAxiosPrivate();

    // handlers
    const cancelLike = () => 
        axiosPrivate.post(`/user_proposal_like_record/unlike?proposalId=${propId}`)
            .then(res => setNumLike(numLike - 1))
            .catch(e => console.error(e))
    

    const performLike = () =>
        axiosPrivate.post(`/user_proposal_like_record/like?proposalId=${propId}`)   
            .then(res => setNumLike(numLike + 1))
            .catch(e => console.error(e))

    const toggleLike = (e) => {
        // cancel like
        if (like) 
            cancelLike()
        
        // perform like
        else 
            performLike()

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