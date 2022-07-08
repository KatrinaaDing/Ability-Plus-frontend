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

const sampleInfo = {
    lastModified: `${new Date().toDateString()}`,
    author: "Jane Wone",
    requestTitle: 'Proposal Management'
}

const MetaData = () => {

    const listItemSx = { p: 0.5 }

    return (
        <List>
            <ListItem sx={listItemSx}>
                <ListItemIcon>
                    <AccessTimeIcon fontSize='medium' />
                </ListItemIcon>
                <ListItemText
                    primary={null}
                    secondary={"Last Modified At: " + sampleInfo.lastModified}
                />
            </ListItem>
            <ListItem sx={listItemSx}>
                <ListItemIcon>
                    <PersonIcon fontSize='medium' />
                </ListItemIcon>
                <ListItemText
                    primary={null}
                    secondary={"Author: " + sampleInfo.author}
                />
            </ListItem>
            <ListItem sx={listItemSx}>
                <ListItemIcon>
                    <DescriptionIcon fontSize='medium' />
                </ListItemIcon>
                <ListItemText
                    primary={null}
                    secondary={"Project Topic: " + sampleInfo.requestTitle}
                />
            </ListItem>
           
        </List>
    );
};

export default MetaData;