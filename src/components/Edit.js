import React from "react";
import { useSearchParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function Edit() {
    const [searchParams, setSearchParams] = useSearchParams();
    const title = searchParams.get("title");
    const src = searchParams.get("src");

    return (
        <Container maxWidth="sm">
            <Card variant="outlined">
                <CardHeader title="Generate Your Meme" />
                <CardMedia
                    component="div"
                    sx={{ position: 'relative' }}
                >
                    <img src={src} alt={title} width='100%' />
                    <Typography variant="h2"
                        sx={{ position: 'absolute', left: '50%', top: '10%', transform: 'translate(-50%,-50%)', color: 'white', textShadow: '0px 0px 10px black' }}>
                        test
                    </Typography>
                </CardMedia>
                <CardContent>
                    <TextField fullWidth label="Enter your text here" variant="outlined" />
                </CardContent>
            </Card>
        </Container>
    )
}