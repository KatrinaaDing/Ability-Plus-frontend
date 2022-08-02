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
import ClearIcon from '@mui/icons-material/Clear';

const SavingLoader = props => {

    const loaderCss = {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: '10px',
        marginRight: '10px'
    };

    const successVisibility = {
        visibility: (props.hidden || props.loading || props.fail) ? 'hidden' : 'visible',
        display: (props.fail) ? 'none' : 'inline-block',
        opacity: (props.hidden || props.loading || props.fail) ? 0 : 1,
    }

    const failVisibility = {
        visibility: (props.hidden || props.loading || props.success) ? 'hidden' : 'visible',
        display: (props.success) ? 'none' : 'inline-block',
        opacity: (props.hidden || props.loading || props.success) ? 0 : 1,
    }

    const iconSx = {
        mt: 'auto',
        mb: 'auto',
        ml: '10px',
        mr: '10px',
        transition: 'opacity 300ms ease-in-out',
    }

    return (
        <>
            <ClipLoader 
                loading={props.loading} 
                color={props.spinnerColor} 
                size={props.spinnerSize} 
                cssOverride={loaderCss} 
            />
            <CSSTransition
                in={props.success}
                timeout={props.timeout}
            >
                <DoneIcon color='success' sx={{...iconSx, ...successVisibility}} />
            </CSSTransition>
            <CSSTransition
                in={props.fail}
                timeout={props.timeout}
            >
                <ClearIcon color='error' sx={{...iconSx, ...failVisibility}} />
            </CSSTransition>
        </>
    );
};

SavingLoader.propTypes = {
    spinnerColor: string,
    spinnerSize: number,
    timeout: number,
    loading: bool,
    success: bool,
    hidden: bool,
    fail: bool
};

export default SavingLoader;

