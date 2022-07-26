import MKButton from 'components/MKButton';
import React from 'react';

const ViewRankingBtn = ({id}) => {
    return (
        <MKButton
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => window.open(`/view-request-ranks/${id}`)}
        >
            View Ranking
        </MKButton>
    );
};

export default ViewRankingBtn;