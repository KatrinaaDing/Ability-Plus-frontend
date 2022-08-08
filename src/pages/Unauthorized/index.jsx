/**
 * Author: Ziqi Ding
 * Created At: 08 Jul 2022
 * Description: A page for unauthorized user
 */
import BasicPageLayout from 'glhfComponents/BasicPageLayout';
import React from 'react';
import MKTypography from 'components/MKTypography';
import MKBox from 'components/MKBox';

const Unauthorized = () => {
    return (
        <BasicPageLayout title="403 Unauthorized">
            <MKBox
                display='flex'
                flexDirection='column'
                justifyContent='center'
                sx={{
                    height: '600px',
                    mx: 'auto',
                    my: 'auto',
                    textAlign: 'center',

                }}
            >
                <MKTypography variant='h1' color='warning'>YOU SHALL NOT PASS</MKTypography>
                <MKTypography variant='body'>Sorry, you don't have permission to access this area :(</MKTypography>

            </MKBox>
        </BasicPageLayout>
    );
};

export default Unauthorized;