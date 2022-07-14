/**
 * Author: Ziqi Ding
 * Created At: 14 Jul 2022
 * Discription: A button that is used in creating proposal/reqeust
 */
import React from 'react';

const ActionButton = ({ ...props }) => {
    return (
        <MKButton variant='gradient' sx={{ m: 2 }} color={props.color} onClick={props.onClick}>
            {props.label}
        </MKButton>
    )
}

export default ActionButton;