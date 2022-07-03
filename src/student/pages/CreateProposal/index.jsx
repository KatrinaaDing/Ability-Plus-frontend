/**
 * Author: Ziqi Ding
 * Created At: 02 Jul 2022
 * Discription: The page for company to create proposal
 */
import React from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import BasicPageLayout from "company/BasicPageLayout";
import RichTextEditor from "company/components/RichTextEditor";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";
import MKAlert from 'components/MKAlert';
import Collapse from '@mui/material/Collapse';


const CreateProposal = () => {
    const [title, setTitle] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [prob, setProb] = React.useState('');
    const [vStat, setVStat] = React.useState('');
    const [goal, setGoal] = React.useState('');
    const [detail, setDetail] = React.useState('');
    const [error, setError] = React.useState('')

    const ActionButton = ({...props}) => {
        return (
            <MKButton variant='gradient' sx={{ m: 2 }} color={props.color} onClick={props.onClick}>
                {props.label}
            </MKButton>
        )
    }

    const titleSx = { mb: 1, mt: 5 }

    const handleSubmit = () => {
        const checkList = {
            Title: title,
            Description: desc,
            'Problems to solve': prob,
            'Vision Statement': vStat,
            'General Goals': goal,
            Details: detail
        }
        const errorList = [];
        Object.keys(checkList).forEach(i => {
            if (checkList[i] === '')
                errorList.push(i)
        })
        // check empty field
        if (errorList.length > 0) {
            setError(errorList.join(', ') + ' cannot be empty! Please check again.')
            return
        } 
        setError('')
        console.log(checkList)
    }

    return (
        <BasicPageLayout title="Create Proposal">
            <Collapse in={error != ''}>
                <MKAlert color="error" dismissible>
                    <WarningAmberIcon fontSize='medium' sx={{ mr: 2 }} /> &nbsp;
                    {error}
                </MKAlert>
            </Collapse>
            <Grid container spacing={2} justify='flex-start'>
                    <Grid item xs={12} md={8} display='flex' flexDirection='column' justifyContent='space-between' order={{ xs: 2, md: 1 }}>
                        <div>
                            <MKTypography variant='h5' sx={{ mb: 1, mt: 2 }}>
                                Title
                            </MKTypography>
                            <MKInput fullWidth value={title} onChange={(e)=>setTitle(e.target.value)} type='text' label="Insert title here..." sx={{  mr: 5 }}/>
                        </div>
                        <div>
                            <MKTypography variant='h5' sx={{ mb: 1, mt: 2 }}>
                                One-line Description
                            </MKTypography>
                            <MKInput fullWidth value={desc} onChange={(e) => setDesc(e.target.value)} type='text' label="Please use one sentence to describe your proposal..." sx={{ mr: 5 }}/>

                        </div>
                    </Grid>
                    <Grid item xs={12} md={4} display='flex' flexDirection='column' order={{ xs: 1, md: 2 }}>
                        <ActionButton label='Cancel' color='secondary'/>
                        <ActionButton label='Save To Draft' color='info' />
                        <ActionButton label='Preview & Submit' onClick={handleSubmit} color='success' />
                    </Grid>
                    <Grid item xs={12} md={12} display='flex' flexDirection='column' order={{ xs: 3, md: 3 }}>
                        <MKTypography variant='h5' sx={titleSx}>Problems to solve</MKTypography>
                        <RichTextEditor height='400px' value={prob} setValue={setProb} placeholder="Insert Problems that you want to solve here..." />
                    </Grid>
                    <Grid item xs={12} md={12} display='flex' flexDirection='column' order={{ xs: 4, md: 4 }}>
                        <MKTypography variant='h5' sx={titleSx}>Vision Statement</MKTypography>
                        <RichTextEditor height='400px' value={vStat} setValue={setVStat} placeholder="Insert your vision statement here..." />
                    </Grid>
                    <Grid item xs={12} md={12} display='flex' flexDirection='column' order={{ xs: 5, md: 5 }}>
                        <MKTypography variant='h5' sx={titleSx}>General Goals</MKTypography>
                        <RichTextEditor height='500px' value={goal} setValue={setGoal} placeholder="Insert general goals here..." />
                    </Grid>
                    <Grid item xs={12} md={12} display='flex' flexDirection='column' order={{ xs: 6, md: 6 }}>
                        <MKTypography variant='h5' sx={titleSx}>Details</MKTypography>
                        <RichTextEditor height='500px' value={detail} setValue={setDetail} placeholder="Insert proposal detail here..." />
                    </Grid>

            </Grid>
        </BasicPageLayout>
    )
}

export default CreateProposal;