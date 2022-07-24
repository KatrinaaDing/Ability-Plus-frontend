/**
 * Author: Ziqi Ding
 * Created At: 14 Jul 2022
 * Discription: A button that allow company to 
 * te project
 */
import MKButton from 'components/MKButton';
import React from 'react';
import { useNavigate} from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';

const CreateProjectBtn = () => {
    const navigate = useNavigate();
    const handleCreate = () => {
        window.open('/create-request')
    }

    return (
        <MKButton
            variant="gradient" 
            color="info" 
            size="large" 
            startIcon={<AddIcon />}
            onClick={handleCreate}
        >
            Create Project
        </MKButton>
    );
};

export default CreateProjectBtn;