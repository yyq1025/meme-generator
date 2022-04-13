import * as React from "react";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import Box from '@mui/material/Box';
import Home from "./components/Home";
import Result from "./components/Result";
import Edit from "./components/Edit";


function App() {
  return (
    // <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', backgroundColor: 'whitesmoke', minHeight: '100vh', height: '100%' }}>
        <BrowserRouter>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Result />} />
            {/* <Route path="/edit" element={<Edit />} /> */}
          </Routes>
        </BrowserRouter>
      // </Box>
  );
}

export default App;
