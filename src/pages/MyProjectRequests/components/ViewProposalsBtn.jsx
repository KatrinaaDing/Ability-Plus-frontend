import MKButton from 'components/MKButton';
import React from 'react';

const ViewProposalsBtn = () => {
    return (
        <MKButton
            variant='gradient'
            color='info'
            onClick={() => window.open(`/view-proposals/${reqDetail.name}/${reqDetail.id}`, '_blank')}
        >
            View All Proposals
        </MKButton>
    );
};

export default ViewProposalsBtn;