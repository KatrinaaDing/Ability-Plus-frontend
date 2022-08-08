/**
 * Author: Ziqi Ding
 * Created At: 24 Jul 2022
 * Discription: A icon-label list item to be listed on proposal card
 */
import { Icon, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import FolderIcon from '@mui/icons-material/Folder';
import MKTypography from 'components/MKTypography';
import CommentIcon from '@mui/icons-material/Comment';
import DescriptionIcon from '@mui/icons-material/Description';


const CardListItem = ({title, value, link, color}) => {
    const icons = {
        'Category': <FolderIcon />,
        'Challenge': <DescriptionIcon />,
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