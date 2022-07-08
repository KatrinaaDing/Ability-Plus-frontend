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

const ProposalRank = ({ proposals }) => {
  const [allranks, setAllRanks] = useState([]);
  console.log(proposals)
  return (
    <Stack spacing={2} sx={{ width: '70vw', ml: '10%', mr: '10%' }}>
      {proposals.map(s => 
        <Item>
        <Card>
          <CardActionArea>
            <CardContent sx={{ maxHeight: 75 }}>
              <Grid container item xs={12} justifyContent="space-between" mx="auto">
                <MKBox width={{ xs: "100%", md: "50%", lg: "25%" }} mb={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <MKTypography variant="h4" mb={1}>
                    {s.rank}
                  </MKTypography>
                </MKBox>
                <MKBox width={{ xs: "100%", md: "50%", lg: "25%" }} mb={3}>
                  <MKTypography variant="h5" mb={1}>
                    {s.title}
                  </MKTypography>
                  <MKTypography variant="body2" mb={1}>
                    {s.description}
                  </MKTypography>
                </MKBox>
                <MKBox width={{ xs: "100%", md: "50%", lg: "25%" }} mb={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <MKTypography variant="body2" mb={1}>
                    Author: {s.author}
                  </MKTypography>
                </MKBox>
                <div>
                  <FcLike size={40} />
                  <MKTypography variant="body2" mb={1}>
                    {s.like}
                  </MKTypography>
                </div>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Item>
      )}
      
    </Stack>
  );
}
export default ProposalRank;