import { Icon, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import TopicIcon from '@mui/icons-material/Topic';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MKTypography from 'components/MKTypography';

const CardListItem = ({title, value, link, color}) => {
    const icons = {
        'Category': <TopicIcon />,
        'Project': <AssignmentIcon />,
        'Posted by': <PersonIcon />
    }

    return (
        <ListItem dense alignItems='flex-start'>
            {/* <ListItemIcon sx={{minWidth: '30px'}}>
                {icons[title]}
            </ListItemIcon> */}
            <ListItemText
            
                primary={<MKTypography
                    variant="body2"
                    color={color === "transparent" || color === "light" ? "text" : "white"}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        ml: 0.375,

                        "& .material-icons-round": {
                            ml: -0.375,
                        },
                    }}
                >
                    {title}: &nbsp;
                    {
                        link
                            ? <Link to={link} target="_blank">
                                {value}
                            </Link>
                            : value
                    }
                </MKTypography>}
                
            />
        </ListItem>
    );
};

export default CardListItem;