import React, {useState} from 'react';
import './App.css';
import {AppBar, Button, IconButton, Toolbar} from "@mui/material";
import {GridMenuIcon} from "@mui/x-data-grid";

function App() {

    const [drawerOpen, setDrawerOpen] = useState(false);
  return (


    <div className="App">
        <AppBar>
            <Toolbar variant="dense">
            <IconButton onClick={()=>{setDrawerOpen(!drawerOpen)}} >
                <GridMenuIcon style={{color:'white'}} />
            </IconButton>
        </Toolbar>

        </AppBar>
      </div>

  );
}

export default App;
