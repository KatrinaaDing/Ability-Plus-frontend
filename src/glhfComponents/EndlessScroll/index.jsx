import MKTypography from 'components/MKTypography';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const EndlessScroll = ({ children, hasMore, next, dataLength }) => {
    return (
        <InfiniteScroll
            dataLength={dataLength}
            next={next}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
                dataLength > 0 &&
                <MKTypography varaint='subtitle1' sx={{ textAlign: 'center', pt: 3 }}>
                    Yay! You have seen all.
                </MKTypography>
            }
        >
            {children}
        </InfiniteScroll>
    );
};

export default EndlessScroll;