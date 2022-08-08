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
import MenuIcon from '@mui/icons-material/Menu';
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

// Filter bar: order by date, search by keyword
const StatusDateDueSearchFilter = ({ handleDate, handleSearch}) => {
    const [ascending, setAscending] = useState(true);
    useEffect(() => {
        handleDate(ascending);
    }, [ascending])
    return (
        <Box sx={{flexGrow: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around',border: '3px solid rgb(42,151,236)', borderRadius: '5px' }} >
            <Box>
                <p style={{ textAlign: 'center'}}>Order by Date:</p>
                <MKButton sx={{margin: '8px', height: '40px', border: '1px solid lightgray', fontWeight: 'normal'}} onClick={() => setAscending(!ascending)}>
                    Submission Date{' '}
                    { ascending && <KeyboardArrowDownIcon>
                    </KeyboardArrowDownIcon>}
                    { !ascending && <KeyboardArrowUpIcon></KeyboardArrowUpIcon>}
                </MKButton>
            </Box>
            <Box>
                <p style={{ textAlign: 'center'}}>Search:</p>
                <Search sx={{ margin: '6px', height: '50px'}}>
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
export default StatusDateDueSearchFilter;