import * as React from 'react';
import { Paper, Typography, TextField, Box, Stack, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function EditUser() {
        // const { uid } = useParams();
        const navigate = useNavigate();
        const uid = localStorage.getItem('userid');

        // to get details of each user with given uid
        // const [user, setUser] = useState('');
        const [uname, setUname] = useState('');
        const [email, setEmail] = useState('');
        const [pass, setPass] = useState('');
        useEffect(() => {
                fetch(`http://localhost:8080/user/${uid}`)
                        .then(res => res.json())
                        .then((result) => {
                                // setUser(result);
                                setUname(result.uname);
                                setEmail(result.email);
                                setPass(result.pass);
                                // console.log("uname is: ", uname);
                                // return result;
                        })
        }, []);

        // edit user details
        const handleClick = (e) => {
                e.preventDefault();
                const user = { uid, uname, email, pass }
                // console.log(user);
                var a = "", b = "", c = "";
                if (uname.length < 4)
                        a = "User name should be 4 to 20 characters. ";
                if (email.length == 0)
                        b = "Email should not be empty. "
                if (pass.length == 0)
                        c = "Password should not be empty. ";

                // update user details
                if (a.length == 0 && b.length == 0 && c.length == 0) {
                        fetch(`http://localhost:8080/user/${uid}`, {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(user)
                        }).then(() => {
                                alert("User Information Edited");
                                navigate("/");
                        })
                }
                else {
                        alert(a + b + c);
                }
        }

        return (
                <Paper component="form" elevation={3} spacing={5} style={{ margin: "8% 35%" }}>
                        <Box style={{ padding: "5%" }}>
                                <Typography variant='h3'>Edit User Details</Typography>
                        </Box>
                        <Stack style={{ padding: "30px" }}>
                                <TextField id="filled-basic" label="User Name" variant="filled" fullWidth
                                        value={uname} onChange={(e) => setUname(e.target.value)} />
                                <TextField id="filled-basic" label="Email ID" variant="filled" fullWidth
                                        value={email} onChange={(e) => setEmail(e.target.value)} />
                                <TextField id="filled-basic" label="Password" variant="filled" fullWidth
                                        value={pass} onChange={(e) => setPass(e.target.value)} />

                                <br />
                                <Button variant="contained" onClick={handleClick}>
                                        Submit
                                </Button>
                        </Stack>
                </Paper>
        );
}
