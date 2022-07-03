/**
 * Author: Ziqi Ding
 * Created At: 03 Jul 2022
 * Discription: A badge indicating request status
 */
import React from 'react';
import PropTypes from 'prop-types';
import MKBadge from 'components/MKBadge';


const StatusBadge = props => {

    const content = {
        0: 'Draft',
        1: 'Open for Proposal',
        2: 'Approving',
        3: 'Open for Solution',
        4: 'Closed',
        5: 'Ejected',
    }

    const color = {
        0: 'light',
        1: 'success',
        2: 'info',
        3: 'success',
        4: 'primary',
        5: 'warning',
    }


    return (
        <MKBadge
            badgeContent={content[props.statusCode]}
            size={props.size || 'md'}
            color={color[props.statusCode]}
            container
            variant={props.varient || 'gradient'}
            sx={{ml:2}}
        />
    );
};

StatusBadge.propTypes = {
    statusCode: PropTypes.number,
    size: PropTypes.string,
    varient: PropTypes.string
};

export default StatusBadge;
