/**
 * Author: Ziqi Ding
 * Created At: 05 Jul 2022
 * Discription: Section for company to rate a proposal
 */
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import MKTypography from 'components/MKTypography';
import SavingLoader from 'glhfComponents/SavingLoader';

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


const CompanyRating = ({rating}) => {
    const [value, setValue] = React.useState(rating);
    const [hover, setHover] = React.useState(-1);
    const [loading, setLoading] = React.useState(-1); // -1: empty, 0: saving, 1: success， 2: fail


    useEffect(() => {
        setValue(rating)
    }, [rating])

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    const handleSave = (newValue) => {
        setLoading(0)
        setTimeout(() => {
            setLoading(1)
        }, 800);
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
                    defaultValue={value}
                    max={5}
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