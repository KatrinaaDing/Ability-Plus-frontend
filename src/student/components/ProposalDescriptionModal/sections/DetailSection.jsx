import MKTypography from 'components/MKTypography';
import React from 'react';
import Grid from '@mui/material/Grid';
import ReactQuill from 'react-quill';


const DetailSection = ({ order, title, content }) => {
    return (
        <Grid item xs={12} md={12} display='flex' flexDirection='column' order={{ xs: order, md: order }}>
            <MKTypography variant='h5' sx={{ mb: 1 }}>{title}</MKTypography>
            <ReactQuill
                theme="bubble"
                readOnly
                value={content}
            />
        </Grid>
    );
};

export default DetailSection;