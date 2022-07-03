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
import routes from "routes";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";

const BasicPageLayout = ({ title, children }) => {
    return (
        <>
            <MKBox sx={{ mt: 2 }}>
                <DefaultNavbar
                    routes={routes}
                    relative
                />
            </MKBox>
            <MKBox minHeight="75vh" >
                <Container sx={{ mt: 6 }}>
                    <Grid container item xs={12} flexDirection="column" justifyContent="center" mx="auto">
                        <MKBox width={{ xs: "100%", md: "100%", lg: "100%" }} mb={3}>
                            <MKTypography variant="h3" mb={1}>
                                {title}
                            </MKTypography>
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