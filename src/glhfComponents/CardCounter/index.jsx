import MKBox from 'components/MKBox';
import StatusBadge from 'glhfComponents/StatusBadge';
import React from 'react';

const CardCounters = ({status, total, type}) => {
    if (type === 'request')
        type = 'challenge'
    return (
        <MKBox display='flex' sx={{ flexWrap: 'wrap' }}>
            <p>There {total <= 1 ? 'is' : 'are'} {total} {type}{total > 1 ? 's' : ''} with&nbsp;</p>
            {
                status === '' || status ==='all'
                    ? <p>all status.</p>
                    : (
                        <>
                            status.
                            <StatusBadge statusLabel={status} type={type} size='sm' position='normal' />
                        </>
                    )
            }
        </MKBox>
    );
};

export default CardCounters;