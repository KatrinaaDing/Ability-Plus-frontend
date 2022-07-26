import { useState, useEffect } from 'react';
import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import MKButton from "components/MKButton";
import Select from '@mui/material/Select';
import {getLabel} from "../../utils/getStatus";
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    backgroundColor: 'white',
    borderRadius: '5px',
    fontSize: '13px',
    height: '40px',
    border: '1px solid lightgray',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


const SelectProposalsFilter = ({ handleDate, handleIsPicked, handleWhatOrder, handleSearch}) => {
    const [whatOrder, setWhatOrder] = useState('SolutionDue')
    const [status, setStatus] = useState(-1);
    const [ascending, setAscending] = useState(true);
    useEffect(() => {
        handleDate(ascending);
        handleWhatOrder(whatOrder);
    }, [whatOrder, ascending])
    const handleChange = (e) => {
        const currStatus = e.target.value;
        setStatus(currStatus)
        handleIsPicked(currStatus)
    };
    return (
        <Box sx={{flexGrow: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around',border: '3px solid rgb(42,151,236)', borderRadius: '5px' }} >
            <Box sx={{ minWidth: 120 }}>
                <p style={{ textAlign: 'center'}}>Status:</p>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                        <Select
                            id="Proposal Status"
                            value={status}
                            onChange={handleChange}
                            sx={{ backgroundColor: 'white', height: '40px' }}
                            style={{backgroundColor:'white'}}
                    >   
                            <MenuItem value={-1}>All</MenuItem>
                            <MenuItem value={0}>Unpicked</MenuItem>
                            <MenuItem value={1}>Picked</MenuItem>
                        </Select>
                </FormControl>
            </Box>
            <Box>
                <p style={{ textAlign: 'center'}}>Order by Date:</p>
                <MKButton  sx={{margin: '8px', height: '40px', border: '1px solid lightgray', fontWeight: 'normal'}}  onClick={() => setAscending(!ascending)}>
                    Submission Date{' '}
                    { ascending && <KeyboardArrowDownIcon>
                    </KeyboardArrowDownIcon>}
                    { !ascending && <KeyboardArrowUpIcon></KeyboardArrowUpIcon>}
                </MKButton>
            </Box>
            <Box sx={{minWidth: 120}}>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <p style={{ textAlign: 'center'}}>Order By:</p>
                    <Select
                        id="Proposal Due"
                        value={whatOrder}
                        onChange={(e) => setWhatOrder((e.target.value))}
                        sx={{ backgroundColor: 'white', height: '40px' }}
                        style={{backgroundColor:'white'}}
                    >
                        <MenuItem value={'SolutionDue'}>Solution Deadline</MenuItem>
                        <MenuItem value={'ProposalDue'}>Proposal Deadline</MenuItem>
                        <MenuItem value={'LastModifiedTime'}>Last Modified Time</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box>
                <p style={{ textAlign: 'center'}}>Search:</p>
                <Search sx={{ margin: '6px', height: '50px' }}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </Search>
            </Box>
        </Box>
    );
}
export default SelectProposalsFilter;