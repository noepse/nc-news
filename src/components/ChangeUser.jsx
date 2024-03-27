import { useContext, useState, useEffect } from "react";

import Avatar from "@mui/material/Avatar";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import CheckIcon from '@mui/icons-material/Check';
import { blue } from '@mui/material/colors';

import { CurrentUserContext } from "../contexts/CurrentUser";

import { getUsers } from "../utils/api";


export default function ChangeUser(props) {
  const { onClose, open } = props;
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [users, setUsers] = useState([])

  useEffect(()=>{
    getUsers().then((usersData)=>{
        setUsers(usersData)
    })
  }, [])

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    setCurrentUser(value)
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "300px",  
          },
        },
      }}>
      <DialogTitle>Change User</DialogTitle>
      <List sx={{ pt: 0}}>
        {users.map((user) => (
          <ListItem disableGutters key={user.username}>
            <ListItemButton onClick={() => handleListItemClick(user)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }} src={user.avatar_url}>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.username} />
              {user.username === currentUser.username?  <ListItemAvatar>
                <CheckIcon style ={{marginLeft: '1em'}} color="primary"/>
            </ListItemAvatar> : null}
             
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

ChangeUser.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};