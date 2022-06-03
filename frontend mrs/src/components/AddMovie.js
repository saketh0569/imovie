import * as React from 'react';
import { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, Stack, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AddMovie() {
        const [name, setName] = useState('')
        const [url, setUrl] = useState('')
        const [description, setDescription] = useState('')
        // const [rating, setRating] = useState('')
        const navigate = useNavigate();
        const rating = 0;
        const numberOfUsersRated = 0;
        const uid = localStorage.getItem('userid');

        const handleClick = (e) => {
                e.preventDefault();
                const movie = { name, url, description, rating, numberOfUsersRated, uid };
                var a = "", b = "", c = "";
                if (name.length < 2)
                        a = "Movie name should be 2 to 20 characters. ";
                if (url.length == 0)
                        b = "URL should not be empty. "
                if (description.length == 0)
                        c = "Description should not be empty. ";

                if (a.length == 0 && b.length == 0 && c.length == 0) {
                        console.log(movie);
                        fetch("http://localhost:8080/movie/add", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(movie)
                        }).then(() => {
                                alert("New Movie added");
                                // <Alert severity="success">New Movie Added</Alert>
                                navigate("/");
                        })
                }
                else {
                        // <Alert severity="success">{a + b + c}</Alert>
                        alert(a + b + c);
                }
        }

        return (
                <Paper component="form" elevation={3} spacing={5} style={{ margin: "8% 35%" }}>
                        <Box style={{ padding: "5%" }}>
                                <Typography variant='h3'>Add Movie</Typography>
                        </Box>
                        <Stack style={{ padding: "30px" }}>

                                <TextField id="filled-basic" label="Movie Name" variant="filled" fullWidth
                                        value={name} onChange={(e) => setName(e.target.value)} />
                                <TextField id="filled-basic" label="url" variant="filled" fullWidth
                                        value={url} onChange={(e) => setUrl(e.target.value)} />
                                <TextField id="filled-basic" label="Description" variant="filled" fullWidth
                                        value={description} onChange={(e) => setDescription(e.target.value)} />
                                {/* <TextField id="filled-basic" label="rating" variant="filled" fullWidth
                                        value={rating} onChange={(e) => setRating(e.target.value)} /> */}
                                <br />
                                <Button variant="contained" onClick={handleClick}>
                                        Submit
                                </Button>
                        </Stack>
                </Paper>
        );
}
