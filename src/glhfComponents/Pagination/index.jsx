import { Container, Grid, Icon } from '@mui/material';
import MKPagination from 'components/MKPagination';
import React from 'react';

const Pagination = () => {
    return (
        <Container sx={{ height: "100%" }}>
            <Grid container item justifyContent="center" xs={12} lg={6} mx="auto" height="100%">
                <MKPagination>
                    <MKPagination item>
                        <Icon>keyboard_arrow_left</Icon>
                    </MKPagination>
                    <MKPagination item active>
                        1
                    </MKPagination>
                    <MKPagination item>2</MKPagination>
                    <MKPagination item>3</MKPagination>
                    <MKPagination item>4</MKPagination>
                    <MKPagination item>5</MKPagination>
                    <MKPagination item>
                        <Icon>keyboard_arrow_right</Icon>
                    </MKPagination>
                </MKPagination>
            </Grid>
        </Container>
    );
};

export default Pagination;