import * as React from 'react';
import { Link } from "react-router-dom";
import { useState, useContext } from "react";

import { CurrentUserContext } from "../contexts/CurrentUser";

import Topics from './Topics';

import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import ChangeUser from "./ChangeUser";

const drawerWidth = '100vw';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '1em 2em',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

export default function Header() {
  
  const { currentUser } = useContext(CurrentUserContext);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openDrawer, setOpenDrawer] = useState(false)

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };



  return (
    <><header>
            <div className="headerContainer">
      <CssBaseline />
      <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 0, ...(open && { display: 'none' }) }}
          ><MenuIcon /></IconButton>
          <h1>
          <Link to="/">newsie</Link>
        </h1>
        <div className="userContainer">
          <Tooltip title={currentUser ? currentUser.username : null} arrow placement="bottom-end">
            <Avatar alt="Logged in user avatar" src={currentUser.avatar_url} onClick={handleClickOpen} id="headerAvatar" style={{cursor: 'pointer'}}/>
          </Tooltip>
        </div>
        </div>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderBottom: '2px solid rgb(208, 208, 208)'
          },
        }}
        variant="temporary"
        anchor="top"
        open={openDrawer}
        onClose={handleDrawerClose}
        SlideProps={{easing: { enter: '0', exit: '0' }}}
      >
        <DrawerHeader >
          <IconButton color="inherit"
            aria-label="close drawer"
            onClick={handleDrawerClose}
            edge="start"
            sx={{ mr: 0}} >
            <CloseIcon />
          </IconButton>
          <h1>
          <Link to="/">newsie</Link>
        </h1>
        <div className="userContainer">
          <Tooltip title={currentUser ? currentUser.username : null} arrow placement="bottom-end">
            <Avatar alt="Logged in user avatar" src={currentUser.avatar_url} onClick={handleClickOpen} id="headerAvatar" style={{cursor: 'pointer'}}/>
          </Tooltip>
        </div>
        </DrawerHeader>
        <Topics onClick={handleDrawerClose}/>
      </Drawer>

      
    </header><div>
        <br />
        <ChangeUser
          open={open}
          onClose={handleClose} />
      </div></>
  );
}
