/**
 * Author: Ziqi Ding
 * Created At: 14 Jul 2022
 * Discription: A button that allows company to view all proposals
 */
import MKButton from 'components/MKButton';
import React from 'react';

const ViewProposalsBtn = ({reqName, reqId}) => {
    return (
        <MKButton
            variant='gradient'
            color='info'
            onClick={() => window.open(`/view-proposals/${reqName}/${reqId}`, '_blank')}
        >
            View All Proposals
        </MKButton>
    );
};

export default ViewProposalsBtn;