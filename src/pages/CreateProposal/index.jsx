/**
 * Author: Ziqi Ding
 * Created At: 02 Jul 2022
 * Discription: The page for company to create proposal
 */
import React from 'react';
import Grid from "@mui/material/Grid";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";
import MKAlert from 'components/MKAlert';
import Collapse from '@mui/material/Collapse';
import FormSection from 'pages/CreateRequest/sections/FormSection';
import ProposalDescriptionModal from 'glhfComponents/ProposalDescriptionModal';
import BasicPageLayout from 'glhfComponents/BasicPageLayout';


const sampleContent = {
    title: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
    desc: "Aenean at est lectus. Suspendisse condimentum leo ac nisl varius maximus.",
    detail: `<p class="ql- align - justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae orci ante. Sed est orci, congue non bibendum id, rhoncus ac nulla. Etiam elementum quam quis ultricies ornare. Pellentesque vehicula sapien sed suscipit aliquet. Curabitur non tellus vulputate, condimentum lacus eu, porttitor dui. Nunc id tortor nec metus fringilla pharetra. Nunc tempus venenatis diam, ut varius leo mollis id. Vivamus faucibus et diam in pretium. In ac erat a est efficitur congue sit amet nec dolor. Proin hendrerit vel tellus elementum mattis. Donec elementum ut elit ut tempor. Ut pulvinar, tortor vitae aliquet sodales, dui leo auctor purus, rutrum venenatis erat justo id elit. Donec a gravida nunc. Integer volutpat ipsum ut interdum elementum. Duis sit amet neque eget sem vulputate pretium. Cras posuere luctus sapien, in porta dolor interdum at.</p><p class="ql - align - justify"><br></p><p class="ql - align - justify">Vestibulum eu efficitur quam. Ut laoreet a felis vitae mattis. Donec tincidunt vitae nisi sit amet posuere. Duis vel massa massa. Sed et neque leo. In hac habitasse platea dictumst. Sed mollis euismod nulla non feugiat. Nulla quis convallis massa. Duis interdum enim nisi, vel viverra nibh dictum et. Nullam ipsum libero, feugiat id lectus non, tempor suscipit quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;</p><p class="ql - align - justify"><br></p><p class="ql - align - justify">Morbi sed dictum dui. Aenean at est lectus. Suspendisse condimentum leo ac nisl varius maximus. Nam commodo ultricies elit, ut sagittis dolor volutpat et. Curabitur quis lacus vitae justo efficitur gravida. Aenean dictum orci eu elit fermentum aliquet. Donec fermentum porttitor felis at eleifend.</p><p class="ql - align - justify"><br></p><p class="ql - align - justify">Quisque eget luctus nunc. Morbi tempor pharetra sapien, ut interdum lacus interdum id. Nullam ac urna sed mauris interdum malesuada vitae eu enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus vel eleifend lectus. Ut rutrum tellus a est volutpat, nec placerat sapien gravida. Sed sit amet lectus et libero fringilla varius vitae at velit. Cras vitae sapien at eros fermentum interdum quis ut velit. Mauris interdum feugiat felis, nec ornare justo laoreet vel. Suspendisse posuere a enim non rutrum. Praesent dapibus nisl erat.</p><p class="ql - align - justify"><br></p><p class="ql - align - justify">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque iaculis finibus tellus, in interdum tortor dignissim vel. Duis eget mi rutrum, vulputate odio ut, lacinia enim. Sed a neque ligula. Aliquam eu ullamcorper arcu, id sollicitudin nunc. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed et enim quis massa accumsan facilisis. Aliquam ornare ornare mi, quis maximus orci congue ut. Ut luctus tellus nec semper rutrum. Pellentesque mi dui, vestibulum in tempor nec, vehicula eu eros.</p><p><br></p>`,
    goal: "<ol><li>a felis vitae mattis. Donec tincidunt vitae nisi sit amet posuere. Duis vel massa massa. Sed et neque leo. In hac habitasse platea dictumst.</li><li>Morbi sed dictum dui. Aenean at est lectus.</li><li>Curabitur quis lacus vitae justo efficitur gravida. Aenean dictum orci eu elit fermentum aliquet. Donec fermentum porttitor felis at eleifend.</li><li>Quisque eget luctus nunc.&nbsp;</li></ol>",
    prob: `<p class="ql-align-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Fusce vitae orci ante</strong>. Sed est orci, congue non bibendum id, rhoncus ac nulla. Etiam elementum quam quis ultricies ornare. Pellentesque vehicula sapien sed suscipit aliquet. Curabitur non tellus vulputate, <span style="background-color: rgb(255, 255, 0);">condimentum lacus eu,</span> porttitor dui. Nunc id tortor nec metus fringilla pharetra. Nunc tempus venenatis diam, ut varius leo mollis id. Vivamus faucibus <em>et diam in </em>pretium. In ac erat a est efficitur congue sit amet nec dolor. Proin hendrerit vel tellus elementum mattis. Donec elementum ut elit ut tempor. Ut pulvinar, tortor vitae aliquet sodales, dui leo auctor purus, rutrum venenatis erat justo id elit. Donec a gravida nunc. Integer volutpat ipsum ut interdum elementum. Duis sit amet neque eget sem vulputate pretium. Cras posuere luctus sapien, in porta dolor interdum at.</p><p><br></p><ul><li><span style="color: rgb(230, 0, 0);">piscing elit. Fusce vitae orci ante.</span> Sed est orci, congu</li><li>piscing elit. Fusce vitae orci ante. Sed est </li><li>piscing elit. Fusce vitae orci ante. Sed est orci, congupiscing elit. Fusce vitae orci ante. Sed est orci, congu</li></ul><p><br></p><p>Vestibulum eu efficitur quam. Ut laoreet a felis vitae mattis. Donec tincidunt vitae nisi sit amet posuere. Duis vel massa massa. Sed et neque leo. In hac habitasse platea dictumst. Sed mollis euismod nulla non feugiat. Nulla quis convallis massa. Duis interdum enim nisi, vel viverra nibh dictum et. Nullam ipsum libero, feugiat id lectus non, tempor suscipit quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;</p>`,
    vStat: "<p>s leo mollis id. Vivamus faucibus et diam in pretium. In ac erat a est efficitur congue sit amet nec dolor. Proin hendrerit vel tellus elementum mattis. Donec elementum ut elit ut tempor. Ut pulvinar, tortor vitae aliquet sodales, dui leo auctor purus, rutrum venenatis erat justo id elit. Donec a gravida nunc. Integer volutpat ipsum ut interdum elementum. Duis sit amet neque eget sem vulputate pretium. Cras posuere luctus sapien, in porta dolor interdum at.</p>"
}

const CreateProposal = () => {
    const [title, setTitle] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [prob, setProb] = React.useState('');
    const [vStat, setVStat] = React.useState('');
    const [goal, setGoal] = React.useState('');
    const [detail, setDetail] = React.useState('');
    const [error, setError] = React.useState('')
    const [preview, setPreview] = React.useState(false);

    const ActionButton = ({ ...props }) => {
        return (
            <MKButton variant='gradient' sx={{ m: 2 }} color={props.color} onClick={props.onClick}>
                {props.label}
            </MKButton>
        )
    }

    const handleSubmit = () => {
        const checkList = {
            title: title,
            description: desc,
            'problems to solve': prob,
            'vision statement': vStat,
            'general goals': goal,
            details: detail
        }
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
        setError('')
        setPreview(true)
    }

    const setSample = () => {
        setTitle(sampleContent.title)
        setDesc(sampleContent.desc)
        setProb(sampleContent.prob)
        setVStat(sampleContent.vStat)
        setGoal(sampleContent.goal)
        setDetail(sampleContent.detail)
    }

    return (
        <BasicPageLayout title="Create Proposal">
            <MKButton variant='outlined' color='info' onClick={()=>setSample()}>Fill with Sample Content</MKButton>
            <MKTypography variant='subtitle1'>This proposal is submitted for: Proposal Management</MKTypography>
            <Collapse in={error != ''}>
                <MKAlert color="error" >
                    <WarningAmberIcon fontSize='medium' sx={{ mr: 2 }} /> &nbsp;
                    {error}
                </MKAlert>
            </Collapse>
            <ProposalDescriptionModal
                preview={preview}
                setPreview={setPreview}
                value={{ title, desc, prob, vStat, goal, detail }}
            />
            <Grid container spacing={2} justify='flex-start'>
                <Grid item xs={12} md={8} display='flex' flexDirection='column' justifyContent='space-between' order={{ xs: 2, md: 1 }}>
                    <div>
                        <MKTypography variant='h5' sx={{ mb: 1, mt: 2 }}>
                            Title
                        </MKTypography>
                        <MKInput fullWidth value={title} onChange={(e) => setTitle(e.target.value)} type='text' label="Insert title here..." sx={{ mr: 5 }} />
                    </div>
                    <div>
                        <MKTypography variant='h5' sx={{ mb: 1, mt: 2 }}>
                            One-line Description
                        </MKTypography>
                        <MKInput fullWidth value={desc} onChange={(e) => setDesc(e.target.value)} type='text' label="Please use one sentence to describe your proposal..." sx={{ mr: 5 }} />

                    </div>
                </Grid>
                <Grid item xs={12} md={4} display='flex' flexDirection='column' order={{ xs: 1, md: 2 }}>
                    <ActionButton label='Cancel' color='secondary' />
                    <ActionButton label='Save To Draft' color='info' />
                    <ActionButton label='Preview & Submit' onClick={handleSubmit} color='success' />
                </Grid>

                <FormSection
                    order={3}
                    minHeight='600px'
                    editorHeight='400px'
                    title='Problems to Solve'
                    value={prob}
                    setValue={setProb}
                    placeholder="Insert Problems that you want to solve here..."
                />
                <FormSection
                    order={4}
                    minHeight='600px'
                    editorHeight='400px'
                    title='Vision Statement'
                    value={vStat}
                    setValue={setVStat}
                    placeholder="Insert your vision statement here..."
                />
                <FormSection
                    order={5}
                    minHeight='600px'
                    editorHeight='500px'
                    title='General Goals'
                    value={goal}
                    setValue={setGoal}
                    placeholder="Insert general goals here..."
                />
                <FormSection
                    order={6}
                    minHeight='600px'
                    editorHeight='500px'
                    title='Details'
                    value={detail}
                    setValue={setDetail}
                    placeholder="Insert proposal detail here..."
                />

            </Grid>
        </BasicPageLayout>
    )
}

export default CreateProposal;