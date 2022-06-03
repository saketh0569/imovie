import * as React from 'react';
import { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, Stack } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
        const [uname, setUname] = useState('');
        const [email, setEmail] = useState('');
        const [pass, setPass] = useState('');
        let navigate = useNavigate();

        const handleClick = (e) => {
                e.preventDefault();
                const user = { uname, email, pass };
                var a = "", b = "", c = "";
                if (uname.length < 4)
                        a = "User name should be 4 to 20 characters. ";
                if (email.length == 0)
                        b = "Email should not be empty. "
                if (pass.length == 0)
                        c = "Password should not be empty. ";

                if (a.length == 0 && b.length == 0 && c.length == 0) {
                        console.log(user);
                        fetch("http://localhost:8080/user/add", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(user)
                        }).then((result) => {
                                if (result.status !== 200)
                                        alert("Problem in registering");
                                else {
                                        alert("Registered successfully");
                                        navigate("/login");
                                }
                        }).catch((error) => {
                                console.log("Error in handling", error);
                        })
                }
                else {
                        alert(a + b + c);
                }
        }

        return (
                <Paper component="form" elevation={3} spacing={5} style={{ margin: "8% 35%" }}>
                        <Box style={{ padding: "5%" }}>
                                <Typography variant='h3'>Register</Typography>
                        </Box>
                        <Stack style={{ padding: "30px" }}>
                                <TextField id="filled-basic" label="Your Name" variant="filled" fullWidth
                                        value={uname} onChange={(e) => setUname(e.target.value)} />
                                <TextField id="filled-basic" label="email" variant="filled" fullWidth
                                        value={email} onChange={(e) => setEmail(e.target.value)} />
                                <TextField id="filled-basic" label="set your password" variant="filled" fullWidth
                                        value={pass} onChange={(e) => setPass(e.target.value)} />
                                <br />
                                <Button variant="contained" onClick={handleClick} >
                                        Submit
                                </Button>
                                <br />
                                <Link to={`/login`} color="primary" >Already a user, login here</Link>
                        </Stack>
                </Paper>
        );
}
