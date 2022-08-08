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
import { Link } from 'react-router-dom';


const MetaData = ({ data }) => {
    const listItemSx = { p: 0.5 }
    const page = window.location.pathname.slice(1)
    return (
        <List>
            <ListItem sx={listItemSx}>
                <ListItemIcon>
                    <AccessTimeIcon fontSize='medium' />
                </ListItemIcon>
                <ListItemText
                    primary={null}
                    secondary={"Last Modified At: " + new Date(data.lastModified * 1000).toLocaleString()}
                />
            </ListItem>
            <ListItem sx={listItemSx}>
                <ListItemIcon>
                    <PersonIcon fontSize='medium' />
                </ListItemIcon>
                <ListItemText
                    primary={null}
                    secondary={
                        <>
                            Author: &nbsp;
                            {
                                data.authorId
                                    ? <Link to={`/student-info/${data.authorId}`} target="_blank">
                                        {data.authorName}
                                    </Link>
                                    : data.authorName
                            }
                        </>
                    }
                />
            </ListItem>
            {
                !page.startsWith('view') &&
                <ListItem sx={listItemSx}>
                    <ListItemIcon>
                        <DescriptionIcon fontSize='medium' />
                    </ListItemIcon>
                    <ListItemText
                        primary={null}
                        secondary={
                            <>
                                Challenge Name: &nbsp;
                                <a
                                    onClick={() => data.openProject()}
                                    style={{
                                        cursor: 'pointer',
                                        color: 'blue',
                                        textDecoration: 'underlined'
                                    }}
                                >
                                    {data.project}
                                </a>
                            </>
                        }
                    />
                </ListItem>
            }

        </List>
    );
};

export default MetaData;