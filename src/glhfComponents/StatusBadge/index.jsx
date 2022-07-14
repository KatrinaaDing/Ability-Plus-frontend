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
            0: 'light',
            1: 'info',
            2: 'warning',
            3: 'success',
            4: 'primary',
        },
        request: {
            0: 'light',
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
                ml: 2, 
                mt: 'auto', 
                mb: 'auto', 
                border: props.statusLabel === 'draft' ? 'solid 1px gray' : '',
            }}
        />
    );
};

StatusBadge.propTypes = {
    statusLabel: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['proposal', 'request']).isRequired,
    size: PropTypes.string,
    variant: PropTypes.oneOf(['gradient', 'contained'])
};

export default StatusBadge;
