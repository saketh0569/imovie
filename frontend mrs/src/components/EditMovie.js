import * as React from 'react';
import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Paper, Stack } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditMovie() {
        const [name, setName] = useState('')
        const [url, setUrl] = useState('')
        const [description, setDescription] = useState('')
        // const [rating, setRating] = useState('')
        const rating = 0;
        const temp = 0;
        const navigate = useNavigate();

        // get the details of movie to be edited
        const { id } = useParams();
        const [movies, setMovies] = useState([])
        useEffect(() => {
                fetch(`http://localhost:8080/movie/${id}`)
                        .then(res => res.json())
                        .then((result) => {
                                setMovies(result);
                                setName(result.name);
                                setUrl(result.url);
                                setDescription(result.description);
                        })
        }, [])

        const handleClick = (e) => {
                e.preventDefault();
                const movie = { name, url, description, rating, temp };
                var a = "", b = "", c = "";
                if (name.length < 2)
                        a = "Movie name should be 2 to 20 characters. ";
                if (url.length == 0)
                        b = "URL should not be empty. "
                if (description.length == 0)
                        c = "Description should not be empty. ";

                if (a.length == 0 && b.length == 0 && c.length == 0) {

                        fetch(`http://localhost:8080/movie/${id}`, {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(movie)
                        }).then(() => {
                                alert("Movie Edited");
                                navigate(`/eachmovie/${id}`)
                        })
                }
                else {
                        alert(a + b + c);
                }
        }

        return (
                <Paper component="form" elevation={3} spacing={5} style={{ margin: "8% 33%" }}>
                        <Box style={{ padding: "5%" }}>
                                <Typography variant='h4'>Edit the Movie Details</Typography>
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
                                        Update Movie Details
                                </Button>
                        </Stack>
                </Paper>
        );
}
