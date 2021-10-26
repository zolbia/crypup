import {Button, Stack, Tooltip} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {receiveRss, updateRSS} from "../../DB/database";
import {FindReplace} from "@mui/icons-material";


interface rowmodel {
    URL: string,
    RSS: string,
    id: number
}


export function Pdata() {


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
            field: 'RSS',
            headerName: 'RSS',
            description: 'RSS',
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
            valueGetter: (params: any) =>
                `${params.getValue(params.id, 'URL') || ''}/${params.getValue(params.id, 'RSS') || ''}`,
        },
    ]


    const [rows, setRows] = useState<Array<rowmodel>>([]);

    let rowSelection: Array<any> = [];


    useEffect(() => {

        receiveRss().then(result => {
            const list: Array<rowmodel> = Array.from(result);

            for (let listKey in list) {
                list[listKey].id = parseInt(listKey);
            }
            setRows(list);
        });

    }, [])


    return (
        <div>
            <Stack style={{borderRadius: '11px 11px 0px 0px', background: 'white', margin: '0px 0px 11px 0px'}}
                   spacing={3} direction={'row'}>
                <Tooltip arrow title={'Update selection RSS'}>
                    <Button
                        onClick={() => {

                            if (rowSelection.length > 0) {

                                for (let rownumber of rowSelection) {
                                    updateRSS(rows[parseInt(rownumber)].URL + '/' + rows[parseInt(rownumber)].RSS).then(result => {
                                        console.log(result)
                                    });
                                }

                            } else {
                                console.log("UpdateAll");
                            }
                        }}
                        style={{
                            color: 'white',
                            borderRadius: '5px',
                            background: '#1976d2',
                            height: "auto",
                            margin: 10,
                            padding: 10
                        }}>


                        <FindReplace/>
                    </Button>
                </Tooltip>
            </Stack>

            <DataGrid
                onSelectionModelChange={(selectionArray) => {
                    rowSelection = selectionArray;
                }}
                style={{background: 'white', borderRadius: '0px 0px 20px 20px'}}
                rows={rows}
                columns={columns}
                rowsPerPageOptions={[6]}
                autoHeight
                disableSelectionOnClick
                checkboxSelection
            />
        </div>

    );
}

