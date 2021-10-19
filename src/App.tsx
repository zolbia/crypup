import './App.css';
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from "react";

function App() {

    const [content, setContent] = useState(<h1>hi</h1>);


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
                            <MenuIcon />
                        </IconButton>


                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Crypup
                        </Typography>
                    </Toolbar>
                </AppBar>

            </Grid>


            <Container style={{width: 'auto', height: 'auto', background: 'khaki'}}>

                <Grid width={'auto'} border={2} borderColor={'black'} height={'auto'}>
                    {content}
                </Grid>

            </Container>

        </div>

    );
}

export default App;
