/**
 * Author: Ziqi Ding
 * Created At: 03 Jul 2022
 * Discription: A component to display meta data of project request detail
 */
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import { Link } from 'react-router-dom';


const MetaData = ({ metaData }) => {
    const listItemSx = { p: 0.5 }

    return (
        <List>
            <ListItem sx={listItemSx}>
                <ListItemIcon>
                    <AccessTimeIcon fontSize='medium' />
                </ListItemIcon>
                <ListItemText
                    primary={null}
                    secondary={"Last Modified At: " + new Date(metaData.lastModified).toLocaleString()}
                />
            </ListItem>
            <ListItem sx={listItemSx}>
                <ListItemIcon>
                    <MapsHomeWorkIcon fontSize='medium' />
                </ListItemIcon>
                <ListItemText
                    primary={null}
                    secondary={
                        <>
                            Company: &nbsp;
                            {
                                metaData.authorId
                                    ? <Link to={`/company-info/${metaData.authorId}`}>
                                        {metaData.authorName}
                                    </Link>
                                    : metaData.authorName
                            }
                        </>

                    }
                />
            </ListItem>

        </List>
    );
};

export default MetaData;