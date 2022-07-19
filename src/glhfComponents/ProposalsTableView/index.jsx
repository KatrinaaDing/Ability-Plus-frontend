import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import ProcessStatusBadge from 'glhfComponents/ProcessStatusBadge';
import { propStatus } from 'glhfComponents/ProcessStatusBadge';

/*
authorId: 68
authorName: "ZIQI"
id: 27
oneSentenceDescription: "In order to manage Project Proposal"
rating: null
status: 0
title: "Managing Project Proposal"
*/
const columns = [
    {
        field: 'title',
        headerName: 'Title',
        width: 300
    }, 
    { 
        field: 'authorName', 
        headerName: 'Author', 
        width: 150 
    },
    {
        field: 'oneSentenceDescription',
        headerName: 'Description',
        width: 250,
    },
    {
        field: 'rating',
        headerName: 'My Rating',
        width: 150,
    },
    {
        field: 'status',
        headerName: 'status',
        width: 150,
    },
];

const ProposalsTableView = ({proposals, selectMode, selectedItem, setSelectedItem}) => {

    const [rows, setRows] = useState([])

    useEffect(() => {
        const dataRows = []
        proposals.forEach(p => 
            dataRows.push({
                id: p.id,
                title: p.title,
                authorName: p.authorName,
                oneSentenceDescription: p.oneSentenceDescription,
                rating: p.rating === null ? 0 : p.rating,
                status: propStatus[p.status].label
            })
        )
        setRows(dataRows)
    }, [proposals])

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection={selectMode}
                onSelectionModelChange={(newSelectionModel) => {
                    console.log('new',newSelectionModel)
                    setSelectedItem(newSelectionModel);
                }}
                selectionModel={selectedItem}
                disableSelectionOnClick
            />
        </div>
    );
};

export default ProposalsTableView;