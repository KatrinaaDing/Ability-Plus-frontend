import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';

const sampleInfo = {
    lastModified: `${new Date().toDateString()}`,
    company: "Google",
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
                    <MapsHomeWorkIcon fontSize='medium' />
                </ListItemIcon>
                <ListItemText
                    primary={null}
                    secondary={"Company: " + sampleInfo.company}
                />
            </ListItem>

        </List>
    );
};

export default MetaData;