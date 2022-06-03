import * as React from 'react';
import { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, Stack } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

        const [email, setEmail] = useState('');
        const [pass, setPass] = useState('');
        const uname = '';
        // const [uid, setUid] = useState(localStorage.getItem('userid'));
        let navigate = useNavigate();

        // used for loging in
        const handleClick = (e) => {
                e.preventDefault();
                const usertemp = { uname, email, pass };
                // console.log(user);
                fetch("http://localhost:8080/user/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(usertemp)
                }).then((result) => {
                        // console.log(result.status);
                        // console.log(result);
                        if (result.status !== 200)
                                alert("Problem signing in...");
                        else
                                alert("Signed in successfully");
                        return result.json();
                }).then((result) => {
                        // console.log("result(id) is: ", result);
                        // setUid(result);
                        // props.func(result);
                        localStorage.setItem('userid', result);
                        navigate("/");
                }).catch((error) => {
                        console.log("Error in handling", error);
                })
        }

        return (
                <Paper component="form" elevation={3} spacing={5} style={{ margin: "8% 35%" }}>
                        <Box style={{ padding: "5%" }}>
                                <Typography variant='h3'>Login </Typography>
                        </Box>
                        <Stack style={{ padding: "30px" }}>
                                <TextField id="filled-basic" label="email" variant="filled" fullWidth
                                        value={email} onChange={(e) => setEmail(e.target.value)} />
                                <TextField id="filled-basic" label="type your password" variant="filled" fullWidth
                                        value={pass} onChange={(e) => setPass(e.target.value)} />
                                <br />
                                <Button variant="contained" onClick={handleClick} >
                                        Submit
                                </Button>
                                <br />
                                <Link to={`/register`} color="primary" >Not a user, register here</Link>
                        </Stack>
                </Paper>
        );
}
