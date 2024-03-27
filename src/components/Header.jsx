import { Link } from "react-router-dom";
import { useState, useContext } from "react";

import { CurrentUserContext } from "../contexts/CurrentUser";

import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import * as React from 'react';

import ChangeUser from "./ChangeUser";

export default function Header() {
  
  const { currentUser } = useContext(CurrentUserContext);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <><header>
      <div className="headerContainer">
        <h1>
          <Link to="/">newsie</Link>
        </h1>
        <div className="userContainer">
          <Tooltip title={currentUser ? currentUser.username : null} arrow placement="bottom-end">
            <Avatar alt="Logged in user avatar" src={currentUser.avatar_url} onClick={handleClickOpen}/>
          </Tooltip>
        </div>
      </div>
    </header><div>
        <br />
        <ChangeUser
          open={open}
          onClose={handleClose} />
      </div></>
  );
}
