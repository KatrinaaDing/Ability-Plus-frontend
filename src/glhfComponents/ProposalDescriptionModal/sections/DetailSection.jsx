/**
 * Author: Ziqi Ding
 * Created At: 03 Jul 2022
 * Discription: The read-only rich text component
 */
import MKTypography from 'components/MKTypography';
import React from 'react';
import Grid from '@mui/material/Grid';
import ReactQuill from 'react-quill';


const DetailSection = ({ order, title, content }) => {
    return (
        <Grid item xs={12} md={12} display='flex' flexDirection='column' order={{ xs: order, md: order }}>
            <MKTypography variant='h5' sx={{ mb: 1 }}>{title}</MKTypography>
            {
                typeof content === 'string' 
                    ? <ReactQuill
                        theme="bubble"
                        readOnly
                        value={content}
                        />
                    : content
            }
            
        </Grid>
    );
};

export default DetailSection;