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
import {PNews} from "./componnents/news/news";

function App() {

    const [content, setContent] = useState(<PDashboard/>);

    const [showDrawer, setShowDrawer] = useState(false);
    const [headerName, setHeaderName] = useState<string>('Dashboards')

    return (
        <div className="App">


        </div>

    );
}

export default App;
