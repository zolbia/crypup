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
import {RssFeed, Storage} from "@mui/icons-material";
import {SS} from "./componnents/data/pagedata";



function App() {

    const [content, setContent] = useState(<SS></SS>);

    const [showDrawer, setShowDrawer] = useState(false);


    return (

        <div className="App">
            <Grid width={'auto'} border={2} borderColor={'black'}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon onClick={() => {
                                setShowDrawer(!showDrawer)
                            }}/>
                        </IconButton>


                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Crypup
                        </Typography>
                    </Toolbar>
                </AppBar>

            </Grid>

            <div>
                <Drawer anchor={'left'} onClick={()=>{setShowDrawer(!showDrawer)}} open={showDrawer}>
                    <Box  minWidth={200}>
                        <List>
                            <ListItemButton onClick={()=>{setContent(<SS></SS>)}} >
                                <RssFeed/>
                                <span>RSS</span>
                            </ListItemButton>
                            <ListItemButton onClick={()=>{setContent(<h1>Data</h1>)}}>
                                <Storage/>
                                <span>Data</span>
                            </ListItemButton>
                        </List>

                    </Box>

                </Drawer>

            </div>


            <Container style={{width: 'auto', height: 'auto', background: 'khaki'}}>

                <Grid width={'auto'} border={2} borderColor={'black'} height={'auto'}>
                    {content}
                </Grid>

            </Container>

        </div>

    );
}

export default App;
