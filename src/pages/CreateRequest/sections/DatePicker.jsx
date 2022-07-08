/**
 * Author: Ziqi Ding
 * Created At: 03 Jul 2022
 * Discription: A styled Datepicker
 */
import Grid from '@mui/material/Grid';
import MKDatePicker from 'components/MKDatePicker';
import MKTypography from 'components/MKTypography';
import React from 'react';

const DatePicker = ({title, value, setValue}) => {
    return (
        <Grid item sx={12} md={4} display='flex' flexDirection='column'>
            <MKTypography variant='h5' sx={{ mb: 1, mt: 2 }}>
                {title}
            </MKTypography>
            <MKDatePicker 
                options={{
                    enableTime: true,
                    dateFormat: "Y-m-d H:i",
                    minDate: new Date()
                }} 
                input={{ placeholder: "Select a date" }} 
                value={value} 
                onChange={(dates, dateStr) => setValue(dateStr)} 
                sx={{ mt: 2 }} />
        </Grid>
    );
};

export default DatePicker;