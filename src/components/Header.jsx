import { Link } from "react-router-dom";
import { useContext } from "react";

import { CurrentUserContext } from "../contexts/CurrentUser";

import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

export default function Header() {
  const { currentUser } = useContext(CurrentUserContext);
  console.log(currentUser);
  return (
    <header>
      <div class="headerContainer">
        <h1>
          <Link to="/">newsie</Link>
        </h1>
        <div className="userContainer">
          <Tooltip title={currentUser.username} arrow>
            <Avatar alt="Logged in user avatar" src={currentUser.avatar_url} />
          </Tooltip>
        </div>
      </div>
    </header>
  );
}
