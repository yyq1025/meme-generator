import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { exportComponentAsJPEG } from "react-component-export-image";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import DownloadIcon from "@mui/icons-material/Download";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

Edit.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  title: PropTypes.string,
  src: PropTypes.string,
};

export default function Edit(props) {
  const { isOpen, setIsOpen, title, src } = props;

  const image = useRef();

  const [aboveText, setAboveText] = useState("");
  const [belowText, setBelowText] = useState("");

  const handleClose = () => {
    setAboveText("");
    setBelowText("");
    setIsOpen(false);
  };

  return (
    console.log("render"),
    (
      <Dialog
        open={isOpen}
        onClose={handleClose}
        component={Container}
        maxWidth="md"
      >
        <DialogTitle>Generate Your Meme</DialogTitle>
        <Divider />
        <Grid container spacing={0}>
          <Grid item xs={12} md={6} position={"relative"} ref={image}>
            <Typography
              variant="h4"
              sx={{
                position: "absolute",
                left: "50%",
                top: 0,
                transform: "translate(-50%, 0)",
                color: "white",
                textShadow: "0px 0px 10px black",
              }}
            >
              {aboveText}
            </Typography>
            <CardMedia component="img" image={src} alt={title} />
            <Typography
              variant="h4"
              sx={{
                position: "absolute",
                left: "50%",
                bottom: "0%",
                transform: "translate(-50%, 0)",
                color: "white",
                textShadow: "0px 0px 10px black",
              }}
            >
              {belowText}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
          >
            <DialogContent>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Enter above text here"
                  value={aboveText}
                  onChange={(event) => setAboveText(event.target.value)}
                />
                <TextField
                  fullWidth
                  label="Enter below text here"
                  value={belowText}
                  onChange={(event) => setBelowText(event.target.value)}
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                disableElevation
                startIcon={<DownloadIcon />}
                onClick={() =>
                  exportComponentAsJPEG(image, {
                    fileName: `${title}_${aboveText}_${belowText}.jpg`,
                  })
                }
              >
                Export
              </Button>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Grid>
        </Grid>
      </Dialog>
    )
  );
}
