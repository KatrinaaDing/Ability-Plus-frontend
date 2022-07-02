/**
 * Author: Ziqi Ding
 * Created At: 02 Jul 2022
 * Discription: The page for company to create proposal
 */
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import BasicPageLayout from "company/BasicPageLayout";
import RichTextEditor from "company/components/RichTextEditor";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";


const CreateProposal = () => {

    const ActionButton = ({...props}) => {
        return (
        <MKButton variant='gradient' sx={{ m: 2 }} color={props.color}>
            {props.label}
        </MKButton>
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <BasicPageLayout title="Create Proposal">
            <form onSubmit={handleSubmit}>
            <Grid container spacing={2} justify='flex-start'>
                
                    <Grid item xs={12} md={8} display='flex' flexDirection='column' justifyContent='space-between' order={{ xs: 2, md: 1 }}>
                        <div>
                            <MKTypography variant='h5' sx={{ mb: 1, mt: 2 }}>
                                Title
                            </MKTypography>
                            <MKInput fullWidth type='text' label="Insert title here..." sx={{  mr: 5 }}/>
                        </div>
                        <div>
                            <MKTypography variant='h5' sx={{ mb: 1, mt: 2 }}>
                                One-line Description
                            </MKTypography>
                            <MKInput fullWidth type='text' label="Please use one sentence to describe your proposal..." sx={{ mr: 5 }}/>

                        </div>
                    </Grid>
                    <Grid item xs={12} md={4} display='flex' flexDirection='column' order={{ xs: 1, md: 2 }}>
                        <ActionButton label='Cancel' color='secondary'/>
                        <ActionButton label='Save To Draft' color='info' />
                        <ActionButton label='Submit' type='submit' value='Submit' color='success' />
                    </Grid>
                    <Grid item xs={12} md={12} display='flex' flexDirection='column' order={{ xs: 3, md: 3 }}>
                        <MKTypography variant='h5' sx={{ mb: 1, mt: 5 }}>Problems to solve</MKTypography>
                        <RichTextEditor height='400px' placeholder="Insert Problems that you want to solve here..." />
                    </Grid>
                    <Grid item xs={12} md={12} display='flex' flexDirection='column' order={{ xs: 4, md: 4 }}>
                        <MKTypography variant='h5' sx={{ mb: 1, mt: 5 }}>Vision Statement</MKTypography>
                        <RichTextEditor height='400px' placeholder="Insert your vision statement here..." />
                    </Grid>
                    <Grid item xs={12} md={12} display='flex' flexDirection='column' order={{ xs: 5, md: 5 }}>
                        <MKTypography variant='h5' sx={{mb: 1, mt: 5}}>General Goals</MKTypography>
                        <RichTextEditor height='500px' placeholder="Insert general goals here..." />
                    </Grid>
                    <Grid item xs={12} md={12} display='flex' flexDirection='column' order={{ xs: 6, md: 6 }}>
                        <MKTypography variant='h5' sx={{mb: 1, mt: 5}}>Details</MKTypography>
                        <RichTextEditor height='500px' placeholder="Insert proposal detail here..." />
                    </Grid>

            </Grid>
                </form>
        </BasicPageLayout>
    )
}

export default CreateProposal;