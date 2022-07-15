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


const LikeDateSearchFilter = ({ handleLike, handleDate, handleSearch }) => {
  const [ascending, setAscending] = useState(true);
  const [isAscendingOrderLike, setIsAscendingOrderLike] = useState('');
  useEffect(() => {
    handleDate(ascending)
    handleLike(isAscendingOrderLike)
  }, [ascending, isAscendingOrderLike])

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }} >
      <Box sx={{minWidth: 120}}>
        <MKButton onClick={() => setIsAscendingOrderLike(!isAscendingOrderLike)}>
          Sort By Like{' '}
          { isAscendingOrderLike && <KeyboardArrowDownIcon>
          </KeyboardArrowDownIcon>}
          { !isAscendingOrderLike && <KeyboardArrowUpIcon></KeyboardArrowUpIcon>}
        </MKButton>
      </Box>
      <Box>
        <MKButton onClick={() => setAscending(!ascending)}>
          Date{' '}
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
export default LikeDateSearchFilter;