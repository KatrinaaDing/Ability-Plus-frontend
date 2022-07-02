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

import BasicPageLayout from "company/BasicPageLayout";
import RichTextEditor from "company/components/RichTextEditor";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";
import MKDatePicker from 'components/MKDatePicker';


const CreateRequest = () => {
    const [category, setCategory] = React.useState('')

    const ActionButton = ({ ...props }) => {
        return (
            <MKButton variant='gradient' sx={{ m: 2 }} color={props.color}>
                {props.label}
            </MKButton>
        )
    }

    const handleCategory = (event) => {
        setCategory(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <BasicPageLayout title="Create Project Request">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} justify='flex-start'>

                    <Grid item xs={12} md={8} display='flex' flexDirection='column' justifyContent='space-between' order={{ xs: 2, md: 1 }}>
                        <div>
                            <MKTypography variant='h5' sx={{ mb: 1, mt: 2 }}>
                                Title
                            </MKTypography>
                            <MKInput fullWidth type='text' label="Insert title here..." sx={{ mr: 5 }} />
                        </div>
                        <Grid container spacing={2} height='100%' display='column'>
                            <Grid item sx={12} md={4} display='flex' flexDirection='column'>
                                <MKTypography variant='h5' sx={{ mb: 1, mt: 2 }}>
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
                                        style={{height: '50px'}}
                                    >
                                        <MenuItem value='Frontend Develop'>Frontend Develop</MenuItem>
                                        <MenuItem value='Management'>Management</MenuItem>
                                        <MenuItem value='Backend Develop'>Backend Develop</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sx={12} md={4} display='flex' flexDirection='column'>
                                <MKTypography variant='h5' sx={{ mb: 1, mt: 2 }}>
                                    Proposal Deadline
                                </MKTypography>
                                <MKDatePicker input={{ placeholder: "Select a date" }} />
                                <MKInput type='time' label='Select a Time' />
                            </Grid>
                            <Grid item sx={12} md={4} display='flex' flexDirection='column'>
                                <MKTypography variant='h5' sx={{ mb: 1, mt: 2 }}>
                                    Solution Deadline
                                </MKTypography>
                                <MKDatePicker label='Solution Deadline' input={{ placeholder: "Select a date" }} />
                                <MKInput type='time' label='Select a Time' />
                            </Grid>
                            
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4} display='flex' flexDirection='column' order={{ xs: 1, md: 2 }}>
                        <ActionButton label='Cancel' color='secondary' />
                        <ActionButton label='Save To Draft' color='info' />
                        <ActionButton label='Submit' type='submit' value='Submit' color='success' />
                    </Grid>
                    <Grid item xs={12} md={12} display='flex' flexDirection='column' order={{ xs: 4, md: 4 }}>
                        <MKTypography variant='h5' sx={{ mb: 1, mt: 5 }}>Description</MKTypography>
                        <RichTextEditor height='400px' placeholder="Insert your description here..." />
                    </Grid>
                    <Grid item xs={12} md={12} display='flex' flexDirection='column' order={{ xs: 5, md: 5 }}>
                        <MKTypography variant='h5' sx={{ mb: 1, mt: 5 }}>Requirements</MKTypography>
                        <RichTextEditor height='500px' placeholder="Insert your functional or non-functional requirements here..." />
                    </Grid>
                    <Grid item xs={12} md={12} display='flex' flexDirection='column' order={{ xs: 6, md: 6 }}>
                        <MKTypography variant='h5' sx={{ mb: 1, mt: 5 }}>Rewards (if any)</MKTypography>
                        <RichTextEditor height='500px' placeholder="If you have reward, please insert it here..." />
                    </Grid>

                </Grid>
            </form>
        </BasicPageLayout>
    )
}

export default CreateRequest;