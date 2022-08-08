import { useState, useEffect } from 'react';
import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import MKButton from "components/MKButton";
import Select from '@mui/material/Select';
import { getLabel } from 'utils/getStatus';
import { formatLabel } from 'utils/getStatus';
import { Grid } from '@mui/material';
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



const FilterBar = ({ handleDate, handleStatus, handleSearch }) => {
  const notPrivatepage = window.location.pathname.slice(1).indexOf('browse') >= 0
  const [status, setStatus] = useState(-1);
  const [ascending, setAcending] = useState(false);
  const handleChange = (e) => {
    const currStatus = e.target.value;
    setStatus(currStatus)
    if (currStatus === -1) {
      handleStatus('all');
      return;
    }
    
    handleStatus(getLabel('request', currStatus));
  };

  useEffect(() => {
    setStatus(-1)

    handleDate(ascending)
  }, [ascending])

  const getStatusOptions =
    notPrivatepage
      ? [...Array(5).keys()].slice(1)
      : [...Array(5).keys()]

  return (
    <Grid container spacing={2} sx={{ mt: 0.5, mb: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
      <FilterItem title="Status">
        <FormControl sx={{ width: '100%' }}>
          <Select
            id="Request Status"
            value={status}
            onChange={handleChange}
            sx={{ backgroundColor: 'white', height: '40px' }}
            style={{backgroundColor:'white'}}
            >
              <MenuItem value={-1}>All</MenuItem>
              {
                getStatusOptions.map(i => 
                  <MenuItem key={i} value={i}>{formatLabel(getLabel('request', i))}</MenuItem>)
              }     
          </Select>
        </FormControl>
      </FilterItem>
      <FilterItem title="Sort By">
        <MKButton 
          fullWidth
          style={{ justifyContent: "flex-start" }}
          onClick={() => setAcending(!ascending)}sx={{height: '40px', border: '1px solid lightgray', fontWeight: 'normal', width: '100%'}}
        >
          Create Time{' '}
          { ascending && <KeyboardArrowDownIcon>
          </KeyboardArrowDownIcon>}
          { !ascending && <KeyboardArrowUpIcon></KeyboardArrowUpIcon>}
        </MKButton>
      </FilterItem>
      <FilterItem title="Search">
        <Search sx={{  height: '50px' }}>
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
export default FilterBar;