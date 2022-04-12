import React, { useRef, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { exportComponentAsJPEG } from "react-component-export-image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"
import Card from '@mui/material/Card';
import CardActions from "@mui/material/CardActions";
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import ClearIcon from '@mui/icons-material/Clear';
import Container from '@mui/material/Container';
import Divider from "@mui/material/Divider";
import DownloadIcon from '@mui/icons-material/Download';
import Grid from '@mui/material/Grid';
import Stack from "@mui/material/Stack";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function Edit() {
    const [searchParams, setSearchParams] = useSearchParams();
    const title = searchParams.get("title");
    const src = searchParams.get("src");

    const image = useRef()

    const [text, setText] = useState('');

    return (
        <Container maxWidth="md">
            <Card variant="outlined">
                <Grid container spacing={0}>
                    <Grid item xs={12} md={6} position={'relative'} ref={image}>
                        <CardMedia
                            component="img"
                            image={src}
                            alt={title}
                        />
                        <Typography
                            variant="h3"
                            sx={{ position: 'absolute', left: '50%', top: 0, transform: 'translate(-50%, 0)', color: 'white', textShadow: '0px 0px 10px black' }}
                        >
                            {text}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                        <Box>
                            <CardHeader title="Generate Your Meme" />
                            <Divider />
                            <CardContent>
                                <TextField
                                    fullWidth
                                    label="Enter your text here"
                                    variant="outlined"
                                    value={text}
                                    onChange={(event) => setText(event.target.value)}
                                />
                            </CardContent>
                        </Box>
                        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                variant="contained"
                                disableElevation startIcon={<DownloadIcon />}
                                onClick={() => exportComponentAsJPEG(image, { fileName: `${title}_meme.jpg` })}>
                                Export
                            </Button>
                            <Button
                                startIcon={<ClearIcon />}
                                onClick={() => setText('')}>
                                Clear
                            </Button>
                        </CardActions>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    )
}