import React from 'react';

const ActionButton = ({ ...props }) => {
    return (
        <MKButton variant='gradient' sx={{ m: 2 }} color={props.color} onClick={props.onClick}>
            {props.label}
        </MKButton>
    )
}

export default ActionButton;