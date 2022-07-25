/**
 * Author: Ziqi Ding
 * Created At: 03 Jul 2022
 * Discription: A badge indicating submitted proposal status (only for project owner company)
 */
import MKBadge from 'components/MKBadge';
import PropTypes from 'prop-types';

import React from 'react';

export const propStatus = {
    0: {
        label: 'unviewed',
        color: 'secondary'
    },
    1: {
        label: 'viewed',
        color: 'dark',
    },
    2: {
        label: 'shortlisted',
        color: 'success',
    },
    3: {
        label: 'approved',
        color: 'success'
    },  
    4: {
        label: 'rejected',
        color: 'primary'
    }
}
const ProcessStatusBadge = props => {

    return (
        <MKBadge
            badgeContent={propStatus[props.status].label}
            size='sm'
            color={propStatus[props.status].color}
            container
            variant='contained'
            sx={{
                mt: 'auto',
                ml: props.position === 'top-right' ? 3 : 4,
                mb: props.position === 'top-right' ? -4 : 'auto', 
            }}
        />
    );
};

ProcessStatusBadge.propTypes = {
    status: PropTypes.oneOf([...Array(5).keys()]),
    position: PropTypes.oneOf(['top-right', 'normal']),
    
}

export default ProcessStatusBadge;