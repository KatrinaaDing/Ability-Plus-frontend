/**
 * Author: Ziqi Ding
 * Created At: 14 Jul 2022
 * Discription: A button that allow company to create project
 */
import React from 'react';
import MKButton from 'components/MKButton';
import { useNavigate} from 'react-router-dom'
const CreateProjectBtn = () => {
    const navigate = useNavigate();
    const handleCreate = () => {
        navigate('/create-request')
    }

    return (
        <MKButton 
            variant="gradient" 
            color="info" 
            size="large" 
            onClick={handleCreate}
        >
            Create Project
        </MKButton>
    );
};

export default CreateProjectBtn;