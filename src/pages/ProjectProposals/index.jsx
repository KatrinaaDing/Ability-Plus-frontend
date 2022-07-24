import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import MKBox from "components/MKBox";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import routes from "routes";
import Box from '@mui/material/Box';
import BasicPageLayout from "glhfComponents/BasicPageLayout";
import ProposalCard from "glhfComponents/ProposalCard";
import { useEffect } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import ProposalDescriptionModal from "glhfComponents/ProposalDescriptionModal";
import ProcessStatusBadge from "glhfComponents/ProcessStatusBadge";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import MKButton from "components/MKButton";
import { Checkbox, FormControlLabel, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ProposalsTableView from "glhfComponents/ProposalsTableView";

import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import list from "assets/theme/components/list";
import { propStatus } from "glhfComponents/ProcessStatusBadge";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import SelectProposalsFilter from 'glhfComponents/SelectProposalsFilter';
const columns = [
    {
        field: 'title',
        headerName: 'Title',
        width: 300
    },
    {
        field: 'authorName',
        headerName: 'Author',
        width: 130
    },
    {
        field: 'oneSentenceDescription',
        headerName: 'Description',
        width: 250,
    },
    {
        field: 'rating',
        headerName: 'Rating',
        width: 130,
    },
    {
        field: 'status',
        headerName: 'status',
        width: 130,
    },
    {
        field: 'note',
        headerName: 'My Note',
        width: 250,
    },
];

const getRating = (id) => {
    switch (id) {
        case 49:
            return 4
            break;

        case 50:
            return 3.5
            break;

        default:
            return 3
            break;
    }
}


const getNotes = (id) => {
    switch (id) {
        case 49:
            return 'Very good. I like the idea.'
            break;

        case 50:
            return "Overall is good. The structure can be imporved"
            break;

        default:
            return "OK but conventional"
            break;
    }
}


const ProjectProposals = () => {
    // hooks
    const { reqName: projectName, reqId: projectId } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    // search bar states
    const [isPick, setIsPick] = useState(2); // -1: rejected, 0: no label, 1: approved, 2: all

    // display states
    const [propCards, setPropCards] = useState([]);
    const [total, setTotal] = useState(0);
    const [propDetail, setPropDetail] = useState(null);
    const [propDetailOpen, setPropDetailOpen] = useState(false);

    // select states
    const [selectMode, setSelectMode] = useState(false);
    const [selectedItem, setSelectedItem] = useState([]);

    const [view, setView] = useState("card");
    const [rows, setRows] = useState([])
    const [isPicked, setIsPicked] = useState(0);
    const [ascending, setAscending] = useState(true);
    const [whatOrder, setWhatOrder] = useState('LastModifiedTime')
    const [searchKey, setSearchKey] = useState('');
    const handleSearch = (key) => {
        setSearchKey(key);
    }
    const handleWhatOrder = (whatOrder) => {
        setWhatOrder(whatOrder)
    }
    const handleIsPicked = (picked) => {
        setIsPicked(picked)
    }
    const handleDate = (order) => {
        setAscending(order)
    }
    const handleViewChange = (event, nextView) => {
        setView(nextView);
    };

    useEffect(async () => {
        console.log('142')
        // FIXME: add search key
        await axiosPrivate.get('/proposal/list_project_proposals', {
            params: new URLSearchParams({
                isAscendingOrder: ascending,
                pageNo: 1,
                pageSize: 20,
                projectId: projectId,
                whatOrder: whatOrder,
                isPick: isPicked === -1? 'all': isPicked,
                searchKey: searchKey
            })
        })
            .then(res => {
                const data = res.data.data
                // FIXME let everything unviewed. this only for demo, hard code status to unviewed
                // const initialSelected = {}
                data.records.forEach((item, idx, arr) => {
                    arr[idx].status = 1
                    arr[idx].rating = getRating(item.id) // FIXME random generated rating
                    // initialSelected['select-'+arr[idx].id] = Boolean(arr[idx].status)
                })
                // setSelectedItem(initialSelected)
                setPropCards(data.records)
                setTotal(data.total)
            })
            .catch(e => console.error(e))


    }, [ascending, isPicked, searchKey, whatOrder])

    // data view hooks
    useEffect(() => {
        const dataRows = []
        propCards.forEach(p =>
            dataRows.push({
                id: p.id,
                title: p.title,
                authorName: p.authorName,
                oneSentenceDescription: p.oneSentenceDescription,
                rating: p.rating === null ? 0 : p.rating,
                status: propStatus[p.status].label,
                note: getNotes(p.id)
            })
        )
        setRows(dataRows)
    }, [propCards])

 
    const getPropDetail = async (id) => {
        await axiosPrivate('/proposal/get_proposal_detail_info', {
            params: new URLSearchParams({
                proposalId: parseInt(id)
            })
        })
            .then(res => {
                const data = res.data.data
                data.extraData = JSON.parse(data.extraData)
                console.log(propCards.find(e => e.id === id).status)
                setPropDetail({
                    ...data,
                    id,
                    status: propCards.find(e => e.id === id).status,
                    rating: getRating(id), // FIXME: random generated rating
                    note: getNotes(id),
                })
            })
            .then(res => setPropDetailOpen(true))
            .catch(e => console.error(e))
    }

    const approveProposals = () => {
        alert('All shorlisted proposals has been approved!')
        navigate('/view-request-ranks/' + projectId)
    }

    const shortlistItem = (id, toShortList) => {
        // change propcards and details
        const toShortlist = propCards.find(e => e.id === id);
        const idx = propCards.indexOf(toShortlist)
        toShortlist.status = toShortList ? 2 : 1;
        const newPropCards = [...propCards]
        newPropCards[idx] = toShortlist

        const newDetail = { ...propDetail }
        newDetail.status = toShortList ? 2 : 1
        setPropDetail(newDetail)
        setPropCards(newPropCards);
        // setIsPick(Number(!isPick))  //FIXME revert is pick status

        // change selectedItem
        // setSelectedItem({ ...selectedItem, [`select-${id}`]: toShortList })
        setSelectedItem([...selectedItem, id])

    }

    const handleSelect = (e) => {
        // setSelectedItem({ ...selectedItem, [e.target.name]: e.target.checked })
        const id = parseInt(e.target.name.split('-')[1])
        // to check
        if (e.target.checked) {
            setSelectedItem([...selectedItem, id])

            // to uncheck
        } else {
            const newSel = selectedItem.splice(selectedItem.indexOf(id), 1)
            setSelectedItem(newSel)

        }
    }

    const commitSelect = (e) => {
        const newPropCards = [...propCards]

        // Object.keys(selectedItem).forEach(key => {
        //     if (selectedItem[key]) {
        //         const id = parseInt(key.split('-')[1]);
        //         const toShortlist = propCards.find(e => e.id === id);
        //         const idx = propCards.indexOf(toShortlist)
        //         toShortlist.status = 2;
        //         newPropCards[idx] = toShortlist
        //     }
        //     else {
        //         const id = parseInt(key.split('-')[1]);
        //         const toShortlist = propCards.find(e => e.id === id);
        //         const idx = propCards.indexOf(toShortlist)
        //         toShortlist.status = 0;
        //         newPropCards[idx] = toShortlist
        //     }
        // })

        newPropCards.forEach(p => {
            // if the card is selected to commit
            if (selectedItem.indexOf(p.id) >= 0) {
                p.status = 2;
            } else {
                p.status = 0;
            }
        })


        setPropCards(newPropCards)
        setSelectMode(false);
    }

    // TODO put proposal rank if status > approving

    console.log(selectedItem)
    
    const CardView = () => (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {
                    propCards.map(p =>
                        <ProposalCard
                            key={p.id}
                            data={{
                                title: p.title,
                                description: p.oneSentenceDescription,
                                authorId: p.authorId,
                                authorName: p.authorName,
                                rating: p.rating,
                                status: p.status,   // FIXME: hardcode status
                                note: ''              // FIXME: 目前api没有返回公司的note
                            }}
                            openDetail={() => getPropDetail(p.id)}
                            secondary={
                                selectMode
                                    ? <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedItem.indexOf(p.id) >= 0}
                                                onChange={handleSelect}
                                                name={`select-${p.id}`}
                                            />
                                        }
                                        label="Shortlisted"
                                    />
                                    : undefined
                            }
                        />
                    )
                }
            </Grid>
        </Box>
    )


    return (
        <BasicPageLayout
            title={`All Proposals for project "${projectName}"`}
            secondaryContent={
                <MKButton
                    vairnat='gradient'
                    color='success'
                    onClick={approveProposals}
                >
                    Approve all shortlisted proposal
                </MKButton>
            }
        >
            <MKBox
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    py: 3
                }}
            >
                <MKTypography variant='subtitle1'>
                    There {total <= 1 ? 'is' : 'are'} {total} proposal{total > 1 ? 's' : ''}
                </MKTypography>
                {
                    !selectMode
                        ? <MKButton variant='outlined' color='info' onClick={() => setSelectMode(true)}> Select Mode</MKButton>
                        : (
                            <MKBox>
                                <MKButton variant='outlined' color='dark' onClick={() => setSelectMode(false)} sx={{ mx: 1 }}>Cancel</MKButton>
                                <MKButton variant='outlined' color='warning' onClick={() => commitSelect()}>Shorlisted</MKButton>
                            </MKBox>
                        )
                }
            </MKBox>
            <MKBox py={2}>
                <ToggleButtonGroup
                    orientation="horizontal"
                    value={view}
                    exclusive
                    onChange={handleViewChange}
                >
                    <ToggleButton value="card" aria-label="module">
                        <ViewModuleIcon />
                        Card
                    </ToggleButton>
                    <ToggleButton value="table" aria-label="list">
                        <ViewListIcon />
                        Table
                    </ToggleButton>
                </ToggleButtonGroup>
            </MKBox>
            <SelectProposalsFilter handleDate={handleDate} handleIsPicked={ handleIsPicked}  handleWhatOrder={ handleWhatOrder} handleSearch={handleSearch}></SelectProposalsFilter>
            <br />
            {
                propDetail &&
                <ProposalDescriptionModal
                    key={propDetail}
                    open={propDetailOpen}
                    setOpen={setPropDetailOpen}
                    value={{
                        id: propDetail.id,
                        title: propDetail.title,
                        status: propDetail.status,//propDetail.status, // FIXME
                        desc: propDetail.oneSentenceDescription,
                        prob: propDetail.extraData.problemStatement,
                        vStat: propDetail.extraData.visionStatement,
                        goal: propDetail.extraData.goal,
                        detail: propDetail.extraData.detail,
                        likeNum: propDetail.likeNum,
                        rating: propDetail.rating,
                        note: propDetail.note,
                        metaData: {
                            lastModified: propDetail.lastModifiedTime,
                            authorName: propDetail.creatorName ?? "No Name",
                            authorId: propDetail.creatorId,
                            topic: projectName
                        }
                    }}
                    actionButton={
                        <MKButton
                            variant="gradient"
                            color={propDetail.status === 2 ? 'success' : "warning"}
                            startIcon={
                                propDetail.status === 2
                                    ? <PlaylistAddCheckIcon />
                                    : <PlaylistAddIcon />
                            }
                            onClick={() => {
                                shortlistItem(propDetail.id, propDetail.status === 2 ? false : true)
                                // alert('The proposal has been added to shortlist.')
                            }}
                        >
                            Shortlist
                        </MKButton>
                    }
                />
            }
            {
                view === 'card'
                    ? <CardView />
                    : <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            checkboxSelection={selectMode}
                            onSelectionModelChange={(newSelectionModel) => {
                                console.log('new', newSelectionModel)
                                setSelectedItem(newSelectionModel);
                            }}
                            onRowClick={(detail) => getPropDetail(detail.id)}
                            selectionModel={selectedItem}
                            components={{
                                Toolbar: GridToolbar
                            }}
                            disableSelectionOnClick

                        />
                    </div>
            }


        </BasicPageLayout>
    );
}
export default ProjectProposals;
