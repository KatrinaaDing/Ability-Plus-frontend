import MKBadge from 'components/MKBadge';
import React from 'react';

const RankBadge = ({rank, position}) => {
    
    const color = {
        1: 'success',
        2: 'warning',
        3: 'primary'
    }

    const leftSx = {
        ml:  -5,
        height: '80px'
    }

    const topSx = {
        mt: -5,
    }
    
    return (
        <MKBadge
            badgeContent={rank}
            size={'sm'}
            color={color[rank] || 'light'}
            container
            variant={'gradient'}
            sx={
                position === 'left'
                    ? leftSx
                    : topSx
            }
        />
    );
};

export default RankBadge;