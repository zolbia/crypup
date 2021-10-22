import {Button, Card, CircularProgress, Stack, Tooltip} from "@mui/material";
import React, {useEffect, useState} from "react";
import {receiveDashboardData} from "../../DB/database";
import {RefreshRounded} from "@mui/icons-material";
import ReactDOM from "react-dom";


type dashboardDataModel = {
    data: number,
    news: number,
    rss: number,
    tag: number
}

export function PDashboard() {

    const [RSSCount, setRSSCount] = useState<number | any>(<CircularProgress/>);
    const [dataCount, setDataCount] = useState<number | any>(<CircularProgress/>);
    const [newsCount, setNewsCount] = useState<number | any>(<CircularProgress/>);
    const [tagCount, setTagsCount] = useState<number | any>(<CircularProgress/>);


    useEffect(() => {

        receiveDashboardData().then(result => {
            console.log(result);
            const constructorDashboardData: dashboardDataModel = result;

            setRSSCount(constructorDashboardData.rss);
            setDataCount(constructorDashboardData.data);
            setNewsCount(constructorDashboardData.news);
            setTagsCount(constructorDashboardData.tag);
        })

    })
    return (


        < div>
            <Stack style={{borderRadius: '11px 11px 0px 0px', background: 'white', margin: '0px 0px 11px 0px'}}
                   spacing={3} direction={'row'}>
                <Tooltip arrow title={'Update Dashboard'}>
                    <Button
                        onClick={() => {
                            setTagsCount(<CircularProgress/>)
                            setNewsCount(<CircularProgress/>)
                            setRSSCount(<CircularProgress/>)
                            setDataCount(<CircularProgress/>)

                        }}
                        style={{
                            color: 'white',
                            borderRadius: '5px',
                            background: '#1976d2',
                            height: "auto",
                            margin: 10,
                            padding: 10
                        }}>


                        <RefreshRounded/>
                    </Button>
                </Tooltip>
            </Stack>


            < Stack
                style={
                    {
                        justifyContent: 'center'
                    }
                }
                direction={'row'}
                spacing={2}>
                < Card
                    style={
                        {
                            background: 'white', width: '33%', height: 200
                        }
                    }>
                    <
                        h1> RSS:</h1>
                    <h2>{RSSCount}</h2>
                </Card>

                <Card style={{background: 'white', width: '33%', height: 200}}>
                    <h1>News:</h1>
                    <h2>{newsCount}</h2>
                </Card>

                <Card style={{background: 'white', width: '33%', height: 200}}>
                    <h1>Tags:</h1>
                    <h2>{tagCount}</h2>
                </Card>

                <Card style={{background: 'white', width: '60%', height: 200}}>
                    <h1>Data:</h1>
                    <h2>{dataCount}</h2>
                </Card>


            </Stack>
        </div>

    )
        ;
}

