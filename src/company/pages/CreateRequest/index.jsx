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
import Grid from "@mui/material/Grid";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import BasicPageLayout from "company/BasicPageLayout";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";
import MKAlert from 'components/MKAlert';
import Collapse from '@mui/material/Collapse';
import FormSection from './sections/FormSection';
import DatePicker from './sections/DatePicker';
import RequestDescriptionModal from 'company/components/RequestDescriptionModal';


const categories = [
    'Frontend Develop',
    'Management',
    'Backend Develop',
]

const sampleContent = {
    title: "Quisque eget luctus nunc",
    cate: "Frontend Develop",
    ppddl: "2022-08-17 18:31",
    solddl: "2022-11-15 18:31",
    desc: "<p>Vestibulum eu efficitur quam. Ut laoreet a felis vitae mattis. Donec tincidunt vitae nisi sit amet posuere. Duis vel massa massa. Sed et neque leo. In hac habitasse platea dictumst. Sed mollis euismod nulla non feugiat. Nulla quis convallis massa. <u>Duis interdum enim nisi, vel viverra nibh dictum et. Nullam ipsum libero</u>, feugiat id lectus non, tempor suscipit quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;</p><p><br></p><p>Morbi sed dictum dui. Aenean at est lectus. <span style=\"color: rgb(230, 0, 0);\">Suspendisse condimentum</span> leo ac nisl varius maximus. <span style=\"background-color: rgb(255, 255, 0);\">Nam commodo ultricies elit, ut sagittis dolor volutpat et. Curabitur quis lacus vitae justo efficitur gravida. Aenean dictum orci eu elit fermentum aliquet. Donec fermentum porttitor felis at eleifend.</span></p><p><br></p><p>Quisque eget luctus nunc. Morbi tempor pharetra sapien, <strong>ut interdum lacus interdum id</strong>. Nullam ac urna sed mauris interdum malesuada vitae eu enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus vel eleifend lectus. Ut rutrum tellus a est volutpat, nec placerat sapien gravida. Sed sit amet lectus et libero fringilla varius vitae at velit. Cras vitae sapien at eros fermentum interdum quis ut velit. Mauris interdum feugiat felis, nec ornare justo laoreet vel. Suspendisse posuere a enim non rutrum. Praesent dapibus nisl erat.</p>",
    req: "<h2>Functional</h2><ol><li>Sed mollis euismod nulla non feugiat.</li><li>Nulla quis convallis massa.&nbsp;</li><li>Duis interdum enim nisi, vel viverra nibh dictum et.</li><li>Nullam ipsum libero, feugiat id lectus non, tempor suscipit quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;</li></ol><p><br></p><h2>Non-functional</h2><ol><li>Morbi sed dictum dui. Aenean at est lectus. </li><li>Suspendisse condimentum leo ac nisl varius maximus. </li><li>Nam commodo ultricies elit, ut sagittis dolor volutpat et. </li><li>Curabitur quis lacus vitae justo efficitur gravida. </li><li>Aenean dictum orci eu elit fermentum aliquet. </li><li>Donec fermentum porttitor felis at eleifend.</li></ol><p><br></p>",
    rew: "<p>$1000</p>"
}

const CreateRequest = () => {
    const [title, setTitle] = React.useState('')
    const [category, setCategory] = React.useState('')
    const [propDdl, setPropDdl] = React.useState('')
    const [soluDdl, setSoluDdl] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [requirement, setRequirement] = React.useState('')
    const [rewards, setRewards] = React.useState('')
    const [error, setError] = React.useState('')
    const [preview, setPreview] = React.useState(false)

    const ActionButton = ({ ...props }) => {
        return (
            <MKButton variant='gradient' sx={{ m: 2 }} color={props.color} onClick={props.onClick}>
                {props.label}
            </MKButton>
        )
    }

    const titleSx = { mb: 1, mt: 2 }

    const handleCategory = (event) => {
        setCategory(event.target.value)
    }

    const handlePreview = () => {
        const checkList = {
            Title: title,
            Category: category,
            'Proposal Deadline': propDdl,
            'Solution Deadline': soluDdl,
            Description: description,
            Requirements: requirement
        }
        console.log(checkList, rewards)

        const errorList = [];
        Object.keys(checkList).forEach(i => {
            if (checkList[i] === '' || checkList[i] === '<p><br></p>')
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
        setPreview(true)
    }

    const setSample = () => {
        setTitle(sampleContent.title)
        setCategory(sampleContent.cate)
        setPropDdl(sampleContent.ppddl)
        setSoluDdl(sampleContent.solddl)
        setDescription(sampleContent.desc)
        setRequirement(sampleContent.req)
        setRewards(sampleContent.rew)

    }

    return (
        <BasicPageLayout title="Create Project Request">
            <MKButton variant='outlined' color='info' onClick={() => setSample()}>Fill with Sample Content</MKButton>
            <Collapse in={error != ''}>
                <MKAlert color="error" >
                    <WarningAmberIcon fontSize='medium' sx={{ mr: 2}}/> &nbsp;
                    {error}
                </MKAlert>
            </Collapse>
            <RequestDescriptionModal
                preview={preview}
                setPreview={setPreview}
                value={{title,category,propDdl,soluDdl,description,requirement,rewards}}
            />
            <Grid container spacing={2} justify='flex-start'>
                <Grid item xs={12} md={8} display='flex' flexDirection='column' justifyContent='space-between' order={{ xs: 2, md: 1 }}>
                    <div>
                        <MKTypography variant='h5' sx={titleSx}>
                            Title 
                        </MKTypography>
                        <MKInput fullWidth type='text' required value={title} onChange={(e) => setTitle(e.target.value)} label="Insert your project topic here..." sx={{ mr: 5 }} />
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
                        <DatePicker
                            title="Proposal Deadline"
                            value={propDdl}
                            setValue={setPropDdl}
                        />
                        <DatePicker
                            title="Solution Deadline"
                            value={soluDdl}
                            setValue={setSoluDdl}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4} display='flex' flexDirection='column' order={{ xs: 1, md: 2 }} >
                    <ActionButton label='Cancel' color='secondary' />
                    <ActionButton label='Save To Draft' color='info' />
                    <ActionButton label='Preview & Submit' onClick={handlePreview} value='Submit' color='success' />
                </Grid>
                
                <FormSection 
                    order={4}
                    minHeight='600px'
                    editorHeight='400px'
                    title='Description'
                    value={description}
                    setValue={setDescription}
                    placeholder="Insert your description here..."
                />
                <FormSection
                    order={5}
                    minHeight='600px'
                    editorHeight='500px'
                    title='Requirements (functional/non-functional)'
                    value={requirement}
                    setValue={setRequirement}
                    placeholder="Insert your functional or non-functional requirements here..."
                />
                <FormSection
                    order={6}
                    minHeight='600px'
                    editorHeight='500px'
                    title='Rewards (if any)'
                    value={rewards}
                    setValue={setRewards}
                    placeholder="If you have reward, please insert it here..."
                />
                

            </Grid>
        </BasicPageLayout>
    )
}

export default CreateRequest;