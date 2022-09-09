import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKAvatar from "components/MKAvatar";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import Post from "../components/Post";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Divider, Modal, Slide } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import useAxiosPrivate from "hooks/useAxiosPrivate";


const NewReply = ({count}) => {
    const [open, setOpen] = useState(false)
    const axiosPrivate = useAxiosPrivate();

    const handleClose = () => {
        setOpen(false)
        location.reload()
    }
    const handleOpen = () => setOpen(true)

    const handleSeeAll = () => 
        axiosPrivate.post('/forum/post/see_all')
            .then(res => location.reload())
            .catch(e => console.error(e))

    return (
        <>
            <MKButton color='primary' variant='gradient' onClick={handleOpen}>
                You Have New Reply!
            </MKButton>
            <Modal open={open} onClose={handleClose} sx={{ display: 'grid', placeItems: 'center' }}>
                <Slide direction="down" in={open} timeout={500}>
                    <MKBox
                        position="relative"
                        width="60%"
                        display="flex"
                        flexDirection="column"
                        borderRadius="xl"
                        bgColor="white"
                        shadow="xl"
                    >
                        <MKBox display="flex" alginItems="center" justifyContent="space-between" p={3}>
                            <MKTypography variant="h5">Your following posts have new reply</MKTypography>
                            <CloseIcon fontSize="medium" sx={{ cursor: 'pointer' }} onClick={handleClose} />
                        </MKBox>
                        <Divider sx={{ my: 0 }} />
                        <MKBox component="section" >
                            <Container>
                                {
                                    count.map(p =>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FiberManualRecordIcon color='error' />
                                            <Post
                                                key={p.postId}
                                                postId={p.postId}
                                                authId={p.authId}
                                                authName={p.authName}
                                                data={p.data}
                                                isPin={p.isPin}
                                                lastModifiedTime={p.lastModifiedTime}
                                                newStatus={true}
                                                projectName={p.projectName}
                                                numReply={p.replyNum}
                                            />
                                        </div>
                                    )
                                }

                            </Container>
                        </MKBox>
                        <Divider sx={{ my: 0 }} />
                        <MKBox display="flex" justifyContent="space-between" p={1.5}>
                            <MKButton variant="gradient" color="light" onClick={handleClose}>
                                Close
                            </MKButton>
                            <MKButton variant="gradient" color="info" size="small" onClick={handleSeeAll}>
                                Mark all as read
                            </MKButton>
                        </MKBox>
                    </MKBox>
                </Slide>
            </Modal>

            {

            }
        </>
    );
};

export default NewReply;