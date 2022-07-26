import MKBox from 'components/MKBox';
import React from 'react';
import { pink } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MKTypography from 'components/MKTypography';


const LikeIcon = ({number, direction}) => {
    const color = pink[500]

    return (
        <MKBox 
            sx={{
                display: 'flex',
                flexDirection: direction
            }}
        >
            <FavoriteIcon 
                fontSize='medium' 
                sx={{ 
                    color: color,
                    my: 'auto',
                    mx: 'auto'

                }} 
            />
            <MKTypography 
                variant='subtitle2' 
                sx={{
                    color: color,
                    my: 'auto',
                    mx: 'auto',
                    ml: direction === 'row' ? 0.5 : 0,
                    mr: 0
                }}
            >
                {number}
            </MKTypography>
        </MKBox>
    );
};

export default LikeIcon;