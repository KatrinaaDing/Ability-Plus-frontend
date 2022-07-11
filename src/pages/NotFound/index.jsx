/**
 * author: Jake_Woods
 * source code: https://codepen.io/Jake_Woods/pen/LYEMGpV
 * publisher: https://codepen.io/Jake_Woods
 * visited at: 08 Jul 2022
 */

import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import BasicPageLayout from 'glhfComponents/BasicPageLayout';
import React from 'react';
import './index.scss'

const NotFound = () => {
    return (
        <BasicPageLayout >
            <MKBox 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    m: 'auto'
                }}
            >
                <h1 class='num'>4<span><i className="fas fa-ghost"></i></span>4</h1>
                <MKTypography variant='h2' sx={{ textAlign: 'center' }} >Error: 404 page not found</MKTypography>
                
            </MKBox>
        </BasicPageLayout>
    );
};

export default NotFound;