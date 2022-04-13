import React, { useRef, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { exportComponentAsJPEG } from "react-component-export-image";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardActions from "@mui/material/CardActions";
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CancelIcon from '@mui/icons-material/Cancel';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import Container from '@mui/material/Container';
import Divider from "@mui/material/Divider";
import DownloadIcon from '@mui/icons-material/Download';
import Grid from '@mui/material/Grid';
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from "@mui/material/Modal";

export default function Edit(props) {
    // const [searchParams, setSearchParams] = useSearchParams();
    // const title = searchParams.get("title");
    // const src = searchParams.get("src");
    const { isOpen, setIsOpen, title, src } = props;

    const image = useRef()

    const [aboveText, setAboveText] = useState('');
    const [belowText, setBelowText] = useState('');

    const handleClose = () => {
        setAboveText('');
        setBelowText('');
        setIsOpen(false);
    }

    return (
        console.log('render'),
        <Modal open={isOpen} onClose={handleClose} >
            <Container maxWidth="md" sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                outline: 'none'
            }}>
                <Card sx={{ boxShadow: 24 }}>
                    <CardHeader title="Generate Your Meme" />
                    <Divider />
                    <Grid container spacing={0}>
                        <Grid item xs={12} md={6} position={'relative'} ref={image}>
                            <Typography
                                variant="h3"
                                sx={{
                                    position: 'absolute',
                                    left: '50%', top: 0,
                                    transform: 'translate(-50%, 0)',
                                    color: 'white',
                                    textShadow: '0px 0px 10px black'
                                }}
                            >
                                {aboveText}
                            </Typography>
                            <CardMedia
                                component="img"
                                image={src}
                                alt={title}
                            />
                            <Typography
                                variant="h3"
                                sx={{
                                    position: 'absolute',
                                    left: '50%', bottom: 0,
                                    transform: 'translate(-50%, 0)',
                                    color: 'white',
                                    textShadow: '0px 0px 10px black'
                                }}
                            >
                                {belowText}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                            <Box>
                                <CardContent>
                                    <TextField
                                        fullWidth
                                        label="Enter above text here"
                                        variant="outlined"
                                        value={aboveText}
                                        onChange={(event) => setAboveText(event.target.value)}
                                        InputProps={{
                                            endAdornment: aboveText && <IconButton onClick={() => setAboveText('')}><ClearIcon /></IconButton>
                                        }}
                                    />
                                </CardContent>
                                <CardContent>
                                    <TextField
                                        fullWidth
                                        label="Enter below text here"
                                        variant="outlined"
                                        value={belowText}
                                        onChange={(event) => setBelowText(event.target.value)}
                                        InputProps={{
                                            endAdornment: belowText && <IconButton onClick={() => setBelowText('')}><ClearIcon /></IconButton>
                                        }}
                                    />
                                </CardContent>
                            </Box>
                            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Stack direction='row' spacing={1}>
                                    <Button
                                        variant="contained"
                                        disableElevation startIcon={<DownloadIcon />}
                                        onClick={() => exportComponentAsJPEG(image, { fileName: `${title}_${aboveText}.jpg` })}>
                                        Export
                                    </Button>
                                    <Button
                                        onClick={handleClose}>
                                        Cancel
                                    </Button></Stack>
                            </CardActions>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </Modal>
    )
}