import {Button, Stack, Tooltip} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {receiveNews} from "../../DB/database";
import {DeleteRounded, UpdateRounded} from "@mui/icons-material";
import AddFeedsModal from "../modals/adddata/addData";


interface rowModel {
    id: number,
    author?: string | any,
    category?: string | any,
    content?: string | any,
    description?: string | any,
    enclosure?: string | any,
    guid?: string | any,
    link?: string | any,
    pubDate?: string | any,
    title?: string | any
}


export function PNews() {


    const columns = [
        {
            field: 'id'
            , headerName: 'id',
            width: 100
        },
        {
            field: 'author',
            width: 160,
            editable: false,
            type: 'string'
        },
        {
            field: 'category',
            sortable: true,
            width: 160,
            editable: false,
            type: 'string'
        },
        {
            field: 'content',
            width: 160,
            editable: false,
            type: 'array'
        },
        {
            field: 'description',
            width: 200,
            editable: false,
            type: 'Array'
        },
        {
            field: 'enclosure',
            width: 160,
            editable: false,
            type: 'string'
        },
        {
            field: 'guid',
            width: 160,
            editable: false,
            type: 'string'
        },
        {
            field: 'link',
            width: 160,
            editable: false,
            type: 'string'
        },
        {
            field: 'pubDate',
            width: 160,
            editable: false,
            type: 'string'
        },
        {
            field: 'title',
            width: 500,
            editable: false,
            type: '<link/>'
        },
    ]


    const [rows, setRows] = useState<Array<rowModel>>([]);


    const [showModal, setShowModal] = useState(false);

    const [rowSelection, setRowSelection] = useState<Array<any>>([])

    useEffect(() => {

        console.log('hi')
        receiveNews().then(news => {

            const constructorNewsArray: Array<rowModel> = news;

            for (let listKey in constructorNewsArray) {
                constructorNewsArray[parseInt(listKey)].id = parseInt(listKey);


                if (constructorNewsArray[parseInt(listKey)].title !== undefined)
                    constructorNewsArray[parseInt(listKey)].title = constructorNewsArray[parseInt(listKey)].title['_text'];

                if (constructorNewsArray[parseInt(listKey)].link !== undefined)
                    constructorNewsArray[parseInt(listKey)].link = constructorNewsArray[parseInt(listKey)].link['_text'];

                if (constructorNewsArray[parseInt(listKey)].guid !== undefined)
                    constructorNewsArray[parseInt(listKey)].guid = constructorNewsArray[parseInt(listKey)].guid['_text'];


                if (constructorNewsArray[parseInt(listKey)].enclosure !== undefined)
                    constructorNewsArray[parseInt(listKey)].enclosure = constructorNewsArray[parseInt(listKey)].enclosure['_text'];


                if (constructorNewsArray[parseInt(listKey)].description !== undefined)
                    constructorNewsArray[parseInt(listKey)].description = constructorNewsArray[parseInt(listKey)].description['_text'];


                if (constructorNewsArray[parseInt(listKey)].content !== undefined)
                    constructorNewsArray[parseInt(listKey)].content = constructorNewsArray[parseInt(listKey)].content['_text'];

                if (constructorNewsArray[parseInt(listKey)].category !== undefined)
                    constructorNewsArray[parseInt(listKey)].category = constructorNewsArray[parseInt(listKey)].category['_text'];


                if (constructorNewsArray[parseInt(listKey)].author !== undefined)
                    constructorNewsArray[parseInt(listKey)].author = constructorNewsArray[parseInt(listKey)].author['_text'];

                if (constructorNewsArray[parseInt(listKey)].pubDate !== undefined)
                    constructorNewsArray[parseInt(listKey)].pubDate = constructorNewsArray[parseInt(listKey)].pubDate['_text'];
            }

            setRows(constructorNewsArray)

        })
    }, [])

    return (
        <div>

            <AddFeedsModal close={() => {
                setShowModal(!showModal)
            }} isOpen={showModal}/>


            <Stack style={{borderRadius: '11px 11px 0px 0px', background: 'white', margin: '0px 0px 11px 0px'}}
                   spacing={3} direction={'row'}>

                <Tooltip title={'Update'} arrow>

                    <Button
                        style={{
                            color: 'white',
                            borderRadius: '5px',
                            background: '#1976d2',
                            height: "auto",
                            margin: 10,
                            padding: 10
                        }}>

                        <UpdateRounded/>
                    </Button>
                </Tooltip>

                {
                    rowSelection.length > 0 ?
                        <Tooltip title={`Delete [ ${rowSelection.length} ] item selection`} arrow>


                            <Button
                                variant={'outlined'}
                                style={{
                                    color: 'white',
                                    borderRadius: '5px',
                                    borderColor: 'black',
                                    background: 'tomato',
                                    border: 20,
                                    height: "auto",
                                    margin: 10,
                                    padding: 10
                                }}>


                                <Stack spacing={1} direction={'row'}>

                                    <span>{`Count: ${rowSelection.length}`}</span>
                                    <DeleteRounded/>
                                </Stack>
                            </Button>
                        </Tooltip> :
                        undefined
                }


            </Stack>

            <DataGrid
                onSelectionModelChange={(newRow) => {
                    setRowSelection(newRow)
                }}
                rowHeight={20}
                pageSize={10}
                style={{background: 'white', borderRadius: '0px 0px 20px 20px'}}
                autoHeight
                disableSelectionOnClick
                checkboxSelection={true}
                columns={columns}
                rows={rows}
            />

        </div>
    );
}

