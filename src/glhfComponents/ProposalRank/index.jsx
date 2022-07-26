import { useState } from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { FcLike } from 'react-icons/fc';
import RankBadge from "./components/RankBadge";
import LikeIcon from "glhfComponents/ProposalCard/components/LikeIcon";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@emotion/react';


const ProposalRank = ({ proposals, openDetail }) => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="stretch"
    // sx={{ width: '70vw', ml: '10%', mr: '10%' }} 
    >
      {proposals.map((s, idx) =>
        <Card key={idx}>
          <CardActionArea onClick={() => openDetail(s.id)}>
            <CardContent sx={{ py: 2 }}>
              <Grid container direction='row'>
                <Grid item xs={12} md={0.1}>
                  <RankBadge rank={idx + 1} position={smallScreen ? 'top' : 'left'}/>
                </Grid>
                <Grid item xs={12} md={10.5} lg={10.5} xl={10.5}>
                  <Grid container direction='column'>
                    <Grid item>
                      <MKTypography variant="h4" sx={{ mb: 1 }}>
                        {s.title}
                      </MKTypography>
                    </Grid>
                    <Grid item>
                      <MKTypography variant="subtitle1">
                        {s.oneSentenceDescription}
                      </MKTypography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={1.4} lg={1.4} xl={1.4} display='flex' justifyContent='end'>
                  <MKBox sx={{ height: '100%',display: 'flex', flexDirection: 'column', justifyContent: 'end', alignItems: 'end', flexWrap: 'wrap' }}>
                      <MKTypography variant="body1">
                        Author: {s.authorName}
                      </MKTypography>
                      <MKBox sx={{width: 'min-content'}}>
                        <LikeIcon number={s.likeNum} direction='row' />
                      </MKBox>

                  </MKBox>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      )}

    </Stack>
  );
}
export default ProposalRank;