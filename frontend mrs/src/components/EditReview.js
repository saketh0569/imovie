import * as React from 'react';
import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Paper, Stack } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditReview() {
        const { cid } = useParams();
        // const mid = 0;
        const uid = localStorage.getItem('userid');
        const navigate = useNavigate();
        // console.log(mid);
        const [mid, setMid] = useState('');
        const [rate, setRate] = useState('');
        const [review, setReview] = useState('');
        const [oldrate, setOldrate] = useState('');

        // get the details of comment to be edited
        // const { id } = useParams();
        // const [comment, setComment] = useState([])
        useEffect(() => {
                fetch(`http://localhost:8080/comment/each/${cid}`)
                        .then(res => res.json())
                        .then((result) => {
                                // setComment(result);
                                setRate(result.rate);
                                setOldrate(result.rate);
                                setMid(result.mid);
                                setReview(result.review);
                        })
        }, [])

        const handleClick = (e) => {
                e.preventDefault();
                const comment = { mid, rate, review, uid };

                var a = "";
                if (rate.length == 0)
                        a = "rating cannnot be empty";

                if (a.length == 0 && (rate == "1" || rate == "2" || rate == "3" || rate == "4" || rate == "5")) {
                        console.log("entered");
                        console.log(comment);
                        // updating a comment or review
                        fetch(`http://localhost:8080/comment/${cid}`, {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(comment)
                        }).then(() => {
                                alert("Review edited");
                                navigate(`/eachmovie/${mid}`)
                        })

                        // update rating (making average of all ratings)
                        console.log("oldrating", oldrate);
                        fetch(`http://localhost:8080/movie/edit/${mid}/${rate}/${oldrate}`, {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" }
                                // body: JSON.stringify(rat)
                        }).then(() => {
                                console.log("movie review edited successfully");
                        })
                }
                else {
                        alert("rating should be an integer between 1-5");
                }
        }

        return (
                <Paper component="form" elevation={3} spacing={5} style={{ margin: "8% 35%" }}>
                        <Box style={{ padding: "5%" }}>
                                <Typography variant='h3'>Edit Review for movie </Typography>
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
