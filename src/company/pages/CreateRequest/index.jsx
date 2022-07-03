/**
 * Author: Ziqi Ding
 * Created At: 02 Jul 2022
 * Discription: The page for company to create proposal
 */
import React from 'react';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import BasicPageLayout from "company/BasicPageLayout";
import RichTextEditor from "company/components/RichTextEditor";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";
import MKDatePicker from 'components/MKDatePicker';
import MKAlert from 'components/MKAlert';
import Collapse from '@mui/material/Collapse';

const categories = [
    'Frontend Develop',
    'Management',
    'Backend Develop',
]


const CreateRequest = () => {
    const [title, setTitle] = React.useState('')
    const [category, setCategory] = React.useState('')
    const [propDdl, setPropDdl] = React.useState('')
    const [soluDdl, setSoluDdl] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [requirement, setRequirements] = React.useState('')
    const [rewards, setRewards] = React.useState('')
    const [error, setError] = React.useState('')

    const ActionButton = ({ ...props }) => {
        return (
            <MKButton variant='gradient' sx={{ m: 2 }} color={props.color} onClick={props.onClick}>
                {props.label}
            </MKButton>
        )
    }

    const dateTimePickerSx = { mt: 2 };
    const titleSx = { mb: 1, mt: 2 }
    const datePickerOption = {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        minDate: new Date()
    }

    const handleCategory = (event) => {
        setCategory(event.target.value)
    }

    const handleSubmit = () => {
        const checkList = {
            Title: title,
            Category: category,
            'Proposal Deadline': propDdl,
            'Solution Deadline': soluDdl,
            Description: description,
            Requirement: requirement
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
        // prop deadline must < solu deadline
        if (new Date(propDdl) > new Date(soluDdl)){
            setError("Solution deadline cannot be before proposal deadline! Please check again.")
            return
        }

        setError('')
        console.log({
            ...checkList,
            Rewards: rewards
        })
    }

    return (
        <BasicPageLayout title="Create Project Request">
            <Collapse in={error != ''}>
                <MKAlert color="error" dismissible>
                    <WarningAmberIcon fontSize='medium' sx={{ mr: 2}}/> &nbsp;
                    {error}
                </MKAlert>
            </Collapse>
                <Grid container spacing={2} justify='flex-start'>
                    <Grid item xs={12} md={8} display='flex' flexDirection='column' justifyContent='space-between' order={{ xs: 2, md: 1 }}>
                        <div>
                            <MKTypography variant='h5' sx={titleSx}>
                                Title
                            </MKTypography>
                            <MKInput fullWidth type='text' required value={title} onChange={(e) => setTitle(e.target.value)} label="Insert title here..." sx={{ mr: 5 }} />
                        </div>
                        <Grid container spacing={2} height='100%' display='column'>
                            <Grid item sx={12} md={4} display='flex' flexDirection='column'>
                                <MKTypography variant='h5' sx={titleSx}>
                                    Category
                                </MKTypography>

                                <FormControl fullWidth >
                                    <InputLabel id="category-select-label">Category</InputLabel>
                                    <Select
                                        labelId="category-select-label"
                                        id="category-select"
                                        value={category}
                                        label="Category"
                                        onChange={handleCategory}
                                        style={{height: '45px'}}
                                    >
                                        {
                                            categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sx={12} md={4} display='flex' flexDirection='column'>
                                <MKTypography variant='h5' sx={titleSx}>
                                    Proposal Deadline
                                </MKTypography>
                            <MKDatePicker options={datePickerOption} input={{ placeholder: "Select a date" }} value={propDdl} onChange={(dates, dateStr) => setPropDdl(dateStr)} sx={dateTimePickerSx} />
                            </Grid>
                            <Grid item sx={12} md={4} display='flex' flexDirection='column'>
                                <MKTypography variant='h5' sx={titleSx}>
                                    Solution Deadline
                                </MKTypography>
                            <MKDatePicker options={datePickerOption} input={{ placeholder: "Select a date" }} value={soluDdl} onChange={(dates, dateStr) => setSoluDdl(dateStr)}  sx={dateTimePickerSx} />
                            </Grid>
                            
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4} display='flex' flexDirection='column' order={{ xs: 1, md: 2 }} >
                        <ActionButton label='Cancel' color='secondary' />
                        <ActionButton label='Save To Draft' color='info' />
                        <ActionButton label='Preview & Submit' onClick={handleSubmit} value='Submit' color='success' />
                    </Grid>
                    <Grid item xs={12} md={12} display='flex' flexDirection='column' order={{ xs: 4, md: 4 }} sx={{ minHeight: '600px' }}>
                        <MKTypography variant='h5' sx={titleSx}>Description</MKTypography>
                        <RichTextEditor height='400px' value={description} setValue={setDescription} placeholder="Insert your description here..." />
                    </Grid>
                    <Grid item xs={12} md={12} display='flex' flexDirection='column' order={{ xs: 5, md: 5 }} sx={{ minHeight: '600px' }}>
                        <MKTypography variant='h5' sx={titleSx}>Requirements</MKTypography>
                        <RichTextEditor height='500px' value={requirement} setValue={setRequirements} placeholder="Insert your functional or non-functional requirements here..." />
                    </Grid>
                    <Grid item xs={12} md={12} display='flex' flexDirection='column' order={{ xs: 6, md: 6 }} sx={{ minHeight: '600px' }}>
                        <MKTypography variant='h5' sx={titleSx}>Rewards (if any)</MKTypography>
                        <RichTextEditor height='500px' value={rewards} setValue={setRewards} placeholder="If you have reward, please insert it here..." />
                    </Grid>

                </Grid>
        </BasicPageLayout>
    )
}

export default CreateRequest;