import React, { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container"
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

export default function Home() {
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleClear = () => {
        setValue('');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (value) {
            console.log(value);
            navigate({
                pathname: "/search",
                search: createSearchParams({
                    text: value
                }).toString()
            });
            setValue('');
        }
    };

    return (
        <Box sx={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Container maxWidth="sm">
                <Paper
                    variant="outlined"
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                    onSubmit={handleSubmit}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Your Meme"
                        value={value}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    {
                        value &&
                        <IconButton sx={{ p: '10px' }} aria-label="clear" onClick={handleClear}>
                            <ClearIcon />
                        </IconButton>
                    }
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton type="submit" color="primary" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Container>
        </Box>
    )
}