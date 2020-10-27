import { AppBar, IconButton, Menu, MenuItem, Toolbar } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import BookmarkBorderSharpIcon from "@material-ui/icons/BookmarkBorderSharp";
import CardTravelSharpIcon from "@material-ui/icons/CardTravelSharp";
import CopyrightSharpIcon from "@material-ui/icons/CopyrightSharp";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const MainMenu = () => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
            aria-controls="simple-menu"
            aria-haspopup="true"
          >
            <AcUnitIcon />
          </IconButton>
          <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem
              id="albums"
              onClick={() => {
                history.push("/albums");
              }}
            >
              <ListItemIcon>
                <BookmarkBorderSharpIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Albums" />
            </MenuItem>
            <MenuItem
              id="todos"
              onClick={() => {
                history.push("/todos");
              }}
            >
              <ListItemIcon>
                <CardTravelSharpIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="To Do" />
            </MenuItem>
            <MenuItem
              id=""
              onClick={() => {
                history.push("/");
              }}
            >
              <ListItemIcon>
                <CopyrightSharpIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};
