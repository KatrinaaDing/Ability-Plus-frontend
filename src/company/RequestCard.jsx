import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
const RequestCard = ({ title, description, companyName, status}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Grid container item justifyContent="center" xs={10}> 
            <MKTypography gutterBottom variant="h5" component="div">
              { title }
              </MKTypography>
            </Grid>
          <MKTypography variant="body2" color="text.secondary">
            {description}
          </MKTypography>
          <Grid>
            <Grid item>
              <MKTypography variant="caption">Posted by: {companyName}</MKTypography>
            </Grid>
            <Grid item>
              <MKTypography variant="caption">Status: {status}</MKTypography>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end"> 
            <MKButton variant="gradient" color="info">View Ranking</MKButton>
          </Grid>  
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
export default RequestCard;