/**
 * Author: Ziqi Ding
 * Created At: 06 Jul 2022
 * Discription: A spin loader to show saving status
 */
import React from 'react';
import { bool, number, string } from 'prop-types';
import { ClipLoader, } from 'react-spinners';
import { CSSTransition } from 'react-transition-group';
import DoneIcon from '@mui/icons-material/Done';

const SavingLoader = props => {
    const loaderCss = {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: '10px',
    };

    const successSx = {
        opacity: (props.hidden || props.loading) ? 0 : 1,
        visibility: (props.hidden || props.loading) ? 'hidden' : 'visible',
        mt: 'auto',
        mb: 'auto',
        ml: '10px',
        transition: 'opacity 300ms ease-in-out'
    }

    return (
        <>
            <ClipLoader loading={props.loading} color={props.spinnerColor} size={props.size} cssOverride={loaderCss} />
            <CSSTransition
                in={props.success}
                timeout={props.timeout}
            >
                <DoneIcon color='success' sx={successSx} />
            </CSSTransition>
        </>
    );
};

SavingLoader.propTypes = {
    spinnerColor: string,
    size: number,
    timeout: number,
    loading: bool,
    success: bool,
    hidden: bool,
};

export default SavingLoader;

