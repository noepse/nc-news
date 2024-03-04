import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { useState, useEffect } from "react";

export default function Sorter(props) {
  const { topic_name, setSearchParams } = props;

  const [isAscending, setIsAscending] = useState(null);
  // let [searchParams, setSearchParams] = useSearchParams();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setSelectedIndex(0);
    setIsAscending(false);
  }, [topic_name]);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortBy = (event, index, order_by) => {
    setAnchorEl(null);

    setSelectedIndex(index);
    setIsAscending(false);

    // // date added
    if (index === 0) {
      setSearchParams({ sort_by: "created_at" });
    }

    if (index === 1) {
      setSearchParams({ sort_by: "comment_count" });
    }
    // // votes
    if (index === 2) {
      setSearchParams({ sort_by: "votes" });
    }
  };

  const handleOrderBy = (order_by) => {
    setSearchParams((currentParams) => {
      currentParams.set("order", order_by);
      return currentParams;
    });
    setIsAscending(!isAscending);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = ["Date added", "Comments", "Votes"];

  return (
    <div className="sorter">
      <List component="nav" >
        <ListItemButton
          id="sort-button"
          aria-haspopup="listbox"
          aria-controls="sort-menu"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText primary="Sort by" secondary={options[selectedIndex]} />
        </ListItemButton>
      </List>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "sort-button",
          role: "listbox",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            selected={index === selectedIndex}
            onClick={(event) => handleSortBy(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      {isAscending ? (
        <IconButton
          aria-label="descending"
          onClick={() => {
            handleOrderBy("desc");
          }}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      ) : (
        <>
        <IconButton
          aria-label="ascending"
          onClick={() => {
            handleOrderBy("asc");
          }}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
        </>
      )}
    </div>
  );
}
