/**
 * Author: Ziqi Ding
 * Created At: 05 Jul 2022
 * Discription: Section for company to rate a proposal
 */
import React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import MKTypography from 'components/MKTypography';
import SavingLoader from 'glhfComponents/SavingLoader';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};


const CompanyRating = ({rating, id, updateCard}) => {
    // hooks
    const axiosPrivate = useAxiosPrivate();

    // states
    const [value, setValue] = React.useState(rating);
    const [hover, setHover] = React.useState(-1);
    // loading status -1: empty, 0: saving, 1: success， 2: fail
    const [loading, setLoading] = React.useState(-1); 

    // helper functions
    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    // handlers
    const handleSave = (newValue) => {
        setLoading(0)
        axiosPrivate.post(`/proposal/company_process_proposal?proposalId=${id}&rating=${newValue*2}`)
            .then(res => {
                setLoading(1)
                updateCard(id, newValue)
            })
            .catch(e => {
                setLoading(2)
                console.error(e)
            })
    }

    return (
        <>
            <Box display='flex'>
                <MKTypography variant='subtitle2'>Click again to cancel.</MKTypography>
                <SavingLoader
                    spinnerColor='silver' 
                    spinnerSize={20} 
                    timeout={200} 
                    hidden={loading === -1}
                    loading={loading === 0} 
                    success={loading === 1}
                    fail={loading === 2}
                />
            </Box>
            <Box
                sx={{
                    '& > legend': { mt: 2 },
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <Rating
                    name="rating"
                    max={5}
                    value={value}
                    getLabelText={getLabelText}
                    precision={0.5}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    size="large"
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        handleSave(newValue)
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                />
                {value !== null && (
                    <MKTypography variant='body1'  sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</MKTypography>
                )}
            </Box>
        </>

    );
};

export default CompanyRating;