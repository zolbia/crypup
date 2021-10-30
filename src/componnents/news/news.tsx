import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack, TextField,
    Tooltip
} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {filterReceiveNews, receiveNews} from "../../DB/database";
import {CleaningServicesRounded, DeleteRounded, UpdateRounded} from "@mui/icons-material";
import {DeleteNewsModal} from "../modals/deleteNews/deleteNews";

export interface rowModel {
    id: number,
    author?: string | any,
    category?: string | any,
    content?: string | any,
    description?: string | any,
    enclosure?: string | any,
    guid?: string | any,
    link?: string | any,
    pubDate?: string | any,
    title?: string | any,
    _id: any,
    isSelect?: boolean
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

    const [rowSelection, setRowSelection] = useState<Array<any>>([])

    const [showModalDelete, setShowModalDelete] = useState(false)

    const [isLoading, setIsLoading] = useState(true);


    const [filterShow, setFilterShow] = useState('10');
    const [filterData, setFilterData] = useState('100');
    const [filterShowDelete, setFilterShowDelete] = useState('0');
    const [filterDate, setFilterDate] = useState('');
    const [filterSkip, setFilterSkip] = useState('0');

    const rowsForDelete = () => {

        const rowD: Array<rowModel> = [];

        for (let rowDElement of rows) {
            if (rowDElement.isSelect && rowDElement !== undefined) {
                rowD.push(rowDElement)
            }
        }
        return rowD;
    }


    useEffect(() => {
        receiveNewsRow();
    }, [])


    const receiveNewsRow = () => {
        setIsLoading(true);
        setRows([])

        const filter: filterReceiveNews = {
            data: parseInt(filterData),
            showDelete: false,
            skip: parseInt(filterSkip)
        }

        switch (parseInt(filterShowDelete)) {
            case 0:
                filter.showDelete = false;
                break;
            case  1:
                filter.showDelete = true;
                break;
        }

        receiveNews(filter).then(news => {


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

            setIsLoading(false);
            setRows(constructorNewsArray)

        })
    }

    const handleChangeShow = (event: SelectChangeEvent) => {
        setFilterShow(event.target.value as string);
        receiveNewsRow();
    };

    const handleChangeData = (event: SelectChangeEvent) => {
        setFilterData(event.target.value as string);
        receiveNewsRow();
    };

    const handleChangeDelete = (event: SelectChangeEvent) => {
        setFilterShowDelete(event.target.value as string);
        receiveNewsRow();
    };
    const handleChangeDate = (event: any) => {
        setFilterDate(event.target.value as string)
        receiveNewsRow();
    };

    const handleChangeSkip = (event: any) => {

        setFilterSkip(event.target.value)
        receiveNewsRow();
    };

    const handleClearFilter = (event: any) => {
        setFilterShow('10');
        setFilterData('100');
        setFilterShowDelete('0');
        setFilterDate('');
        setFilterSkip('0');
        receiveNewsRow();
    };

    return (
        <div>
            <DeleteNewsModal ids={rowsForDelete()} close={() => {
                setShowModalDelete(!showModalDelete)
            }} isOpen={showModalDelete} deleteCount={rowSelection.length}/>

            <Stack style={{borderRadius: '11px 11px 0px 0px', background: 'white', margin: '0px 0px 11px 0px'}}
                   spacing={3} direction={'row'}>

                <Tooltip title={'Update'} arrow>


                    <Button
                        onClick={receiveNewsRow}
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
                                onClick={() => {
                                    setShowModalDelete(!showModalDelete)
                                }}
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


            <Stack style={{background: 'white', margin: '0px 0px 3px 0px'}}
                   direction={'row'}>


                <Box sx={{margin: 1, width: 120}}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Show</InputLabel>
                        <Select
                            size={'small'}
                            style={{width: 120}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filterShow}
                            label="Show"
                            MenuProps={{style: {width: 120}}}
                            onChange={handleChangeShow}
                        >
                            <MenuItem style={{width: 120}} value={10}> 10 </MenuItem>
                            <MenuItem style={{width: 120}} value={30}> 30 </MenuItem>
                            <MenuItem style={{width: 120}} value={50}> 50 </MenuItem>
                            <MenuItem style={{width: 120}} value={100}> 100 </MenuItem>
                        </Select>


                    </FormControl>
                </Box>

                <Box sx={{margin: 1, width: 120}}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Data</InputLabel>
                        <Select
                            size={'small'}
                            style={{width: 120}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filterData}
                            label="Data"
                            MenuProps={{style: {width: 120}}}
                            onChange={handleChangeData}

                        >
                            <MenuItem style={{width: 120}} value={100}> 100 </MenuItem>
                            <MenuItem style={{width: 120}} value={300}> 300 </MenuItem>
                            <MenuItem style={{width: 120}} value={500}> 500 </MenuItem>
                            <MenuItem style={{width: 120}} value={700}> 700 </MenuItem>
                            <MenuItem style={{width: 120}} value={1000}> 1000 </MenuItem>
                        </Select>


                    </FormControl>
                </Box>

                <Box sx={{margin: 1, width: 130}}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Show Delete</InputLabel>
                        <Select
                            size={'small'}
                            style={{width: 130}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filterShowDelete}
                            label="Show Delete"
                            MenuProps={{style: {width: 130}}}
                            onChange={handleChangeDelete}

                        >
                            <MenuItem style={{width: 130}} value={1}> yes </MenuItem>
                            <MenuItem style={{width: 130}} value={0}> No </MenuItem>
                        </Select>


                    </FormControl>
                </Box>

                <Box sx={{margin: 1, width: 130}}>
                    <TextField value={filterDate} onChange={handleChangeDate} label={'Date'} size={'small'}/>
                </Box>

                <Box sx={{margin: 1, width: 130}}>
                    <TextField value={filterSkip} onChange={handleChangeSkip} label={'Skip'} size={'small'}/>
                </Box>

                <Box sx={{margin: 1}}>
                    <Tooltip title={'Clear Filter'} arrow>
                        <Button
                            onClick={handleClearFilter}
                            style={{
                                color: 'gray',
                                borderRadius: '5px',
                                padding: 10
                            }}>

                            <CleaningServicesRounded/>
                        </Button>
                    </Tooltip>
                </Box>

            </Stack>


            <DataGrid
                onSelectionModelChange={(newRow) => {

                    rows.forEach(rw => {
                        rw.isSelect = false;
                    })

                    newRow.forEach(rn => {
                        rows[parseInt(rn.toString())].isSelect = true;
                    })


                    setRowSelection(newRow)
                }}
                pagination
                loading={isLoading}
                rowHeight={20}
                pageSize={parseInt(filterShow)}
                style={{background: 'white', minHeight: 300, borderRadius: '0px 0px 20px 20px'}}
                autoHeight
                disableSelectionOnClick
                checkboxSelection={true}
                columns={columns}
                rows={rows}
            />

        </div>
    );
}

