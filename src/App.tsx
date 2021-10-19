import './App.css';
import {
    AppBar,
    Box,
    Button,
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
import {RssFeed} from "@mui/icons-material";

function App() {

    const [content, setContent] = useState(<h1>Dashboard</h1>);

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
                            <ListItemButton>
                                <RssFeed/>
                                <span>hi</span>
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
