/**
 * Author: Ziqi Ding
 * Created At: 03 Jul 2022
 * Discription: A component to display meta data of proposal detail
 */
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import useAuth from 'auth/useAuth';



const MetaData = ({ data }) => {
    const { auth } = useAuth();

    const listItemSx = { p: 0.5 }

    return (
        <List>
            <ListItem sx={listItemSx}>
                <ListItemIcon>
                    <AccessTimeIcon fontSize='medium' />
                </ListItemIcon>
                <ListItemText
                    primary={null}
                    secondary={"Last Modified At: " + data.lastModified}
                />
            </ListItem>
            <ListItem sx={listItemSx}>
                <ListItemIcon>
                    <PersonIcon fontSize='medium' />
                </ListItemIcon>
                <ListItemText
                    primary={null}
                    secondary={"Author: " + auth.username}
                />
            </ListItem>
            <ListItem sx={listItemSx}>
                <ListItemIcon>
                    <DescriptionIcon fontSize='medium' />
                </ListItemIcon>
                <ListItemText
                    primary={null}
                    secondary={"Project Topic: " + data.requestTitle}
                />
            </ListItem>
           
        </List>
    );
};

export default MetaData;