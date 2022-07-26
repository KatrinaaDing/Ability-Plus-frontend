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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ProposalRank = ({proposals, openDetail}) => {

  return (
    
    
    <Stack spacing={2} sx={{ width: '100%' }}>
      {proposals.map((s,idx) =>
          <Card key={idx}>
            <CardActionArea onClick={() => openDetail(s.id)}>
              <CardContent sx={{ maxHeight: 75 }}>
                <Grid container item xs={12} justifyContent="space-between" mx="auto">
                  <MKBox width={{ xs: "100%", md: "50%", lg: "25%" }} mb={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <MKTypography variant="h4" mb={1}>
                      {idx + 1}
                    </MKTypography>
                  </MKBox>
                  <MKBox width={{ xs: "100%", md: "50%", lg: "25%" }} mb={3}>
                    <MKTypography variant="h5" mb={1} sx={{marginTop: '10px'}}>
                      {s.title}
                    </MKTypography>
                    <MKTypography variant="body2" mb={1}>
                      {s.description}
                    </MKTypography>
                  </MKBox>
                  <MKBox width={{ xs: "100%", md: "50%", lg: "25%" }} mb={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <MKTypography variant="body2" mb={1}>
                      Author: {s.authorName}
                    </MKTypography>
                  </MKBox>
                <div>
                    <FcLike size={40} />
                    <MKTypography variant="body2" mb={1} sx={{textAlign: 'center'}}>
                      {s.likeNum}
                    </MKTypography>
                  </div>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
      )}

      </Stack>
  );
}
export default ProposalRank;