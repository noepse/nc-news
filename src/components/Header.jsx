import { Link } from "react-router-dom"
import { useContext } from "react";

import { CurrentUserContext } from "../contexts/CurrentUser";

import Avatar from '@mui/material/Avatar';

export default function Header(){
    const { currentUser } = useContext(CurrentUserContext);
    return (<header><div class="headerContainer"><h1><Link to = "/" >newsie</Link></h1>
    <div className = "userContainer">
    <Avatar alt="Logged in user avatar" src={currentUser.Avatar} />
        </div>        
    </div></header>
    )
}