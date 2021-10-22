import {Button, Card, Stack} from "@mui/material";
import {useState} from "react";


export function PDashboard() {

    const [RSSCount, setRSSCount] = useState<number>(0);
    const [dataCount, setDataCount] = useState<number>(0);
    const [newsCount, setNewsCount] = useState<number>(0);


    return (
        <div>
            <Stack style={{justifyContent: 'center'}} direction={'row'} spacing={2}>
                <Card style={{background: 'white', width: '33%', height: 200}}>
                    <h1>RSS:</h1>
                    <h2>{RSSCount}</h2>
                </Card>

                <Card style={{background: 'white', width: '60%', height: 200}}>
                    <h1>Data:</h1>
                    <h2>{dataCount}</h2>
                </Card>

                <Card style={{background: 'white', width: '33%', height: 200}}>
                    <h1>News:</h1>
                    <h2>{newsCount}</h2>
                </Card>
            </Stack>
        </div>

    );
}

