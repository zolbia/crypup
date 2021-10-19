import {Button, Stack} from "@mui/material";
import react, {useState} from "react";
import {DataGrid} from "@mui/x-data-grid";

const columns = [
    {
        field: 'id'
        , headerName: 'id',
        width: 90
    },
    {
        field: 'URL',
        headerName: 'URL',
        description: 'Base URL',
        width: 260,
        editable: false,
        type: 'string'
    },
    {
        field: 'RSSs',
        headerName: 'RSSs',
        description: 'RSSs Path',
        width: 260,
        editable: false,
        type: 'string',
    },

    {
        field: 'Path',
        headerName: 'Path',
        description: 'Path',
        width: 350,
        editable: false,
        type: 'string',
        valueGetter: (params:any) =>
            `${params.getValue(params.id, 'URL') || ''}/${params.getValue(params.id, 'RSSs') || ''}`,
    },
]


export function Pdata() {

    return (
        <div >
            <Stack spacing={3} direction={'row'}>
                <Button
                        style={{
                            color: 'white',
                            borderRadius: '10px',
                            background: '#1976d2',
                            height: "auto",
                            margin: 10,
                            padding: 10
                        }}>
                    Sync
                </Button>
            </Stack>

            <DataGrid
style={{background:'white'}}
                rows={[]}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[6]}
                autoHeight
                disableSelectionOnClick
                checkboxSelection
            />
        </div>

    );
}

