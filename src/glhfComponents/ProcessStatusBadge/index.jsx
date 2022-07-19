/**
 * Author: Ziqi Ding
 * Created At: 03 Jul 2022
 * Discription: A badge indicating submitted proposal status (only for project owner company)
 */
import MKBadge from 'components/MKBadge';
import PropTypes from 'prop-types';

import React from 'react';

const ProcessStatusBadge = props => {
    const propStatus = {
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

    return (
        <MKBadge
            badgeContent={propStatus[props.status].label}
            size='sm'
            color={propStatus[props.status].color}
            container
            variant='contained'
            sx={{
                ml: 2,
                mt: 'auto',
                mb: 'auto',
            }}
        />
    );
};

ProcessStatusBadge.propTypes = {
    status: PropTypes.oneOf([...Array(5).keys()]),
    
}

export default ProcessStatusBadge;