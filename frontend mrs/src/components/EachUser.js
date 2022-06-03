import * as React from 'react';
import { Paper, Typography, TextField, Box, Stack, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";

export default function EachUser() {
        const { uid } = useParams();
        const navigate = useNavigate();
        const userid = localStorage.getItem('userid');

        // to get details of each user with given uid
        const [user, setUser] = useState('');
        useEffect(() => {
                uid ?
                        fetch(`http://localhost:8080/user/${uid}`)
                                .then(res => res.json())
                                .then((result) => {
                                        setUser(result);
                                        // return result;
                                })
                        : console.log("no user id");
        });

        const handleClick = (e) => {
                localStorage.clear();
                navigate("/");
        }

        return (
                <Paper component="form" elevation={3} spacing={5} style={{ margin: "8% 35%", borderRadius: "20px" }}>
                        <Box style={{ padding: "5%" }}>
                                <Typography variant='h3'>User Details </Typography>
                        </Box>
                        <Stack style={{ padding: "20px 30px" }}>
                                {/* <TextField id="filled-basic" disabled={true}
                                        value={`User Name: ${user.uname}`} />
                                        <TextField id="filled-basic" disabled={true}
                                value={`User Email: ${user.email}`} /> */}

                                {/* <label htmlFor="">User Name:</label> */}
                                <Box
                                        component="span"
                                        sx={{
                                                display: 'block',
                                                p: 1,
                                                m: 1,
                                                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                                                color: (theme) =>
                                                        theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                                                border: '1px solid',
                                                borderColor: (theme) =>
                                                        theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                                                borderRadius: 2,
                                                fontSize: '0.875rem',
                                                fontWeight: '700',
                                        }}
                                >
                                        User Name: {user.uname}
                                </Box>
                                <Box
                                        component="span"
                                        sx={{
                                                display: 'block',
                                                p: 1,
                                                m: 1,
                                                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                                                color: (theme) =>
                                                        theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                                                border: '1px solid',
                                                borderColor: (theme) =>
                                                        theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                                                borderRadius: 2,
                                                fontSize: '0.875rem',
                                                fontWeight: '700',
                                        }}
                                >
                                        Email ID: {user.email}
                                </Box>

                                <br />
                                {userid == uid ?
                                        <>
                                                <Button variant="contained" onClick={handleClick}>
                                                        Logout
                                                </Button>
                                                <br />
                                                <Link to="/edituser" color="primary" style={{ textDecoration: 'none' }}>Edit User Details</Link>
                                        </>
                                        : <></>
                                }
                        </Stack>
                </Paper>
        );
}
