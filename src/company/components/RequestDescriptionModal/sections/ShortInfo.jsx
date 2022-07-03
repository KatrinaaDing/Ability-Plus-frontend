import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import React from 'react';

const ShortInfo = ({title, content}) => {
    return (
        <MKBox display='flex' justify='flex-start' pb={2}>
            <MKTypography variant='h5' sx={{ mb: 'auto', mt: 'auto', mr: 3 }}>
                {title}:
            </MKTypography>
            <MKTypography variant='body2' sx={{ mb: 'auto', mt: 'auto' }}>
                {content}
            </MKTypography>
        </MKBox>
    );
};

export default ShortInfo;