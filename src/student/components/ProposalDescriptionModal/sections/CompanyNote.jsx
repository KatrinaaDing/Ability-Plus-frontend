/**
 * Author: Ziqi Ding
 * Created At: 05 Jul 2022
 * Discription: Section for company to take note for a proposal
 */
import React from 'react';
import MKBox from 'components/MKBox';
import MKButton from 'components/MKButton';
import MKInput from 'components/MKInput';
import DoneIcon from '@mui/icons-material/Done';
import { ClipLoader, } from 'react-spinners';
import { CSSTransition } from 'react-transition-group'; 

const CompanyNote = () => {
    let [loading, setLoading] = React.useState(-1); // -1: empty, 0: saving, 1: success
    let [note, setNote] = React.useState('');

    const loaderCss = {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: '10px',
        transition: 'opacity 100ms ease-in-out'
    };

    const successSx = { 
        opacity: loading < 1 ? 0 : 1, 
        visibility: loading < 1 ? 'hidden' : 'visible',
        mt: 'auto', 
        mb: 'auto', 
        ml: '10px', 
        transition: 'opacity 300ms ease-in-out'
    }

    const setValue = (e) => {
        setNote(e.target.value)
    }

    const handleSave = (e) => {
        setLoading(0)
        setTimeout(() => {
            setLoading(1)
        }, 800);
    }

    return (
        <MKBox display='flex' flexDirection='column' >
            <MKBox display='flex' flexDirection='row' verticalAlign='middle' pb={1}>
                <MKButton color='info' variant='outlined' size='small' onClick={handleSave}>Save</MKButton>
                <ClipLoader loading={loading === 0} color='gray' size={20} cssOverride={loaderCss} />
                <CSSTransition
                    in={loading === 1}
                    timeout={200}
                >
                    <DoneIcon color='success' sx={successSx}/>
                </CSSTransition>
            </MKBox>
            <MKInput label="Take notes for this proposal here..." multiline rows={5} value={note} onChange={setValue}/>
        </MKBox>
    );
};

export default CompanyNote;