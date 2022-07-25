import { Icon, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import TopicIcon from '@mui/icons-material/Topic';
import FolderIcon from '@mui/icons-material/Folder';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MKTypography from 'components/MKTypography';
import CommentIcon from '@mui/icons-material/Comment';

const CardListItem = ({title, value, link, color}) => {
    const icons = {
        'Category': <FolderIcon />,
        'Project': <AssignmentIcon />,
        'Posted by': <PersonIcon />,
        'My Comment': <CommentIcon />
    }

    return (
        <ListItem>
            <ListItemIcon sx={{minWidth: '30px'}}>
                {icons[title]}
            </ListItemIcon>
            <ListItemText
                primary={
                    <MKTypography
                        variant="body2"
                        color={!color || color === "transparent" || color === "light" ? "text" : "white"}
                    >
                        {/* <b>{title}</b> &nbsp;&nbsp; */}
                        {
                            link
                                ? <Link to={link} target="_blank">
                                    {value}
                                </Link>
                                : value
                        }
                    </MKTypography>
                }
                
            />
        </ListItem>
    );
};

export default CardListItem;