import Grid from '@mui/material/Grid';
import RichTextEditor from 'company/components/RichTextEditor';
import MKTypography from 'components/MKTypography';
import React from 'react';

const FormSection = ({order, minHeight, editorHeight, title, value, setValue, placeholder}) => {
    return (
        <Grid item xs={12} md={12} display='flex' flexDirection='column' order={{ xs: order, md: order }} sx={{ minHeight: minHeight }}>
            <MKTypography variant='h5' sx={{ mb: 1, mt: 2 }}>{title}</MKTypography>
            <RichTextEditor height={editorHeight} value={value} setValue={setValue} placeholder={placeholder} />
        </Grid>
    );
};

export default FormSection;