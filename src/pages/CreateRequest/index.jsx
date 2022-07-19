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

import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";
import MKAlert from 'components/MKAlert';
import Collapse from '@mui/material/Collapse';
import FormSection from './sections/FormSection';
import DatePicker from './sections/DatePicker';
import BasicPageLayout from 'glhfComponents/BasicPageLayout';
import RequestDescriptionModal from 'glhfComponents/RequestDescriptionModal';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { useNavigate, useParams } from 'react-router-dom';
import AlertModal from 'glhfComponents/AlertModal';
import useAuth from 'auth/useAuth';
import ActionButton from './components/ActionButton';
import axios from 'axios';
import { BASE_URL } from 'api/axios'
import { statusBank } from 'utils/getStatus';

const categories = [
    'Frontend Develop',
    'Management',
    'Backend Develop',
]

const sampleContent = {
    title: "Quisque eget luctus nunc",
    cate: "Frontend Develop",
    ppddl: new Date('2022-08-17'),
    solddl: new Date('2022-10-09'),
    desc: "<p>Vestibulum eu efficitur quam. Ut laoreet a felis vitae mattis. Donec tincidunt vitae nisi sit amet posuere. Duis vel massa massa. Sed et neque leo. In hac habitasse platea dictumst. Sed mollis euismod nulla non feugiat. Nulla quis convallis massa. <u>Duis interdum enim nisi, vel viverra nibh dictum et. Nullam ipsum libero</u>, feugiat id lectus non, tempor suscipit quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;</p><p><br></p>",
    req: "<h2>Functional</h2><ol><li>Sed mollis euismod nulla non feugiat.</li><li>Nulla quis convallis massa.&nbsp;</li><li>Duis interdum enim nisi, vel viverra nibh dictum et.</li><li>Nullam ipsum libero, feugiat id lectus non, tempor suscipit quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;</li></ol><p><br></p><h2>Non-functional</h2><ol><li>Morbi sed dictum dui. Aenean at est lectus. </li><li>Suspendisse condimentum leo ac nisl varius maximus. </li><li>Nam commodo ultricies elit, ut sagittis dolor volutpat et. </li><li>Curabitur quis lacus vitae justo efficitur gravida. </li><li>Aenean dictum orci eu elit fermentum aliquet. </li><li>Donec fermentum porttitor felis at eleifend.</li></ol><p><br></p>",
    rew: "<p>$1000</p>",
}

const CreateRequest = () => {
    const isEditing = window.location.pathname.slice(1).startsWith('edit');

    // hooks
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const { auth } = useAuth();
    const { id: requestId } = useParams();

    // input state
    const [title, setTitle] = React.useState('')
    const [category, setCategory] = React.useState('')
    const [propDdl, setPropDdl] = React.useState('')    // date object
    const [soluDdl, setSoluDdl] = React.useState('')    // date object
    const [description, setDescription] = React.useState('')
    const [requirement, setRequirement] = React.useState('')
    const [rewards, setRewards] = React.useState('')
    const [status, setStatus] = React.useState(
        isEditing ? '' : statusBank.request.draft.label
    )
    const [contactEmail, setContactEmail] = React.useState('');
    
    // error alert state
    const [error, setError] = React.useState('')
    const [alertOpenDraft, setAlertOpenDraft] = React.useState(false)
    const [alertOpenSubmit, setAlertOpenSubmit] = React.useState(false)

    const [preview, setPreview] = React.useState(false)


    React.useEffect(async () => {   
        // load data if is to edit request
        if (isEditing) {
            await axiosPrivate.get(`/project/get_project_info?id=${requestId}`)
                .then(res => {
                    // if return with error, return reject
                    if (res.data.status >= 400) 
                        return Promise.reject(res.data.message)
                    
                    // else
                    const data = res.data.data
                    const extraData = JSON.parse(data.extraData)
                    setTitle(data.name)
                    setCategory(data.projectArea)
                    setPropDdl(new Date(data.proposalDdl * 1000))
                    setSoluDdl(new Date(data.solutionDdl * 1000))
                    setDescription(data.description)
                    setRequirement(extraData.requirement)
                    setRewards(extraData.rewards)
                    setStatus(data.status)
                    setContactEmail(data.contactEmail)
                })
                // .catch(e => setError(e))
                .catch(e => console.log('err', e))
        }
    },[])


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
            Requirements: requirement,
        }

        const errorList = [];
        Object.keys(checkList).forEach(i => {
            if (checkList[i] === 0 || checkList[i] === '' || checkList[i] === '<p><br></p>')
                errorList.push(i)
        })

        // check empty field
        if (errorList.length > 0) {
            setError(errorList.join(', ') + ' cannot be empty! Please check again.')
            return
        }
        // prop deadline must < solu deadline
        if (propDdl > soluDdl) {
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

    const isAllEmpty = () => {
        const strCheckList = [title, category, propDdl, soluDdl, description, requirement, rewards]
        for (let input of strCheckList) {
            if (input !== '' && input !== '<p><br></p>') {
                return false
            }
        }

        return true
    }

    const getContent = () => {
        return {
            "categoryType": category,
            "extraData": {
                description: description,
                requirement: requirement,
                rewards: rewards,
            },
            "proposalDue": propDdl === '' ? 0 : propDdl.getTime() / 1000,
            "solutionDue": soluDdl === '' ? 0 : soluDdl.getTime() / 1000,
            "title": title
        }
    }


    const handleSaveDraft = async () => {
        if (isAllEmpty()) {
            setError("Cannot save empty proposal!")
            return
        }

        const body = {
            ...getContent(),
            "isDraft": true,
        }

        // save edited request
        if (isEditing) {
            await axiosPrivate.post('/project/edit_project', {
                ...body,
                projectId: requestId
            })
            .then(res => {
                setAlertOpenDraft(true)
            })
            .catch(e => {
                setError(e)
            })

            // save new created request
        } else {
            await axiosPrivate.post('/project/create_project_request', body)
            .then(res => {
                setAlertOpenDraft(true)
            })
            .catch(e => console.error(e))
        }
    }


    const handleSubmit = async () => {
        const body = getContent()

        // submit edited request
        if (isEditing) {
            body.contactEmail = contactEmail
            body.projectId = parseInt(requestId)
            await axiosPrivate.post(`/project/edit_project`, body)
                .then(res => {
                    setPreview(false)
                    setAlertOpenSubmit(true)
                })
                .catch(e => {
                    console.error(e)
                })

        // submit new created request
        } else {
            body.isDraft = false;
            await axiosPrivate.post(`/project/create_project_request`, body)
                .then(res => {
                    setPreview(false)
                    setAlertOpenSubmit(true)
                })
                .catch(e => {
                    console.error(e)
                })
        }
    }
    const SaveDraftConfirm = () =>
        <AlertModal
            open={alertOpenDraft}
            handleClose={() => setAlertOpenDraft(false)}
            handleConfirm={() => setAlertOpenDraft(false)}
            title="Successfully Saved"
            content="Your proposal has been saved to draft!"
        />

    const SubmitConfirm = () =>
        <AlertModal
            open={alertOpenSubmit}
            handleClose={() => setAlertOpenSubmit(false)}
            handleConfirm={() => navigate('/my-project-requests')}
            title="Your proposal has been publised!"
            content="You'll be redirect to My Proposals page."
        />

    return (
        <BasicPageLayout title={`${isEditing ? 'Edit' : 'Create'} Project Request`}>
            <SaveDraftConfirm />
            <SubmitConfirm />
            <MKButton variant='outlined' color='info' onClick={() => setSample()}>Fill with Sample Content</MKButton>
            <Collapse in={error != ''}>
                <MKAlert color="error" >
                    <WarningAmberIcon fontSize='medium' sx={{ mr: 2 }} /> &nbsp;
                    {error}
                </MKAlert>
            </Collapse>
            <RequestDescriptionModal
                open={preview}
                setOpen={setPreview}
                value={{
                    title,
                    category,
                    propDdl,
                    soluDdl,
                    description,
                    requirement,
                    rewards,
                    status: statusBank.request.proposal.label,
                    metaData: {
                        lastModified: new Date(),
                        authorName: auth.username,
                    }
                }}
                actionButton={
                    <MKButton variant="gradient" color="success" onClick={handleSubmit}>
                        Submit
                    </MKButton>
                }
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
                                    style={{ height: '45px' }}
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
                    {
                        status === statusBank.request.draft.label && 
                        <ActionButton label='Save To Draft' color='info' onClick={handleSaveDraft} />
                    }
                    <ActionButton label='Preview & Submit' onClick={handlePreview} value='Submit' color='success' />
                </Grid>

                <FormSection
                    order={4}
                    minHeight='350px'
                    editorHeight='200px'
                    title='Description'
                    value={description}
                    setValue={setDescription}
                    placeholder="Insert your description here..."
                />
                <FormSection
                    order={5}
                    minHeight='350px'
                    editorHeight='200px'
                    title='Requirements (functional/non-functional)'
                    value={requirement}
                    setValue={setRequirement}
                    placeholder="Insert your functional or non-functional requirements here..."
                />
                <FormSection
                    order={6}
                    minHeight='100px'
                    editorHeight='100px'
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