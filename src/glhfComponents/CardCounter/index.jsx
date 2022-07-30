import MKBox from 'components/MKBox';
import StatusBadge from 'glhfComponents/StatusBadge';
import React from 'react';

const CardCounters = ({status, total, type}) => {
    return (
        <MKBox display='flex'>
            <MKBox display='flex'>
                <p>There {total <= 1 ? 'is' : 'are'} {total} {type}{total > 1 ? 's' : ''} with&nbsp;</p>
                {
                    status === ''
                        ? <p>all status</p>
                        : (
                            <>
                                status
                                <StatusBadge statusLabel={status} type={type} size='sm' position='normal' />
                            </>
                        )
                }
            </MKBox>
        </MKBox>
    );
};

export default CardCounters;