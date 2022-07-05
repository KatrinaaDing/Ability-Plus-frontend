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
import DoneIcon from '@mui/icons-material/Done';
import { ClipLoader, } from 'react-spinners';
import { CSSTransition } from 'react-transition-group';

const labels = {
    1: 'Useless',
    2: 'Poor',
    3: 'Acceptable',
    4: 'Satisfied',
    5: 'Not Bad',
    6: 'Ok',
    7: 'Good',
    8: 'Pretty Good',
    9: 'Excellent',
    10: 'Incredible',
};


const CompanyRating = () => {
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const [loading, setLoading] = React.useState(-1); // -1: empty, 0: saving, 1: success

    const loaderCss = {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: '10px',
        transition: 'opacity 100ms ease-in-out'
    };

    const successSx = {
        opacity: loading < 1 ? 0 : 1,
        visibility: loading < 1 ? 'hidden' : 'visible',
        mt: 'auto',
        mb: 'auto',
        ml: '10px',
        transition: 'opacity 300ms ease-in-out'
    }


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
                    <ClipLoader loading={loading === 0} color='gray' size={20} cssOverride={loaderCss} />
                    <CSSTransition
                        in={loading === 1}
                        timeout={200}
                    >
                        <DoneIcon color='success' sx={successSx} />
                    </CSSTransition>

            </Box>
            <Box
                sx={{
                    '& > legend': { mt: 2 },
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <Rating
                    name="customized-10"
                    defaultValue={0}
                    max={10}
                    getLabelText={getLabelText}
                    precision={1}
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