/**
 * Author: Ziqi Ding
 * Created At: 05 Jul 2022
 * Discription: Section for company to take note for a proposal
 */
import React, { useEffect } from 'react';
import MKBox from 'components/MKBox';
import MKButton from 'components/MKButton';
import MKInput from 'components/MKInput';
import SavingLoader from 'glhfComponents/SavingLoader';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

const CompanyNote = ({ content, id, updateCard }) => {
    let [loading, setLoading] = React.useState(-1); // -1: empty, 0: saving, 1: success, 2: fail
    let [note, setNote] = React.useState(content);
    let axiosPrivate = useAxiosPrivate();

    const setValue = (e) => {
        setNote(e.target.value)
        
    }

    const handleSave = (e) => {
        setLoading(0)
        axiosPrivate.post(`/proposal/company_process_proposal?proposalId=${id}&comment=${note}`)
            .then(res => {
                setLoading(1)
                updateCard(id, note)
            })
            .catch(e => {
                setLoading(2)
                console.error(e)
            })
    }

    return (
        <MKBox display='flex' flexDirection='column' >
            <MKBox display='flex' flexDirection='row' verticalAlign='middle' pb={1}>
                <MKButton 
                    color='info' 
                    variant='outlined' 
                    size='small' 
                    onClick={handleSave}
                    disabled={loading === 0}
                >
                    Save
                </MKButton>
                <SavingLoader
                    spinnerColor='silver'
                    spinnerSize={20}
                    timeout={200}
                    loading={loading === 0}
                    success={loading === 1}
                    hidden={loading === -1}
                    fail={loading === 2}
                />
            </MKBox>
            <MKInput 
                label="Take notes for this proposal here..." 
                multiline 
                rows={5} 
                value={note} 
                onChange={setValue}
                sx={{mt: 1}}
            />
        </MKBox>
    );
};

export default CompanyNote;