/**
 * Author: Ziqi Ding
 * Created At: 25 Jul 2022
 * Discription: A request detail pop modal
 */
import MKButton from 'components/MKButton';
import RequestDescriptionModal from 'glhfComponents/RequestDescriptionModal';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import React from 'react';

const ProjectDetailBtn = ({ projectId, open, setOpen, setReqName, setReqCreator }) => {
    const axiosPrivate = useAxiosPrivate();
    const [reqDetail, setReqDetail] = React.useState();

    // get the project detail info on load
    React.useEffect(() => {
        const getProjectInfo = async () =>
            await axiosPrivate.get('/project/get_project_info', {
                params: new URLSearchParams({
                    id: parseInt(projectId)
                })
            })
                .then(res => {
                    setReqDetail({
                        ...res.data.data,
                        id: projectId,
                    })
                    setReqName(res.data.data.name)
                    if (setReqCreator !== undefined)
                        setReqCreator(res.data.data.creatorName)

                })
                .catch(e => console.error(e))

        getProjectInfo();
    }, [])


    return (
        <>
            <MKButton
                variant='outlined'
                color='info'
                onClick={() => setOpen(true)}
            >
                View Challenge Detail
            </MKButton>
            {
                reqDetail !== undefined &&
                    <RequestDescriptionModal
                        open={open}
                        setOpen={setOpen}
                        value={{
                            id: reqDetail.id,
                            title: reqDetail.name,
                            status: reqDetail.status,
                            category: reqDetail.projectArea,
                            propDdl: reqDetail.proposalDdl * 1000,
                            soluDdl: reqDetail.solutionDdl * 1000,
                            description: reqDetail.description,
                            requirement: JSON.parse(reqDetail.extraData).requirement,
                            rewards: JSON.parse(reqDetail.extraData).rewards,
                            metaData: {
                                lastModified: reqDetail.lastModifiedTime * 1000,
                                authorName: reqDetail.creatorName,
                                authorId: reqDetail.creatorId,
                                contactEmail: reqDetail.contactEmail,
                            }
                        }}
                        actionButton={<></>}
                    />
            }
        </>
    );
};

export default ProjectDetailBtn;