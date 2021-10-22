import {Button, Stack, Tooltip} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {receiveData} from "../../DB/database";
import {Add} from "@mui/icons-material";
import AddFeedsModal from "../modals/adddata/addData";


interface rowmodel {
    URL: string,
    RSS: string,
    id: number,
    Name: string,
    Active: boolean,
    Tags: [],

}


export function PRss() {


    const columns = [
        {
            field: 'id'
            , headerName: 'id',
            width: 100
        },
        {
            field: 'Name',
            headerName: 'Name',
            description: 'Name Feeds',
            width: 160,
            editable: false,
            type: 'string'
        },
        {
            field: 'IsActive',
            headerName: 'Active',
            description: 'Active?',
            sortable: true,
            width: 160,
            editable: false,
            type: 'boolean'
        },
        {
            field: 'RSS',
            headerName: 'RSS',
            description: 'RSS',
            width: 160,
            editable: false,
            type: 'array'
        },
        {
            field: 'Tags',
            headerName: 'Tags',
            description: 'Tags',
            width: 160,
            editable: false,
            type: 'Array'
        },
        {
            field: 'URL',
            width: 160,
            editable: false,
            type: 'string'
        },
    ]


    const [rows, setRows] = useState<Array<rowmodel>>([]);


    const [showModal, setShowModal] = useState(false);


    useEffect(() => {

        receiveData().then(result => {
            const list: Array<rowmodel> = Array.from(result);

            for (let listKey in list) {
                list[listKey].id = parseInt(listKey);
            }
            setRows(list);
        });

    }, [])

    return (
        <div>

            <AddFeedsModal close={() => {
                setShowModal(!showModal)
            }} isOpen={showModal}/>


            <Stack style={{borderRadius: '11px 11px 0px 0px', background: 'white', margin: '0px 0px 11px 0px'}}
                   spacing={3} direction={'row'}>

                <Tooltip title={'Add new RSS'} arrow>

                    <Button
                        onClick={() => {
                            setShowModal(!showModal)
                        }}
                        style={{
                            color: 'white',
                            borderRadius: '5px',
                            background: '#1976d2',
                            height: "auto",
                            margin: 10,
                            padding: 10
                        }}>

                        <Add/>
                    </Button>
                </Tooltip>
            </Stack>

            <DataGrid

                style={{background: 'white', borderRadius: '0px 0px 20px 20px'}}
                rows={rows}
                columns={columns}
                rowsPerPageOptions={[6]}
                autoHeight
                disableSelectionOnClick
                checkboxSelection={false}
            />

        </div>
    );
}

