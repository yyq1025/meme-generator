import React, { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";

export default function Navbar() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClear = () => {
    setValue("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value) {
      navigate({
        pathname: "/search",
        search: createSearchParams({
          text: value,
        }).toString(),
      });
      setValue("");
    }
  };

  return (
    <AppBar position="fixed" variant="outlined" color="inherit" elevation={0}>
      <Toolbar component={Container} maxWidth="sm">
        <Paper
          variant="outlined"
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            bgcolor: "whitesmoke",
          }}
          onSubmit={handleSubmit}
        >
          <SearchIcon sx={{ p: "8px" }} />
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Your Meme"
            value={value}
            onChange={handleChange}
            inputProps={{ "aria-label": "search memes" }}
          />
          {value && (
            <Tooltip title="Clear" arrow>
              <IconButton aria-label="clear" onClick={handleClear}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          )}
        </Paper>
      </Toolbar>
    </AppBar>
  );
}
