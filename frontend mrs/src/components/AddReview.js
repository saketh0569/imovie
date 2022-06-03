import * as React from 'react';
import { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, Stack } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

export default function AddReview() {
        const { id } = useParams();
        const mid = id;
        const uid = localStorage.getItem('userid');
        const navigate = useNavigate();
        // console.log(mid);
        const [rate, setRate] = useState('');
        const [review, setReview] = useState('');

        const handleClick = (e) => {
                e.preventDefault();
                const comment = { mid, rate, review, uid };
                console.log(comment);

                var a = "";
                if (rate.length == 0)
                        a = "rating cannnot be empty";

                if (a.length == 0 && (rate == "1" || rate == "2" || rate == "3" || rate == "4" || rate == "5")) {
                        console.log("entered");
                        // adding a comment or review
                        fetch("http://localhost:8080/comment/add", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(comment)
                        }).then(() => {
                                alert("New Review added");
                                navigate(`/eachmovie/${mid}`)
                        })

                        // update rating (making average of all ratings)
                        fetch(`http://localhost:8080/movie/${mid}/${rate}`, {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" }
                                // body: JSON.stringify(rat)
                        }).then(() => {
                                console.log("movie rated successfully");
                        })

                }
                else {
                        alert("rating should be an integer between 1-5");
                }
        }

        return (
                <Paper component="form" elevation={3} spacing={5} style={{ margin: "8% 35%" }}>
                        <Box style={{ padding: "5%" }}>
                                <Typography variant='h3'>Add Review for movie</Typography>
                        </Box>
                        <Stack style={{ padding: "30px" }}>
                                <TextField id="filled-basic" label="Rate the movie out of 5" variant="filled" fullWidth
                                        value={rate} onChange={(e) => setRate(e.target.value)} />
                                <TextField id="filled-basic" label="Add a review about the movie (optional)" variant="filled" fullWidth
                                        value={review} onChange={(e) => setReview(e.target.value)} />
                                <br />
                                <Button variant="contained" onClick={handleClick}>
                                        Submit
                                </Button>
                        </Stack>
                </Paper>
        );
}
