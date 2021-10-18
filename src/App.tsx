import React, {useState} from 'react';
import './App.css';
import {AppBar, Box, Button, Drawer, IconButton, List, ListItemButton, ListItemIcon, Toolbar} from "@mui/material";
import {GridMenuIcon} from "@mui/x-data-grid";
import {DataUsageTwoTone, RssFeedOutlined, Sync} from "@mui/icons-material";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="App">
        <Drawer onClick={()=>{setDrawerOpen(!drawerOpen)}} open={drawerOpen} id="Drawer" anchor="left">
          <Box sx={{width: 200}}>
            <List>
              <ListItemButton sx={{width: '100%', height: 40}}>
                <ListItemIcon>
                  <RssFeedOutlined/>
                </ListItemIcon>
                <span> Feeder </span>
              </ListItemButton>

              <ListItemButton sx={{width: '100%', height: 40}}>
                <ListItemIcon>
                  <Sync/>
                </ListItemIcon>
                <span> Syncer </span>
              </ListItemButton>

              <ListItemButton sx={{width: '100%', height: 40}}>
                <ListItemIcon>
                  <DataUsageTwoTone/>
                </ListItemIcon>
                <span> Data </span>
              </ListItemButton>


            </List>
            <Button sx={{width: 'unset'}}/>

          </Box>

        </Drawer>
        <AppBar position="relative">


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
