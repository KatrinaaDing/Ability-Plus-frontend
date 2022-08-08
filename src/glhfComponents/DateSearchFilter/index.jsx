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
import MKTypography from 'components/MKTypography';
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: '-webkit-fill-available',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    zIndex: 999,
    height: '40px',
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
    width: '-webkit-fill-available',
    height: '40px',
    border: '1px solid lightgray',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '-webkit-fill-available',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '-webkit-fill-available',
            },
        },
    },
}));

const FilterItem = ({ title, children }) =>
    <Grid item width='100%' sx={12} md={4}>
        <MKTypography variant="subtitle2" sx={{ ml: 0.5 }}>{title}</MKTypography>
        {children}
    </Grid>


const StatusDateDueSearchFilter = ({ handleDate, handleSearch}) => {
    const [ascending, setAscending] = useState(true);
    useEffect(() => {
        handleDate(ascending);
    }, [ascending])
    return (
        <Grid container spacing={2} sx={{ mb: 6, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
            <FilterItem title="Order by">
                <MKButton sx={{ height: '40px', border: '1px solid lightgray', fontWeight: 'normal', width: '100%'}} onClick={() => setAscending(!ascending)}>
                    Submission Date{' '}
                    { ascending && <KeyboardArrowDownIcon>
                    </KeyboardArrowDownIcon>}
                    { !ascending && <KeyboardArrowUpIcon></KeyboardArrowUpIcon>}
                </MKButton>
            </FilterItem>
            <FilterItem title="Search">
                <Search sx={{ height: '50px'}}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </Search>
            </FilterItem>
        </Grid>
    );
}
export default StatusDateDueSearchFilter;