import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { AccountCircleOutlined } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home'

export default function Appbar() {
        // const userid = localStorage.getItem('userid');
        const [userid, setUserid] = useState('');
        useEffect(() => {
                setUserid(localStorage.getItem('userid'));
        })

        return (
                <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="static">
                                <Toolbar>
                                        <Button color="inherit">
                                                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                                                        <HomeIcon fontSize='large' />
                                                        {/* MRS */}
                                                </Link>
                                        </Button>
                                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                                Movie Review System
                                        </Typography>
                                        <Button color="inherit">
                                                {userid === null ?
                                                        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                                                                Login
                                                        </Link>
                                                        :
                                                        <Link to={`/eachuser/${userid}`} style={{ color: 'white', textDecoration: 'none' }}>
                                                                {/* <Typography> Profile </Typography> */}
                                                                <AccountCircleOutlined fontSize='large' />
                                                        </Link>
                                                }
                                        </Button>
                                </Toolbar>
                        </AppBar>
                </Box>
        );
}
