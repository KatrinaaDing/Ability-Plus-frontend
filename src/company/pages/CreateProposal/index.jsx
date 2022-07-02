
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import BasicPageLayout from "company/BasicPageLayout";
import MKButton from "components/MKButton";
/**
 * Author: Ziqi Ding
 * Created At: 02 Jul 2022
 * Discription: The page for company to create proposal
 */
import MKInput from "components/MKInput";


const CreateProposal = () => {

    const ActionButton = ({...props}) => {
        return (
        <MKButton variant='gradient' sx={{ m: 2 }} color={props.color}>
            {props.label}
        </MKButton>
        )
    }

    return (
        <BasicPageLayout title="Create Proposal">
            <Grid container spacing={2}>
                <Grid item xs={6} md={8} display='flex' flexDirection='column' justifyContent='space-between'>
                    <MKInput 
                        type='text' 
                        label="Title"
                        sx={{ mt: 4, mr: 5 }}
                    />
                    <MKInput 
                        type='text' 
                        label="One line description" 
                        sx={{ mt: 4, mr: 5, mb: 2 }}

                    />
                </Grid>
                <Grid item xs={6} md={4} display='flex' flexDirection='column' >
                    <ActionButton label='Cancel' color='secondary'/>
                    <ActionButton label='Save To Draft' color='info' />
                    <ActionButton label='Submit' color='success' />
                </Grid>
                <Grid item xs={12} md={12} display='flex' flexDirection='column' >
                    <MKInput 
                        type='text' 
                        multiline 
                        rows={10} 
                        label="Details" 
                        sx={{ mt: 4 }}
                    />
                    <MKInput 
                        type='text' 
                        multiline 
                        rows={10} 
                        label="One line description" 
                        sx={{ mt: 4 }}

                    />
                </Grid>
                
            </Grid>
        </BasicPageLayout>
    )
}

export default CreateProposal;