/**
 * Author: Ziqi Ding
 * Created At: 03 Jul 2022
 * Discription: A badge indicating request status
 */
import React from 'react';
import PropTypes from 'prop-types';
import MKBadge from 'components/MKBadge';
import { getCode } from 'utils/getStatus';
import { formatLabel } from 'utils/getStatus';


const StatusBadge = props => {
    const color = {
        proposal: {
            0: 'secondary',
            1: 'info',
            2: 'warning',
            3: 'success',
            4: 'primary',
        },
        request: {
            0: 'secondary',
            1: 'success',
            2: 'warning',
            3: 'info',
            4: 'dark',
        }
    }

    return (
        <MKBadge
            badgeContent={formatLabel(props.statusLabel)}
            size={props.size || 'md'}
            color={color[props.type][getCode(props.type, props.statusLabel)]}
            container
            variant={props.variant || 'contained'}
            sx={{ 
                // mt: props.position === 'top-right' ? 8 : 'auto', 
                mt: 'auto',
                ml: props.position === 'top-right' ? 2 : 2,
                mb: props.position === 'top-right' ? -5 : 'auto', 
            }}
        />
    );
};

StatusBadge.propTypes = {
    statusLabel: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['proposal', 'request']).isRequired,
    size: PropTypes.string,
    position: PropTypes.oneOf(['top-right', 'normal']),
    variant: PropTypes.oneOf(['gradient', 'contained'])
};

export default StatusBadge;
