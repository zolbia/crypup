import './App.css';
import {
    AppBar,
    Box,
    Container,
    Drawer,
    Grid,
    IconButton,
    List, ListItemButton,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from "react";
import {Dashboard, RssFeed, Storage} from "@mui/icons-material";
import {Pdata} from "./componnents/data/data";
import {PRss} from "./componnents/rss/rss";
import {PDashboard} from "./componnents/dashboard/dashboard";
import MenuBookIcon from '@mui/icons-material/MenuBook';

function App() {

    const [content, setContent] = useState(<PDashboard/>);

    const [showDrawer, setShowDrawer] = useState(false);
    const [headerName, setHeaderName] = useState<string>('Dashboards')

    return (

        <div className="App">
            <Grid width={'auto'} border={2} borderColor={'black'}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            onClick={() => {
                                setShowDrawer(!showDrawer)
                            }}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>


                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            {headerName}
                        </Typography>
                    </Toolbar>
                </AppBar>

            </Grid>

            <div>
                <Drawer anchor={'left'} onClick={() => {
                    setShowDrawer(!showDrawer)
                }} open={showDrawer}>
                    <Box style={{width: 200}}>
                        <List>
                            <ListItemButton style={{width: 200, height: 50}} onClick={() => {
                                setContent(<PDashboard/>)
                                setHeaderName('Dashboard')
                            }}>
                                <Dashboard/>
                                <span>Dashboard</span>
                            </ListItemButton>

                            <ListItemButton style={{width: 200, height: 50}} onClick={() => {
                                setContent(<PRss/>)
                                setHeaderName('RSSs')
                            }}>
                                <RssFeed/>
                                <span>RSS</span>
                            </ListItemButton>
                            <ListItemButton style={{width: 200, height: 50}} onClick={() => {
                                setContent(<Pdata/>)
                                setHeaderName('Datas')
                            }}>
                                <Storage/>
                                <span>Data</span>
                            </ListItemButton>
                            <ListItemButton style={{width: 200, height: 50}} onClick={() => {
                                setContent(<h1>News</h1>);
                                setHeaderName('News')
                            }}>
                                <MenuBookIcon/>
                                <span>News</span>
                            </ListItemButton>
                        </List>

                    </Box>

                </Drawer>

            </div>


            <Container style={{width: 'auto', padding: 20, height: 'auto', background: 'lightgray'}}>

                <Grid width={'auto'} border={2} borderColor={'black'} height={'auto'}>
                    {content}
                </Grid>

            </Container>

        </div>

    );
}

export default App;
