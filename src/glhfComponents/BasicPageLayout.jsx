/**
 * Author: Ziqi Ding
 * Created At: 02 Jul 2022
 * Description: A basic page layout
 */
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import getNavbarRoutes from 'utils/getNavbarRoutes'

const BasicPageLayout = ({ title, secondaryContent, children }) => {
    return (
        <>
            <MKBox sx={{ mt: 2 }}>
                <DefaultNavbar
                    routes={getNavbarRoutes()}
                    relative
                />
            </MKBox>
            <MKBox minHeight="75vh" >
                <Container sx={{ mt: 6 }}>
                    <Grid container item xs={12} flexDirection="column" justifyContent="center" mx="auto">
                        <MKBox width={{ xs: "100%", md: "100%", lg: "100%" }} mb={3} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <MKTypography variant="h3" mb={1}>
                                {title}
                            </MKTypography>
                            {secondaryContent}
                        </MKBox>
                        { children }
                    </Grid>
                </Container>

            </MKBox>
            <MKBox pt={6} px={1} mt={6}>
                <DefaultFooter content={footerRoutes} />
            </MKBox>
        </>
    )
}

export default BasicPageLayout;