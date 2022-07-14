import React from 'react';

const CreateProjectBtn = () => {
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