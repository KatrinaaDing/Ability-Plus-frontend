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


const StatusProposalSolutionFilter = ({ handleStatus, handleProposalDeadline, handleSolutionDeadline }) => {
	const [isAscendingProposalDeadline, setIsAcendingProposalDeadline] = useState(true);
	const [isAscendingSolutionDeadline, setIsAcendingSolutionDeadline] = useState(true);
  const [status, setStatus] = useState(0);
  useEffect(() => {
  }, [isAscendingProposalDeadline, isAscendingSolutionDeadline, status])
  const handleChange = (e) => {
    const currStatus = e.target.value;
    setStatus(currStatus)
    handleStatus(getLabel('request', currStatus));
  };
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
            <MenuItem value={'0'}>Draft</MenuItem>
            <MenuItem value={'1'}>Open for proposal</MenuItem>
            <MenuItem value={'2'}>Approving</MenuItem>
            <MenuItem value={'3'}>Open for Solution</MenuItem>
            <MenuItem value={'4'}>Closed</MenuItem>           
          </Select>
        </FormControl>
      </Box>
      <Box>
        <MKButton onClick={() => setIsAcendingProposalDeadline(!isAscendingProposalDeadline)}>
          Proposal Deadline{' '}
          {isAscendingProposalDeadline && <KeyboardArrowDownIcon>
          </KeyboardArrowDownIcon>}
          { !isAscendingProposalDeadline && <KeyboardArrowUpIcon></KeyboardArrowUpIcon>}
        </MKButton>
      </Box>
      <Box>
        <MKButton onClick={() => setIsAcendingSolutionDeadline(!isAscendingSolutionDeadline)}>
          Solution Deadline{' '}
          {isAscendingSolutionDeadline && <KeyboardArrowDownIcon>
          </KeyboardArrowDownIcon>}
          { !isAscendingSolutionDeadline && <KeyboardArrowUpIcon></KeyboardArrowUpIcon>}
        </MKButton>
      </Box>
      
    </Box>
  );
}
export default StatusProposalSolutionFilter;