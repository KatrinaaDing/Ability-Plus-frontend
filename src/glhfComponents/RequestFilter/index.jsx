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



const FilterBar = ({ handleDate, handleStatus, handleSearch }) => {
  const notPrivatepage = window.location.pathname.slice(1).startsWith('browse')

  const [status, setStatus] = useState(-1);
  const [ascending, setAcending] = useState(true);
  const handleChange = (e) => {
    const currStatus = e.target.value;
    setStatus(currStatus)
    handleStatus(getLabel('request', currStatus) || '');

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
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }} >
      <Box sx={{minWidth: 120}}>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="select">Sort By Status</InputLabel>
          <Select
            labelId="Status"
            id="Request Status"
            value={status}
            label="Status"
            onChange={handleChange}
             style={{height: '40px'}}
            >
              <MenuItem value={-1}>all</MenuItem>
              {
                
                getStatusOptions.map(i => 
                  <MenuItem key={i} value={i}>{formatLabel(getLabel('request', i))}</MenuItem>)
              }     
          </Select>
        </FormControl>
      </Box>
      <Box>
        <MKButton onClick={() => setAcending(!ascending)}>
          Solution Deadline{' '}
          { ascending && <KeyboardArrowDownIcon>
          </KeyboardArrowDownIcon>}
          { !ascending && <KeyboardArrowUpIcon></KeyboardArrowUpIcon>}
        </MKButton>
      </Box>
      <Box>
        <Search>
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
export default FilterBar;