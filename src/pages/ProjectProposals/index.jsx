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
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        "& .MuiDataGrid-row": {
            cursor: "pointer"
        }
    }
});


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
        field: 'statusLabel',
        headerName: 'status',
        width: 130,
    },
    {
        field: 'note',
        headerName: 'My Note',
        width: 250,
    },
];


const ProjectProposals = () => {
    const classes = useStyles();
    // hooks
    const { reqName: projectName, reqId: projectId } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

  
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

    // search bar states
    const [isPick, setIsPick] = useState(2); // -1: rejected, 0: no label, 1: approved, 2: all
    const [isPicked, setIsPicked] = useState(2);
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

    // check if is empty comment
    const emptyComment = (comment) => 
        comment === null || comment == ''

    // check if is empty rating
    const emptyRating = (rating) => 
        rating === null || rating === 0

    // get status of the proposal
    const getStatus = (comment, rating, isPick) =>
        isPick
            ? 2 // shorlisted
            : emptyComment(comment) && emptyRating(rating)
                ? 0 // empty comment and rating => unviewed
                : 1 // viewed

    useEffect( () => {
        const listProjectProposals = async () =>
            await axiosPrivate.get('/proposal/list_project_proposals', {
                params: new URLSearchParams({
                    isAscendingOrder: ascending,
                    pageNo: 1,
                    pageSize: 20,
                    projectId: projectId,
                    whatOrder: whatOrder,
                    isPick: isPicked,
                    searchKey: searchKey
                })
            })
                .then(res => {
                    const data = res.data.data
                    const initialSelected = []
                    data.records.forEach((item, idx, arr) => {
                        arr[idx].status = getStatus(item.comment, item.rating, item.isPick)
                        arr[idx].rating = item.rating === null ? 0 : item.rating
                        arr[idx].comment = item.comment === null ? '' : item.comment
                        if (item.isPick)
                            initialSelected.push(item.id)
                    })
                    setSelectedItem(initialSelected)
                    setPropCards(data.records)
                    setTotal(data.total)
                })
                .catch(e => console.error(e))
        
        listProjectProposals()
    }, [ascending, isPicked, searchKey, whatOrder])

    // data table view hooks
    useEffect(() => {
        const dataRows = []
        propCards.forEach(p =>
            dataRows.push({
                id: p.id,
                title: p.title,
                authorName: p.authorName,
                oneSentenceDescription: p.oneSentenceDescription,
                rating: p.rating,
                statusLabel: propStatus[p.status].label,
                status: p.status,
                note: p.comment,
                isPick: p.isPick,
            })
        )
        setRows(dataRows)
    }, [propCards])

 
    const getPropDetail =  (id) => {
        axiosPrivate('/proposal/get_proposal_detail_info', {
            params: new URLSearchParams({
                proposalId: parseInt(id)
            })
        })
            .then(res => {
                const data = res.data.data
                const item = propCards.filter(e => e.id === id)[0]
                console.log(item)
                console.log(data)
                data.extraData = JSON.parse(data.extraData)
                setPropDetail({
                    ...data,
                    id,
                    status: item.status,
                    rating: item.rating,
                    comment: item.comment,
                    isPick: item.isPick
                })
            })
            .then(res => setPropDetailOpen(true))
            .catch(e => console.error(e))
    }

    const approveProposals = () => {
        alert('All shorlisted proposals has been approved!')
        navigate('/view-request-ranks/' + projectId)
    }

    // update status badge on proposal detail modall
    const updateDetailBadge = (status) => {
        const newDetail = { ...propDetail }
        newDetail.status = status
        if (status === 2) 
            newDetail.isPick = 1
        else
            newDetail.isPick = 0
        setPropDetail(newDetail)
    }

    // update card display info
    const updateItem = (id, key, value) => {
        const toUpdate = propCards.find(e => e.id === id);
        const idx = propCards.indexOf(toUpdate)
        toUpdate[key] = value
        toUpdate.status = getStatus(toUpdate.comment, toUpdate.rating, toUpdate.isPick)
        const newCards = [...propCards]
        newCards[idx] = toUpdate
        setPropCards(newCards);

        return toUpdate.status
    }

    // update rating on a card item
    const rateItem = (id, rating) => {
        const newStatus = updateItem(id, 'rating', rating * 2)
        updateDetailBadge(newStatus)
    }
    
    // update comments on a card item
    const commentItem = (id, comment) => {
        const newStatus = updateItem(id, 'comment', comment)
        updateDetailBadge(newStatus)
    }

    // shortlist an item
    const shortlistItem = (id, toShortlist) => {
        axiosPrivate.post(`/proposal/company_process_proposal?proposalId=${id}&isPick=${toShortlist}`)
            .then(res => {
                const newStatus = updateItem(id, 'isPick', toShortlist)
                updateDetailBadge(newStatus)
                const newSelect = [...selectedItem]
                if (toShortlist)
                    newSelect.push(id)
                else
                    newSelect.splice(selectedItem.indexOf(id), 1)

                setSelectedItem(newSelect)
            })
            .catch(e => console.error(e))
        
    }

    const handleSelect = (e) => {
        const id = parseInt(e.target.name.split('-')[1])
        // to check
        if (e.target.checked) {
            setSelectedItem([...selectedItem, id])

        // to uncheck
        } else {
            const newSel = [...selectedItem]
            newSel.splice(selectedItem.indexOf(id), 1)
            setSelectedItem(newSel)
        }
    }

    const shortlistMultiItem = (list, newIsPick) => {
        console.log(newIsPick, list)
        const body = {
            ids: list,
            isPick: newIsPick,
            projectId: projectId
        }
        // shortlist items
        axiosPrivate.post('/proposal/batch_process_proposals', body)
            .then(res => {
                list.forEach(i => updateItem(i, 'isPick', newIsPick))
            })
            .catch(e => console.error(e))
    }

    const commitSelect = (e) => {
        // get unpicked items
        const unPickItem = propCards.map(e => e.id).filter(e => !selectedItem.includes(e));
        console.log('yes',selectedItem,'no',unPickItem)
        shortlistMultiItem(selectedItem, 1);
        shortlistMultiItem(unPickItem, 0);
        setSelectMode(false);
    }


    const CardView = () => (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {
                    propCards.map(p =>
                        <ProposalCard
                            key={p.id}
                            data={{
                                id: p.id,
                                title: p.title,
                                description: p.oneSentenceDescription,
                                authorId: p.authorId,
                                authorName: p.authorName,
                                rating: p.rating,
                                status: p.status,   
                                comment: p.comment            
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
                    rateItem={rateItem}
                    commentItem={commentItem}
                    value={{
                        id: propDetail.id,
                        title: propDetail.title,
                        status: propDetail.status,
                        desc: propDetail.oneSentenceDescription,
                        prob: propDetail.extraData.problemStatement,
                        vStat: propDetail.extraData.visionStatement,
                        goal: propDetail.extraData.goal,
                        detail: propDetail.extraData.detail,
                        likeNum: propDetail.likeNum,
                        rating: propDetail.rating,
                        comment: propDetail.comment,
                        metaData: {
                            lastModified: propDetail.lastModifiedTime,
                            authorName: propDetail.creatorName ?? "No Name",
                            authorId: propDetail.creatorId,
                            projectName: propDetail.projectName,
                            topic: projectName
                        }
                    }}
                    actionButton={
                        <MKButton
                            variant="gradient"
                            color={propDetail.isPick ? 'success' : "warning"}
                            startIcon={
                                propDetail.isPick
                                    ? <PlaylistAddCheckIcon />
                                    : <PlaylistAddIcon />
                            }
                            onClick={() => {
                                shortlistItem(propDetail.id, Number(!!!propDetail.isPick))
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
                    : <div style={{ height: '60vh', width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            checkboxSelection={selectMode}
                            onSelectionModelChange={(newSelectionModel) => {
                                setSelectedItem(newSelectionModel);
                            }}
                            onRowClick={(detail) => getPropDetail(detail.id)}
                            selectionModel={selectedItem}
                            components={{
                                Toolbar: GridToolbar
                            }}
                            disableSelectionOnClick
                            className={classes.root}
                        />
                    </div>
            }


        </BasicPageLayout>
    );
}
export default ProjectProposals;
